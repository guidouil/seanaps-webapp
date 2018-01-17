# Deployement a l'arache sur un serv en port 8080

```sh
cd
rm -rf seanaps-source
rm -rf builds
git clone https://github.com/guidouil/seanaps-webapp.git seanaps-source
cd seanaps-source
meteor npm install
meteor build ../builds/. --server-only
cd ../builds/
tar xzf seanaps-source.tar.gz
cd
forever stop seanaps
rm -rf seanaps
cd builds
mv bundle ../seanaps
cd ../seanaps/programs/server/
npm install
cd
export MONGO_URL='mongodb://127.0.0.1:27017/seanaps'
export PORT=8080
export ROOT_URL='http://seanaps.qrr.fr'
forever start --append --uid "seanaps" seanaps/main.js
date

```
