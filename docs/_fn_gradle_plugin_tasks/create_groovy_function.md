---
modified: '2019-06-02 16:42:47 +0300'
title: Creating a Groovy function
priority: 2
---

Before starting ensure that the [Prerequisites]({% link _fn_gradle_plugin/prerequisites.md %}) are installed.

To create a new project create a new folder on your filesystem 

```bash
mkdir groovy-fn; cd groovy-fn
```

## Create an initial build file

In the folder you want to create the function create a new *build.gradle* file with the following content

#### build.gradle
```groovy
plugins {
  id 'groovy'
  id 'com.devsoap.fn' version '{{ site.data.strings["fn_plugin"].version }}'
}

dependencies {
  compile fn.groovy()
}

```

To build a Groovy project you will need to include the Groovy Gradle plugin in addition to the {{ site.data.strings["fn_plugin"].title }}.

You also will need to add Groovy as a compile time dependency. The {{ site.data.strings["fn_plugin"].title }} provides a nice helper method 
``fn.groovy()`` for that purpose.


## Bootstrap project

Once we have the *build.gradle* file set up we can create the project using the **fnCreateFunction** task.

```bash
gradle fnCreateFunction
```

#### fnCreateFunction Task Description
```pre

Creates a new FN function either in this project or as a sub-project to the current project

Usage: gradle fnCreateFunction [ARGS]

Optional arguments:
  --name          Function Class name
  --package       Function Class package
  --method        The name of the function method entrypoint Groovy method
  --module        Create function as an inner sub-module
```

Once the task has run, the following folder structure is created:

<pre>
.
├── {{ "[build.gradle](#buildgradle)" | markdownify | remove: "<p>" | remove: "</p>"}}└── src
    └── main
        └── java
            └── {{ "[MyFunction.groovy](#myfunctiongroovy)" | markdownify | remove: "<p>" | remove: "</p>"}}

3 directories, 2 files
</pre>

The only other thing that was created was one single Groovy file, **MyFunction.groovy**.

## The function class

#### MyFunction.java

```groovy
class MyFunction {

    String handleRequest(String input) {
        (input ?: 'world').tap { "Hello, $it!" }
    }
}
```

On **line 1** we define a new function class.<br/>
On **line 3** we defined the entry point method. The name of the method can be anything, but the return value is what will be returned in the HTTP request response body and the method argument is what is provided in the HTTP request body.<br/>
On **line 4** We define a trivial example return value.<br/>

Once you have created the function you will be able to run it by following the [Running functions locally]({% link _fn_gradle_plugin_tasks/running_functions_locally.md %}) tutorial.