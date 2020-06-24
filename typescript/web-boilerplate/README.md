# Getting started

```
Compiling the development image:  
$ docker build -t xxx:develop --target develop .

Running development image with watch for development:  
$ docker run --rm -ti --name name -v $(pwd)/src:/usr/opt/app/src -p 3000:3000 xxx:develop

Compiling the release image:  
$ docker build -t xxx .
```

RULES:

NO INDEX.TS  
AVOID CONTROLLER/SERVICE/OVER-BLOATED-TERM  

inspiration:
* https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749
* https://github.com/nubank/basic-microservice-example


```
yarn run v1.15.2
$ mocha -r ts-node/register src/**/*.test.ts
td-mock: 4.444ms


  todo
    ✓ mocked
    ✓ UN-mocked


  2 passing (8ms)

✨  Done in 3.92s.
ɤ yarn test
yarn run v1.15.2
$ mocha -r ts-node/register src/**/*.test.ts
td-mock: 254.649ms


  todo
    ✓ mocked
    ✓ UN-mocked


  2 passing (7ms)
```
