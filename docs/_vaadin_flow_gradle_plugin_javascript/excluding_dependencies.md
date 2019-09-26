---
title: Excluding unwanted dependencies
modified: '2019-09-26 20:33:59 +0300'
version: V10-V13
---

Due to the varying way client dependencies may be packaged some times the plugin will include too many dependencies,
or be un-able to bundle them all for production mode. In that case the plugin provides a few alternatives for cleaning
up unwanted dependencies.

## Missing imports

#### Error message:
> HTML import '/foo/bar/baz.html' could not be resolved.

This means that somewhere in your code there exists a @HTMLImport annotation referencing a HTML file which could not be
found in the downloaded dependencies.

TO solve this error you have two options; either add the missing dependency to your [vaadinClientDependencies]() or tell 
the plugin to ignore the import by adding the following:

#### build.gradle
```groovy
vaadinTranspileDependencies {
    bundleExcludes = [ '/foo/bar/baz.html']
}
```

That will make the plugin ignore the html import when bundling for production.

While the above is a quick fix, be aware the having a ignored dependency will most likely mean that you either have extra
@HTMLImports in your source code that could be removed or that somewhere some component will be broken due to the missing
client implementation.

## Excluding imports

The plugin will by default add all @HTMLImports in defined in your project to the bundle. If you are using a library which comes
with multiple components defined this might mean that a lot of extra imports might be added that never are used.

To allow you to selectively choose which imports are added the plugin provides the following mechanism:

#### build.gradle
```groovy
vaadinTranspileDependencies {
    importExcludes = [
        '.*/theme/material/.*',
        '.*/vaadin-material-styles/.*'
    ]
}
```

The excludes can be defined as single files or as RegExps to exclude multiple matching imports.
