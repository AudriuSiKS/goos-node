# GOOS: Sniper
A Node.js implementation of exercises in [Growing Object-Oriented Software, Guided By Tests](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)

### Adoptation to JavaScript world:
- UI part is implemented as HTML that is served via HTTP by express 
- UI tests are executed by selenium (webdriver.io)
- Redis used as a message broker instead of XMPP
- Gulp used as a task runner
- Babel is used for transpiling (Code written in ES6 and ES7)

### Running

1. Install dependencies: `npm install` and gulb globally `npm install -g gulp`

2. Start a local redis server with default config:
`redis-server &`

3. Run tests:
`npm test`