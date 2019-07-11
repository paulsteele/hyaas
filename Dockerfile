#Base Image
FROM node:12-alpine as base
WORKDIR /hyaas

RUN apk add --update file imagemagick msttcorefonts-installer fontconfig
RUN update-ms-fonts && fc-cache -f
RUN npm cache clean --force
RUN npm i npm@4.6.1 -g

COPY package.json .

#Builder
FROM base as builder 
RUN npm install --only=production
RUN cp -r node_modules prod_node_modules
RUN npm install
COPY . .
RUN npm run build 

#Test Image
FROM builder as test 
RUN npm run lint

#Release
FROM base as release 
COPY --from=builder /hyaas/prod_node_modules ./node_modules
COPY --from=builder /hyaas/dist ./dist
COPY --from=builder /hyaas/assets ./assets

ENTRYPOINT [ "node", "dist/backend/app.js" ]
