---
modified: '2019-05-31 13:47:16 +0300'
title: Creating a Java function
---

Before starting ensure that the [Prerequisites]({% link _fn_gradle_plugin/prerequisites.md %}) are installed.

To create a new project create a new folder on your filesystem 

```bash
mkdir java-fn; cd java-fn
```

Then in that folder add the following *build.gradle* file

#### build.gradle
```groovy
plugins {
  id 'com.devsoap.fn' version '{{ site.data.strings["fn_plugin"].version }}'
}
```

Finally, to create the project run the **fnCreateFunction** task

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
  --method        The name of the function method entrypoint Java method
  --module        Create function as an inner sub-module
```

Once the task has run, the following folder structure is created:

<pre>
.
├── {{ "[build.gradle](#buildgradle)" | markdownify | remove: "<p>" | remove: "</p>"}}└── src
    └── main
        └── java
            └── {{ "[MyFunction.java](#myfunctionjava)" | markdownify | remove: "<p>" | remove: "</p>"}}

3 directories, 2 files
</pre>

The only other thing that was created was one single Java file, **MyFunction.java**.

#### MyFunction.java

```java
public class MyFunction {

    public String handleRequest(String input) {
        String name = ofNullable(input).filter(s -> !s.isEmpty()).orElse("world");
        return "Hello, " + name + "!";
    }
}
```

On **line 1** we define a new function class.<br/>
On **line 3** we defined the entry point method. The name of the method can be anything, but the return value is what will be returned in the HTTP request response body and the method argument is what is provided in the HTTP request body.<br/>
On **line 4-5** We define a trivial example return value.<br/>

Once you have created the function you will be able to run it by following the [Running functions locally]({% link _fn_gradle_plugin_tasks/running_functions_locally.md %}) tutorial.