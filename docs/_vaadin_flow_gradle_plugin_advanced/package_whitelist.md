---
title: Whitelisting dependency packages
modified: '2020-06-29 10:21:05 +0300'
version: V14
---

When adding addons and third-party dependencies which have front-end code you might need to whitelist some of the packages that has classes with the @JSModule or @CSSModule annotations.

The reason for this is that the plugin will scan the classpath of the project when building the frontend bundle and by default only scans the project packages as well as any com.vaadin package.

### Adding a custom package to the whitelist
The way to use a custom whitelist is to list the missing packages in build.gradle.

Here is an example of adding the foo.bar.baz package to the list:

#### build.gradle
```groovy
vaadin {
   // Add foo.bar.baz to whitelist
   whitelistedPackages += ['foo.bar.baz']
}
```

This will result in the whitelist containing the default packages as the  custom foo.bar.baz -package.

### Replacing the default whitelist
If you are having problems with the default whitelist you can replace the whitelist completely.

#### build.gradle
```groovy
vaadin {
   // Add foo.bar.baz to whitelist
   whitelistedPackages = [
        'com.vaadin',
        'my.project.package',
        'foo.bar.baz'
   ]
}
```

When replacing the whitelist ensure that you include the default com.vaadin package. If you omit this package then the framework will not work.