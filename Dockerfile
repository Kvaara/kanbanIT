
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# COPY ALL OF THE ANGULAR AND NEXT CODE TO THE WORKING DIRECTORY
COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
