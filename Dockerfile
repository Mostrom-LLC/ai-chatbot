FROM public.ecr.aws/bitnami/node:18.20.2-debian-12-r6

RUN apt-get update
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ARG POSTGRES_URL
ENV POSTGRES_URL=$POSTGRES_URL

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js application
ENV NEXT_PUBLIC_APP_ENV=production
RUN pnpm run build

# Expose port 80
EXPOSE 80

# Start Next.js
ENV PORT=80
CMD ["pnpm", "start", "-p", "80"]
