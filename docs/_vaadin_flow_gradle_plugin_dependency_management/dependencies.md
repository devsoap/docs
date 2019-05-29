---
title: Dependencies
modified: '2019-05-29 13:38:38 +0300'
---

When developing Vaadin Flow applications you will need to define a few required dependencies in your project.

While you can manually define all dependencies using the standard Gradle dependency notations, the plugin provides you with helpers to ensure you get the dependencies right.

## Set the vaadin version

The first thing you need to think about is which Vaadin version you will want to use.

By default the plugin will use **the latest stable version** of Vaadin Flow. As this is a *dynamic* version it will change every time a new stable version is released. While developing this might be convenient, in production you will want to lock the version down.

To set the Vaadin version you can use the following closure:

#### build.gradle
```groovy
vaadin {
    version '{{ site.data.strings["vaadin_plugin"].framework_version }}'
}
```

The version should always be set **before** any dependencies or repositories are added to the project.

When using Vaadin Flow Framework snapshots or pre-releases you might see the following error:

>The Vaadin version (\*\*version X\*\*) you have selected is not supported by the plugin. Please pick one of the following supported Vaadin versions {{ site.data.strings["vaadin_plugin"].supported_versions }}. Alternatively you can add vaadin.unsupportedVersion=true to your build.gradle to override this check but there is no guarantee it will work or that the build will be stable.

This means that the Vaadin version you are trying to use has not yet been properly tested and might break in unforeseeable ways. If you are writing a production application then you should select a version that is supported by the plugin.

However, if you want to temporarily test your application with a unsupported version you can add the following to override the error

#### build.gradle
```groovy
vaadin {
    unsupportedVersion = true
}
```
Just be aware that when you decide to use an unsupported version you are basically on your own. The plugin authors will not be able to help you with any issues that might occur.


## Autoconfiguring dependencies and repositories

When you start with a new project you often don't know what dependencies you will want to have in the project, you simply want to get started quickly and worry about it later. 

To allow you to do just that, the {{ site.data.strings["vaadin_plugin"].title }} provides a helper method to automatically configure both repositories and dependencies for your project with sane defaults that would suite most project types.

To auto-configure the dependencies and repositories add the following line:

#### build.gradle
```groovy
vaadin.autoconfigure()
```

Just remember, if you are using ``vaadin.autoconfigure`` the **You should not use the manual approach defined below**.

By default autoconfigure will include the full Vaadin Platform as well as use the Lumo theme as the application theme.

## Fine-graned dependency management

When you have auto-configured the project you will get a broad range of components in your project so you are able to do a lot of things from the start. 
However, once the application starts to take shape you might see that your application is not using everything and you might want to only include those dependencies that are used

The first thing you need to do when starting to manually configure the dependencies is remove any ``vaadin.autoconfigure()``` line in your *build.gradle* files. If you have a multi-module project it is worth scanning through all projects and ensure that no project is using auto-configuring before continuing.

### Locking the framework versions down with a Maven BOM

When dealing with Maven dependencies one of the most hardest things are managing the *transitive* dependencies, i.e. the dependencies of the defined dependencies.

To help cope with that, Maven invent the *Bill-Of-Materials (BOM)* concept where a special dependency will provide the transitive dependency versions for the project.

The {{ site.data.strings["vaadin_plugin"].title }} provides an easy way of adding the BOM to the project. It can be added with the following configuration:

#### build.gradle
```groovy
dependencies {
    compile vaadin.bom()
    ...
}
```

### Select the base distribution of Vaadin Flow

Vaadin Flow is distributed in two flavors, Platform and Core. 

Core only includes the Open Source components and will usually be preferred if you do not intend to buy any component licenses from Vaadin.

To use Core as the base distribution add the following

#### build.gradle
```groovy
dependencies {
    ...
    compile vaadin.core()
    ...
}
```

Platform contains everything, including commercial components sold by Vaadin Ltd. Platform also will include Core so you do not need to add it separately.

To use Platform as the base distribution add the following

#### build.gradle
```groovy
dependencies {
    ...
    compile vaadin.platform()
    ...
}
```

### Select the base theme you want to use

Vaadin Flow comes with two base themes; [Lumo](https://vaadin.com/themes/lumo) and [Material](https://vaadin.com/themes/material). 

By default [Lumo](https://vaadin.com/themes/lumo) will be used if you are auto-configuring the project.

If you want to select [Lumo](https://vaadin.com/themes/lumo) as the base theme add the following

#### build.gradle
```groovy
dependencies {
    ...
    compile vaadin.lumoTheme()
    ...
}
```

If you want [Material](https://vaadin.com/themes/material) instead, then add the following

#### build.gradle
```groovy
dependencies {
    ...
    compile vaadin.materialTheme()
    ...
}
```

### Other useful helpers

There are also other useful *optional* helpers available you might use when configuring your project.

#### build.gradle
```groovy
dependencies {
    ...
    // Provide a compatible Servlet API dependency 
    compileOnly vaadin.servletApi()
    // Provide a default console logging implementation
    compile vaadin.slf4j()
    // Provide a compatible Groovy version for Groovy projects
    compile vaadin.groovy()
    ...
}
```


