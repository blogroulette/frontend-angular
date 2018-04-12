# blogroulette web ui

This is the graphical userinterface for the Blogroulette project.
It is desired to get a web app (using Angular), a native app ( using Electron) and a mobile app (using Cordova) with mostly the same code.

# Getting started

1. Go to project folder and install dependencies:
 ```sh
 npm install
 ```

2. Launch development server, and open `localhost:4200` in your browser:
 ```sh
 npm start
 ```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Task                            | Description
--------------------------------|--------------------------------------------------------------------------------------
`npm start`                     | Run development server on `http://localhost:4200/`
`npm run serve:sw`              | Run test server on `http://localhost:4w200/` with service worker enabled
`npm run build [-- --env=prod]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `www/` folder
`npm run electron`		| To start a live Electron Container
`npm run electron:build`	| To start the compile process and a live Electron Container
`npm run electron-package:linux64` | To build the Angular App and create a linux Package ([electron-packager](https://github.com/electron-userland/electron-packager))
`npm run electron-install:rpm64` | native RPM-Installer (`rpm-build` required)([electron-installer-redhat](https://github.com/unindented/electron-installer-redhat))
`npm run electron-install:deb64` | native DEB-Installer (`fakeroot` required)([electron-installer-debian](https://github.com/unindented/electron-installer-debian))
`npm run cordova:prepare`       | Prepare for building mobile app (restore Cordova platforms and plugins)
`npm run cordova:run <ios/android> [--device]` | Run app on target platform device or simulator
`npm run cordova:build [-- --env=prod]`        | Build mobile app for production in `dist/` folder
`npm run cordova:clean`         | Removes `www/`, `platforms/` and `plugins/` folders
`npm test`                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
`npm run test:ci`               | Lint code and run unit tests once for continuous integration
`npm run e2e`                   | Run e2e tests using [Protractor](http://www.protractortest.org)
`npm run lint`                  | Lint code
`npm run translations:extract`  | Extract strings from code and templates to `src/app/translations/template.json`
`npm run docs`                  | Display project documentation

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.

#### Libraries

- [Angular](https://angular.io)
- [Bootstrap 4](https://getbootstrap.com)
- [ng-bootsrap](https://ng-bootstrap.github.io/)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)
- [Electon](https://electronjs.org/)

#### Electron

- [electron](https://electronjs.org/)
- [electron-packager](https://github.com/electron-userland/electron-packager)
- [electron-installer-redhat](https://github.com/unindented/electron-installer-redhat)
- [electron-installer-debian](https://github.com/unindented/electron-installer-debian)

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)

This project was generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 4.1.0
