---
title: Offline mode and Caching
modified: '2019-06-11 19:58:51 +0300'
---

The {{ site.data.strings["vaadin_plugin"].title }} supports both working offline and advanced methods of caching artifacts.


## Gradle offline mode
To enable offline mode run Gradle with the ``--offline`` command line parameter. 

For more information about using Gradle in offline mode check out the relevant chapter in the [Gradle User Guide](https://docs.gradle.org/current/userguide/troubleshooting_dependency_resolution.html#avoiding_network_access_with_offline_mode).


## Production mode offline mode

When you have turned on Vaadin production mode (``vaadin.productionMode=true``) or if you have defined client dependencies either via (``vaadinclientDependencies``) or using the [@NpmPackage]() annotation the {{ site.data.strings["vaadin_plugin"].title }} will also enables offline mode for client dependency resolution when the ``--offline`` parameter is given.

For this to work you will need to (at least once) resolve all the dependencies online which after you will need to add ``.gradle/yarn/yarn-offline-mirror`` and ``build/frontend/yarn.lock`` to your version control so the plugin can resolve the dependencies from your local mirror when you are offline.

## Gradle parallel task execution

The {{ site.data.strings["vaadin_plugin"].title }} supports using the ``--parallel`` command line option to simultaneously execute many of the aspects of the build.

## Gradle build cache

The [Gradle Build Cache](https://docs.gradle.org/current/userguide/build_cache.html) allows Gradle to store every tasks compiled artifact in a cache on the disk. This allows Gradle to only re-build the tasks that have changes in the task graph.

The {{ site.data.strings["vaadin_plugin"].title }} leverages this cache to store compiled Java class files, CSS, SASS, HTML as well as in production mode the transpilation results (``frontend`` directory).

Gradle does not enable by default the build cache. There are two ways you can enable it;

Either by adding ``--build-cache`` to the command line when running the gradle command, for example:

```bash
gradle --build-cache jettyRun
```

Or, if you don't want to remember adding it to the command line every time, add ``org.gradle.caching=true`` to your ``gradle.properties`` in the project.

For more information how to configure the build cache check out the [Gradle User Guide](https://docs.gradle.org/current/userguide/build_cache.html#sec:build_cache_configure)

## Sharing the build cache among all developers

When you enable the build cache Gradle will by default store the cache on your local disk. However, Gradle also provides a way of sharing the build cache using a remote server.

The simples way of starting the server is using the ready made Docker image and running

```bash
docker run -d -v /opt/build-cache-node:/data -p 80:5071 gradle/build-cache-node:latest
```

You can omit ``-v /opt/build-cache-node:/data`` if you just want a temporary cache the resets every time you restart the docker container.

You can also change the port (for example to 9000) of the image by changing ``-p 80:5071`` to ``-p 9000:5071``.

Once you have the build cache server running you need to configure your build to send the build cache content to the server.

#### settings.gradle
```groovy
buildCache {
    local {
        enabled = false // <- Set to true if you want to have both a local AND a remote build cache :)
    }
    remote(HttpBuildCache) {
        url = "http://192.168.0.4:9000/" // <- The IP and Port of the running build cache server
        push = true
    }
}
```

Once you have done this, then when you build the project the build cache will automatically be sent to the remote server. 

Reversely, when you start a new build **on any machine** Gradle will first check the build cache to see if we already have built it and if so just download the previously built artifacts instead of re-building it which might take some time.

For more information about running the build cache server check out the [Gradle User Guide](https://docs.gradle.com/build-cache-node).
