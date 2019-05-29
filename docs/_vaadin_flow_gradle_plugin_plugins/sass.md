---
modified: '2019-05-29 18:06:52 +0300'
title: SASS
---

The {{ site.data.strings["vaadin_plugin"].title }} integrates seamlessly with the {{ site.data.strings["sass_plugin"].title }}.

## Activating the plugin

To enable the plugin support add the following to the project

#### build.gradle
```groovy
plugins {
    id 'io.freefair.jsass-java' version '{{ site.data.strings["sass_plugin"].version }}'
    id 'io.freefair.jsass-war' version '{{ site.data.strings["sass_plugin"].version }}'
}
```

## Integration points

The plugin ensures that any compiled SASS files will be included within the application build and within the production mode bundling.