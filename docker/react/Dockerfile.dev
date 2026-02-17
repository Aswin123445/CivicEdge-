FROM node:20-alpine

WORKDIR /app

# Copy manifests and install for reproducibility
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Ensure Vite listens externally
ENV VITE_HOST=0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
