---
modified: '2020-02-09 17:42:06 +0200'
title: Usage
priority: 2
---

The {{ site.data.strings["ds_cloud_cache"].title }} integrates directly with the [Gradle Build Cache](https://docs.gradle.org/current/userguide/build_cache.html) and so works with any Gradle build that uses the cache.

#### Enabling cache in build

To enable the cache you have two options:
1. Run the build with the ``--build-cache`` command line paramenter
2. Put ``org.gradle.caching=true`` in your gradle.properties file.

Once that has been done, Gradle will activate all caches defined in the build.

#### What gets cached?

What gets cached is determined by what you build and what other Gradle plugins you have in the build.

For caching to work the plugins that you have included in your build needs to support it as well. All plugins provided by Devsoap or Gradle have
built-in support for Gradle caching and will work out of the box. 

#### Where are the cache artifacts stored?

The cache artifacts are stored in a Amazon S3 bucket in the Amazon cloud managed by Devsoap. The bucket has a cache retention policy of one week
for your uploaded artifacts.
