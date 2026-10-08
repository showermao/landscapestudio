FROM node:24-bookworm-slim
USER node
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV=production
ENV PORT=7860
EXPOSE 7860
CMD ["npm", "start"]
