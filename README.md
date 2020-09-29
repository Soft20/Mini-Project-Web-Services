# Mini Project - Web Services
_System Integration, fall 2020_

Adam Lass  
Pernille Lørup  
Rasmus Helsgaun  
Stephan Djurhuus  

## Objectives
The task is to create an application, which takes use of web services.
The application has minimum three components:
- [ ] SOAP service
- [ ] RESTful service
- [ ] Client application, which consumes the services.

At least one of the web services, as well as the web services consumer must be originally developed by you/your team, while the others can be requested from public sources.

Deploy the application on either a local or a remote server.
Prepare demonstration of the implementation.

[extended description](https://datsoftlyngby.github.io/soft2020fall/resources/473f0f56-MP1-WS.pdf)

## Content
* [Prerequisite](#prerequisite)
* [Installation](#installation)
* [Execution](#execution)

## Prerequisite

* [node.js](https://nodejs.org/en/)
* [yarn](https://www.npmjs.com/package/yarn)

`Node.js` comes with a package manager called `npm`, we uses a optimized version called `yarn` which can be installed uses `npm` as seen below.

```bash
npm install -g yarn
```

## Installation
```bash
yarn install
```

## Execution
`ctr + c` to terminate services.

**SOAP Server**
```bash
yarn start soap
```

**REST Server**
```bash
yarn start rest
```

**Client**
```bash
yarn start client
```