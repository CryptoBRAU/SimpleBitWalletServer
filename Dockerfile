FROM node:9.5.0
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 80
EXPOSE 80
CMD ["npm","start"]