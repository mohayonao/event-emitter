# EVENT EMITTER
[![Build Status](http://img.shields.io/travis/mohayonao/event-emitter.svg?style=flat-square)](https://travis-ci.org/mohayonao/event-emitter)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/event-emitter.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/event-emitter)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> tiny event emitter

## Installation

Node.js

```sh
npm install @mohayonao/event-emitter
```

## API
### EventEmitter
- `constructor()`

### Instance methods
- `listeners(event: string): function[]`
- `addListener(event: string, listener: function): self`
- `on(event: string, listener: function): self`
- `once(event: string, listener: function): self`
- `removeListener(event: string, listener: function): self`
- `removeAllListeners([ event: string ]): self`
- `emit(event: string, arg1: any): self`

## License
MIT
