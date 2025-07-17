# Step 1 : build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# Step 2 : run
FROM node:24-alpine

WORKDIR /app

COPY --chown=node:node --from=builder /app /app

COPY . .

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
