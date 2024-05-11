FROM node:20-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

ARG DATABASE_URL
ARG JWT_SECRET_KEY
ARG JWT_EXPIRES_IN
ARG PORT
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN
ENV PORT=$PORT

COPY tsconfig.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20-alpine3.18 as runner

WORKDIR /app

ARG DATABASE_URL
ARG JWT_SECRET_KEY
ARG JWT_EXPIRES_IN
ARG PORT
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN
ENV PORT=$PORT


COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

RUN npm install -g pnpm
RUN pnpm install --production

CMD ["node", "dist/main"]