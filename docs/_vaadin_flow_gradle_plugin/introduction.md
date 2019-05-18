---
layout: default
title: Introduction
modified: '2019-05-18 18:04:43 +0300'
priority: 1
---

# {{ page.title }}

The DS Vaadin Flow Gradle plugin allows you to build your Vaadin projects leveraging the Gradle build tool. 

It's main purpose is to seamlessly integrate with the Gradle build ecosystem and provide the developer with an easy
interface to build complex Vaadin Flow applications.

The main features include:

  * First class support for Java, Groovy and Kotlin Vaadin projects 
  * [Support for using Yarn and Bower for managing Javascript components](add_yarn_npm_dependency.html)
  * Includes project creator tasks for automatically generating stubs for projects, components and themes
  * [Support for theming with CSS, SASS, Polymer and Groovy](vaadin_flow_gradle_plugin_themes)
  * Production mode support 
  * IDE support for both Intellij IDEA and Eclipse


The plugin also integrates with many of Gradle's optimization features such as:

  * [Gradle Build Cache](offline_and_caching.html#gradle-build-cache)
  * [Gradle Parallel Execution](offline_and_caching.html#gradle-parallel-task-execution)
  * [Gradle Offline mode](offline_and_caching.html#gradle-offline-mode)

Furthermore, the plugin provides advanced Javascript features such as:

  * [Offline mirroring for Javascript components](offline_and_caching.html#production-mode-offline-mode)
  * Transpilation for older browsers (IE11)


The plugin also tries to support most of the features the Vaadin Maven Flow plugin does. However, it does not guarantee that all features are implementated or that they are implemented in the same way.


# Source code

The source code is Open Source and is licensed under the permissive Apache 2 license. The sources of the plugin can be found in the Github repository at [https://github.com/devsoap/gradle-vaadin-flow].

For more information about how to develop the plugin checkout the [Development Article](todo-link).