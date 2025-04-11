# Chat SDK

A free, open-source template built with Next.js and the AI SDK that helps you quickly build powerful chatbot applications.

## Features

### Next.js App Router
- Advanced routing for seamless navigation and performance
- React Server Components (RSCs) and Server Actions for server-side rendering and increased performance

### AI SDK
- Unified API for generating text, structured objects, and tool calls with LLMs
- Hooks for building dynamic chat and generative user interfaces
- Supports xAI (default), OpenAI, Fireworks, and other model providers

### shadcn/ui
- Styling with Tailwind CSS
- Component primitives from Radix UI for accessibility and flexibility

### Data Persistence
- Neon Serverless Postgres for saving chat history and user data
- Vercel Blob for efficient file storage

### Auth.js
- Simple and secure authentication

## Models

This template ships with xAI grok-2-1212 as the default chat model. However, with the AI SDK, you can switch LLM providers to OpenAI, Anthropic, Cohere, and many more with just a few lines of code.

## Running Locally

You will need to use the environment variables defined in `.env.example` to run Next.js AI Chatbot. It's recommended you use Vercel Environment Variables for this, but a `.env` file is all that is necessary.

> **Note:** You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).