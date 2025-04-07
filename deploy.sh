#!/bin/bash
set -e

# Constants
ECR_REPO="366394957699.dkr.ecr.us-east-1.amazonaws.com/mostrom-ai-chatbot"
TAG="dev"
REGION="us-east-1"

echo "===== Building and pushing container image to management account ====="
# Use management account profile for ECR operations
export AWS_PROFILE=mostrom_mgmt

# Login to ECR in management account
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO

# Build and push Docker image
# Use --platform linux/amd64 to build for x86_64 architecture (what AWS uses)
docker build --platform linux/amd64 . -t $ECR_REPO:$TAG
docker push $ECR_REPO:$TAG

# Get the SHA of the image we just pushed
IMAGE_SHA=$(aws ecr describe-images --repository-name mostrom-ai-chatbot --image-ids imageTag=$TAG --query 'imageDetails[0].imageDigest' --output text)
echo "New image SHA: $IMAGE_SHA"

echo "===== Switching to dev account for ECS operations ====="
# Switch to dev account profile for ECS operations
export AWS_PROFILE=mostrom_dev

echo "===== Updating ECS task definition to reference exact image SHA ====="
# Get current task definition from dev account
TASK_FAMILY="dev-mostrom-ai-chatbot"
TASK_DEF=$(aws ecs describe-task-definition --task-definition $TASK_FAMILY --region $REGION --query 'taskDefinition' --output json)

# Update the container image in the task definition to use the exact SHA from management account
NEW_TASK_DEF=$(echo $TASK_DEF | jq --arg IMAGE "$ECR_REPO@$IMAGE_SHA" '.containerDefinitions[0].image = $IMAGE')

# Remove fields that can't be included in register-task-definition
NEW_TASK_DEF=$(echo $NEW_TASK_DEF | jq 'del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .compatibilities, .registeredAt, .registeredBy)')

# Register the new task definition in dev account
NEW_TASK_DEF_ARN=$(aws ecs register-task-definition --cli-input-json "$NEW_TASK_DEF" --region $REGION --query 'taskDefinition.taskDefinitionArn' --output text)
echo "Registered new task definition: $NEW_TASK_DEF_ARN"

echo "===== Updating ECS service in dev account ====="
# Update the service in dev account
aws ecs update-service --cluster mostrom --service ai-chatbot --desired-count 1 --force-new-deployment --region $REGION --task-definition $NEW_TASK_DEF_ARN

echo "===== Deployment Complete ====="
echo "New task definition ($NEW_TASK_DEF_ARN) is registered and deployed in dev account"
echo "Using exact image SHA: $IMAGE_SHA from management account ECR"
echo "This prevents ECS from using cached/stale image references"