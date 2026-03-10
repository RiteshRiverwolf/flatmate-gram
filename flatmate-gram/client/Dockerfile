FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Add this line so Vite has the env variable during build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the frontend
RUN npm run build

# Install static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]