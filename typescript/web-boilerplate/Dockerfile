# 
# ---- Base ----
FROM node:14-alpine AS base
WORKDIR /usr/opt/app
COPY package.json yarn.lock .prettierrc.yaml .eslintrc.yml tsconfig.json ./

#
# ---- Development ----
FROM base AS develop
ENV PORT 3000
ENTRYPOINT ["yarn"]
CMD ["start"]
RUN cp -R /usr/opt/app /usr/opt/app-build && yarn --cwd /usr/opt/app-build  install --production
RUN yarn install
COPY src src/
RUN yarn lint src/**/*.ts
RUN yarn build && cp -R src/*.js /usr/opt/app-build/src

#
# ---- Build ----
FROM node:14-alpine AS build
ENV PORT 3000
WORKDIR /usr/opt/app
COPY --from=develop /usr/opt/app-build/ ./
ENTRYPOINT ["yarn"]
CMD ["start:prod"]
