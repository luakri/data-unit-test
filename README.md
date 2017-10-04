# Base Web Project Gulp

Base Web Project using: Gulp, Browsersync, Webpack 2, Babel and Karma.

Development server is a combination of Browsersync + Webpack.
Webpack Hot Middleware watches js files and reloads browser.

## Developer Setup

Prerequisites
-------------

* [NVM](https://github.com/creationix/nvm) or [Node.js](https://nodejs.org)
* [Gulp Command Line Interface (CLI)](https://github.com/gulpjs/gulp-cli)

Requirements
-------------

* Nodejs v.8.0.0

        nvm ls-remote
        nvm install 8.0.0
        nvm use 8.0.0

* Please download the [Editor Config](http://editorconfig.org/) plugin for your code editor

* From the Terminal:

        npm install -g gulp-cli
        npm run start
        gulp

## Starting Up The Project

Run ```npm install``` to setup project dependencies.

Run ```gulp``` to build the project for development and open a browser instance with watch.

Run ```gulp prod``` to build the project for production.

Run ```gulp server``` to serve the distribution files.

Run ```gulp unit``` to run unit tests using Karma + Webpack + ChromeHeadless + Code Coverage non transpiled code.
