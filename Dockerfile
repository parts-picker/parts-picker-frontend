FROM node:22.14.0-alpine AS base

# -------------------
# STEP: DEPENDENCIES
FROM base AS dependencies

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine for more info on why this is needed.
RUN apk add --no-cache libc6-compat

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# -------------------
# STEP: BUILDER
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Disable next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# -------------------
# STEP: RUNNER
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

# Disable next.js telemetry during run
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next \
    && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Make nextjs user owner of app directory
RUN chown nextjs:nodejs ../app
# Copy entrypoint.sh
COPY entrypoint.sh ./
# Allow entrypoint.sh to be executed
# and install full version of sed
RUN chmod +x ./entrypoint.sh \
    && apk --no-cache add sed

USER nextjs

EXPOSE 3000
ENV PORT 3000
# Set hostname to localhost
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT ["./entrypoint.sh"]
# Start app
CMD ["node", "server.js"]
