# Data unit test

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
        npm install
        gulp unit

## Starting Up The Project

Run ```gulp unit``` to run unit tests using Karma + Webpack + ChromeHeadless + Code Coverage non transpiled code.
