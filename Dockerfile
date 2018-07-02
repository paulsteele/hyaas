#Base Image
FROM node:10.5.0-alpine as base
WORKDIR /hyaas
COPY package.json .

#Builder
FROM base as builder 
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
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

ENTRYPOINT [ "node", "dist/app.js" ]