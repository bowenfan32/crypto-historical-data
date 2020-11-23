FROM node:12

# Create app directory
WORKDIR /crypto/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN cd client && npm run build && cd ..

EXPOSE 9000

CMD ["npm", "run", "start"]