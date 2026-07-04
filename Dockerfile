FROM node:20-alpine

WORKDIR /app

ARG DATABASE_URL=postgresql://localhost:5432/placeholder_db?schema=public
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW52YWxpZC5pbnZhbGlkJA==
ARG CLERK_SECRET_KEY=sk_test_placeholder

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]