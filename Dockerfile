#Base Image
FROM node:12-alpine as base
WORKDIR /hyaas

RUN apk add --update file imagemagick msttcorefonts-installer fontconfig yarn
RUN update-ms-fonts && fc-cache -f

COPY package.json .

#Builder
FROM base as builder 
RUN yarn install --production
RUN cp -r node_modules prod_node_modules
RUN yarn install
COPY . .
RUN yarn run build 

#Test Image
FROM builder as test 
RUN yarn run lint

#Release
FROM base as release 
COPY --from=builder /hyaas/prod_node_modules ./node_modules
COPY --from=builder /hyaas/dist ./dist
COPY --from=builder /hyaas/assets ./assets

ENTRYPOINT [ "node", "dist/backend/app.js" ]
