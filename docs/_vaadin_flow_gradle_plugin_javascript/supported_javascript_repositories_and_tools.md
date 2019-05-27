---
layout: default
title: Supported repositories and tools
modified: '2019-05-27 20:43:58 +0300'
comments: true
---

By default all the Vaadin components are distributed as WebJars. WebJars are pre-packaged web components that 
you can add as a standard dependency to your Gradle build.

While it is preferrable to use WebJars as they can be handled by the standard dependency management not all 
dependencies you might like are available as WebJars. In this case the Gradle plugin now provides two ways of 
dowloading them, using Bower or Yarn. 

For those of you who haven't been involved in frontend development these might be unfamiliar, but in principal 
they are dependency managers for Javascript dependencies in a similar fashion as Gradle or Maven are dependency 
managers for Java dependencies. They come with their own tool-chains and configurations which might be very 
confusing for us backend developers.

## Webjars

By default all the Vaadin components are distributed as WebJars. WebJars are pre-packaged web components that 
you can add as a standard dependency to your Gradle build.

While it is preferrable to use WebJars as they can be handled by the standard dependency management not all 
dependencies you might like are available as WebJars.

## Bower

[Bower](https://bower.io) is the default package manager used by all Polymer 2 components. 


## Yarn (NPM)

Since Vaadin 14 the preferred package manager has been [NPM}(https://www.npmjs.com/). 

The plugin uses [Yarn](https://yarnpkg.com/en/) to manage the downloads from the NPM repository as well as perform 
local mirroring to enable offline mode to work properly.