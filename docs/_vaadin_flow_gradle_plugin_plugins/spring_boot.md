---
modified: '2019-05-29 18:06:52 +0300'
title: Spring Boot
---

The {{ site.data.strings["vaadin_plugin"].title }} integrates seamlessly with the {{ site.data.strings["spring_boot_plugin"].title }}.

## Activating the plugin

To enable the plugin support add the following to the project

#### build.gradle
```groovy
plugins {
    id 'org.springframework.boot' version '{{ site.data.strings["spring_boot_plugin"].version }}'
}
```

## Integration points

The plugin will ensure the ``bootRun`` task will be able to run the project both in *development* and *production* modes.

The plugin will ensure that the JAR and WAR contains all required resources to run the project.

