FROM public.ecr.aws/docker/library/node:20.9.0

#RUN apt-get update
ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET

ARG METADATA_BASE_URL
ENV METADATA_BASE_URL=$METADATA_BASE_URL

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG POSTGRES_URL
ENV POSTGRES_URL=$POSTGRES_URL

ENV XAI_API_KEY=""
ENV GROQ_API_KEY=""
ENV BLOB_READ_WRITE_TOKEN=""

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
