# MME <-> HSS
-------------------
S6a/S6d diameter HSS server

Install:
------------

 - clone project
```
git clone https://github.com/matus123/mme_hss.git
```
 - install modules
```
cd ./mme_hss
npm install
```
- replace diameter library with modified
```
git clone https://github.com/matus123/node-diameter.git
rm -r node_modules/diameter
mv node-diameter ./node_modules/diameter
```

Start:
-------

 - start server
```
npm start
```


