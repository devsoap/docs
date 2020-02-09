---
modified: '2020-02-09 17:42:06 +0200'
title: Installation
priority: 1
---

The plugin can be found in the [Gradle Plugin repository](https://plugins.gradle.org/plugin/com.devsoap.cache).

The plugin will seamlessly integrate into the Gradle cache infrastructure so the only thing that is needed
is applying the plugin to your project.

### Adding the plugin to the project

To add the plugin to the project create a file called *settings.gradle* in the root folder of your project 
and add the following:

#### settings.gradle
```groovy

  // 1. Add the plugin
  plugins {
      id "com.devsoap.cache" version "{{ site.data.strings["ds_cloud_cache"].version }}"
  }

  // 2. Assign your license details
  devsoap {
      email = '...'
      key = '...'
  }
```

First, the plugin is applied to the project via the standard *plugins* block, just like you normally add
any plugin. The only difference is that we are adding the plugin in **settings.gradle** and not in **build.gradle**.
This is because caching needs to be available *before* the actual build starts.

In the seconds step wee need to add our credentials to validate the plugin. This should be a familiar step if 
you already are used to other Devsoap products. 

This is all that is needed to enable the plugin in your Gradle project.