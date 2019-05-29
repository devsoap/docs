---
modified: '2019-05-29 18:06:52 +0300'
title: Gretty
---


The {{ site.data.strings["vaadin_plugin"].title }} integrates seamlessly with the {{ site.data.strings["gretty_plugin"].title }}.

## Activating the plugin

To enable the plugin support add the following to the project

#### build.gradle
```groovy
plugins {
    id "org.gretty" version '{{ site.data.strings["gretty_plugin"].version }}'
}
```

## Integration points

The plugin will ensure that the application can be run with ``jettyRun``, ``tomcatRun`` and provide the necessery configuration to 
produce a product packaging with ``buildProduct``.



