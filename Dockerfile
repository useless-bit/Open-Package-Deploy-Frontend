FROM harbor.codesystem.org/node-js/node:slim AS build-stage

WORKDIR /source
ADD src /source/src
ADD angular.json /source
ADD ../package.json /source
ADD ../package-lock.json /source
ADD tsconfig.app.json /source
ADD tsconfig.json /source
ADD tsconfig.spec.json /source

RUN npm install
RUN npm run build -c production


FROM harbor.codesystem.org/webserver/nginx:stable


COPY --from=build-stage /source/dist/opd/browser /usr/share/nginx/html
COPY docker/create_file.sh /docker-entrypoint.d/
RUN ["chmod", "+x", "/docker-entrypoint.d/create_file.sh"]

