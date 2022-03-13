# Kanbanit (A Trello inspired web-application)

Hello and welcome to one of my second biggest Angular projects that I have developed (the biggest being the [Shorts web-app](https://github.com/Kvaara/angular_shorts_app)).

You can find the project live (and test it) here: [KanbanIT hosted by Vercel v1.0.0](https://kanbanit-dev.web.app/).

## Features

This is pretty bare bones version of Trello (for a good reason lol) but it has some features similar to it including the kanban feature itself.

Users can make kanban boards and tasks related to them. They can also move them across the kanban board and/or delete them by moving them to the garbage are (these have been implemented by using the Angular CDK's drag-and-drop API). 

Users can also edit the kanban boards' titles and the tasks related to them if they want to.

User authentication has been done by using Google Firebase (authentication is required for users to access the kanban features).

SSR has been implemented by prerendering and in turn there is search engine optimization added (SEO). The customers page was solely for the demonstration of what SSR can do to SEO.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
