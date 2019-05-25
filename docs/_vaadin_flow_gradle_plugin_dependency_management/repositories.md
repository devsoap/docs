---
layout: default
title: Repositories
modified: '2019-05-25 20:22:40 +0300'
comments: true
---

When developing your application you will most likely want to start off by adding a universal repository like [Maven Central](https://search.maven.org) or [JCenter](https://bintray.com/bintray/jcenter). Gradle supports both of these with built in helpers.

For example to use [JCenter](https://bintray.com/bintray/jcenter) you would add the following

#### build.gradle
```groovy
repositories {
    jcenter()
}
```

Or, alternatively, if you want to add [Maven Central](https://search.maven.org) then you would add the following

#### build.gradle
```groovy
repositories {
    mavenCentral()
}
```

Whatever you choose, the latest stable Vaadin libraries will exist in both.

## Other useful repositories

The {{ site.data.strings["vaadin_plugin"].title }} provides helper methods to allow you to include also other useful repositories.

For example, if you want to include **All** Vaadin repositories you could use the following helper

#### build.gradle
```groovy
repositories {
    vaadin.repositories()
}
```

But if you are only interested in pre-releases you could just include them with

#### build.gradle
```groovy
repositories {
    vaadin.prereleases()
}
```

If you want to add addons from the Vaadin Directory, then you need to add the addons repository

#### build.gradle
```groovy
repositories {
    vaadin.addons()
}
```

And, if you are looking to try out the bleeding edge snapshots you would need the snapshot repository

#### build.gradle
```groovy
repositories {
    vaadin.snapshots()
}
```

When adding repositories you should note thought that every repository that is added will increase the built and dependency resolution time. This is due to the fact that Gradle will need to traverse every repository to resolve the dependency artifact and the more repositories you have the longer that will take.