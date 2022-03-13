# Kanbanit (A Trello inspired web-application)

Hello and welcome to one of my second biggest Angular projects that I have developed (the biggest being the [Shorts web-app](https://github.com/Kvaara/angular_shorts_app)).

You can find the project live (and test it) here: [KanbanIT hosted by Vercel v1.0.0](https://kanbanit-dev.web.app/).

## Features

This is pretty bare bones version of Trello (for a good reason lol) but it has some features similar to it including the kanban feature itself.

Users can make kanban boards and tasks related to them. They can also move them across the kanban board and/or delete them by moving them to the garbage are (these have been implemented by using the Angular CDK's drag-and-drop API). 

Users can also edit the kanban boards' titles and the tasks related to them if they want to.

User authentication has been done by using Google Firebase (authentication is required for users to access the kanban features).

SSR has been implemented by prerendering and in turn there is search engine optimization added (SEO). The customers page was solely for the demonstration of what SSR can do to SEO.

## Tools/libraries

Basically the main tools that I have used is the Angular framework itself, the CDK it provides and Angular material. Oh and also the Angular Fire package, which makes communicating with Firebase much easier. The main front end library that I have used for styling is TailWindCSS. TailWindCSS makes is so extremely enjoyable writing CSS rather than the vanilla way of writing the .css files.

I have made a separate page in the KanbanIT application that you can use to check out every tooling. The are even some licenses included because I generated all of them by using a [npm license generator](https://www.npmjs.com/package/npm-license-generator). The page isn't that UI/UX pretty because I didn't want to spend much time on it.

List of all the tools/libraries I have used with the corresponding licenses can be found [here](https://kanbanit-dev.web.app/tools-used). 
