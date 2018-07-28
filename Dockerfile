#Node image
FROM node:8.11.3
#Create app directory
WORKDIR /usr/src/app
#Install app dependencies
COPY package*.json ./
RUN npm install
#For production
#RUN npm install --only=production
#Bundle app source
COPY . .
#Expose the port
EXPOSE 4000
#command to run app
CMD ["npm", "start"]