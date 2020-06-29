---
layout: default
title: Configure Node/Bower/Yarn environment
modified: '2020-06-29 10:21:05 +0300'
comments: true
---

Sometimes the defaults for running the client side build tools is not enough, and you will need to configure the settings of those tools.

#### Changing Node environment

The plugin provides direct access to the Yarn runner which means you are able to configure most Yarn and Node settings from the build.gradle file.

For example, to set a NodeJs environment variable you can use the following configuration in your build.gradle file:

**build.gradle**
```groovy
vaadinTranspileDependencies {
    yarnRunner.environment.put('NODE_OPTIONS', '--max-old-space-size=8192')
}
```

In this example we are increasing the available *Heap Memory Size*.


