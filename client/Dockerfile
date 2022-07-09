FROM mhart/alpine-node:latest

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Copy all local files into the image.
COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "preview"]
