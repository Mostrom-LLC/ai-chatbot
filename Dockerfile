FROM public.ecr.aws/docker/library/node:20.9.0

#RUN apt-get update
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ARG POSTGRES_URL
ENV POSTGRES_URL=$POSTGRES_URL

ARG NEXT_PUBLIC_APP_NODE_ENV
ENV NEXT_PUBLIC_APP_NODE_ENV=$NEXT_PUBLIC_APP_NODE_ENV

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json ./
RUN pnpm install

# Copy source code
COPY . .

# Clean any existing build artifacts
RUN rm -rf .next

RUN pnpm next build

# Expose port 80
EXPOSE 80

# Start Next.js
ENV PORT=80
CMD ["pnpm", "start", "-p", "80"]
