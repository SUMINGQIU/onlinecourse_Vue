FROM nginx:alpine


# COPY --from=build /usr/local/go/src/singo/dist /usr/bin/api_server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html