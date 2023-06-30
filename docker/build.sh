npm run build
rm dist
cp -r ../dist ./
docker build -t registry.ap-southeast-1.aliyuncs.com/onlinelearning/onlinelearning:v1.0.4 ./
docker push registry.ap-southeast-1.aliyuncs.com/onlinelearning/onlinelearning:v1.0.4