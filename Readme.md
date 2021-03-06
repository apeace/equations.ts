# Equations.ts

In progress.

A collection of functions for working with equations, in TypeScript.

# Dev setup

I recommend running a four-tab setup while developing. Any file changes
will automatically trigger a Typescript build, tests run, and browser bundle.

Note that you do not need anything installed globally except Node and NPM.
You can use Typescript, Mocha, and Browserify from `node_modules`.

```
# first, install dependencies
npm install

# next, install typings for external libraries
./node_modules/.bin/tsd install

# in one terminal window, build with typescript
./node_modules/.bin/tsc --watch

# in another terminal window, run tests
./node_modules/.bin/mocha --watch build/test/

# in another terminal window, bundle for browser
./node_modules/.bin/watchify build/app.js -o build/bundle.js

# in another terminal window, run http server
./node_modules/.bin/http-server -p 8000

# open in browser
open 'http://localhost:8000'
```

For editing, I recommend [Sublime Text 3](https://www.sublimetext.com/3)
and the
[Typescript plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin).

# Progress

Right now if you run the app in a browser, it will parse the equation you
input, and then display it as HTML.
