# HeaderIntercept

A browser add-on to allow for the modifying of headers (currently only request headers) that are sent by the browser. The reason someone may wish to do this is to add authentication, content-type or other payloads as headers onto a request; it is especially useful when doing front-end web development.

## Dependencies and Frameworks

This application has been written using the Angular (8) framework for the UI. There are only a handful of 'extra' dependencies in the application currently, one being a UUID generation libray and RXJS being another.

## Pre-requisites

A recent version of Node (https://nodejs.org/en/) e.g. 12.13.1
A compatible version of NPM (compatible with your version of Node) e.g. 6.13.6
A compatible version of the angular-cli e.g. 8.3.23

** This application has been created and built using macOS Catalina 1.15.2; however you should be able to run on any compatible OS **

## Running / Building the application

There are two ways to run this application and which one to choose depends on what you are currently working on! If you are simply making UX changes, then you can just run the Angular Development sever (node) and test your changes in a web brower. Simply run `ng serve` or `npm run start` from the root of the project and then navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The second way, and the way you will need to 'run' the app if you wish to test it as an extension is to run `npm run build` from the root, you will then be able to load the project as an unpackaged add-on in either Chrome or Firefox.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). There are a number of unit tests around the repositories/pipers and util functions. Component level tests are not currently in place.

## Contributing

Feel free to create issues / feature requests against this project, and of course if you have the inclination then submit a PR for review!
