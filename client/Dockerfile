FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
ARG NEXT_PUBLIC_SERVER_URL
RUN NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL} bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
