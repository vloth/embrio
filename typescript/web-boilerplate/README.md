# Getting started

```
Compiling the development image:  
$ docker build -t xxx:develop --target develop .

Running development image with watch for development:  
$ docker run --rm -ti --name name -v $(pwd)/src:/usr/opt/app/src -p 3000:3000 xxx:develop

Compiling the release image:  
$ docker build -t xxx .
```
