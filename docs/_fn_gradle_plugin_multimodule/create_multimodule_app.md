---
modified: '2019-06-02 16:42:47 +0300'
title: Creating a multi-module functional application
priority: 4
---

In more realistic cases you will want to create applications with contains multiple functions. The {{ site.data.strings["fn_plugin"].title }} provides you with an easy way to manage those as well.

## Create the root project

When you start a multi-module project you should always create a root project which does not have any source code, it will only serve as an group for all your 
application modules.

```bash
mkdir my-app; cd my-app
```

Next, you will need to add the main build.gradle file to the root project. 

```groovy
plugins {
    id 'com.devsoap.fn' version '{{ site.data.strings["fn_plugin"].version }}'
}

subprojects {
    apply plugin: 'com.devsoap.fn'
}
```

## Create the first function

Now that we have our root project, we can start creating functions. 

```bash
gradle fnCreateFunction --name=Function1 --module
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

There are two important parameters here:

We use ``--name`` to not only specify a name for the function, it will also become the name for the module.

We use ``--module`` to define that we want to create the function as a sub-module to the current project.

After we have run the project we should have the following file structure:

<pre>
.
├── build.gradle
├── function1
│   ├── build.gradle
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── Function1.java
└── settings.gradle

6 directories, 4 files
</pre>

Let's have a look at the created fules

#### function1/build.gradle
```groovy
fn {
    functionClass = 'com.example.Function1'
    functionMethod = 'handleRequest'
}
```
The only thing the function build file contains is a ``fn{}`` configuration closure.

In the ``fn{}`` the created function class and function method is defined. 

#### settings.gradle
```groovy
include 'function1'
```

A root **settings.gradle** file was created and a reference to the create function module included.

#### function1/Function1.java
```java
public class Function1 {

    public String handleRequest(String input) {
        String name = ofNullable(input).filter(s -> !s.isEmpty()).orElse("world");
        return "Hello, " + name + "!";
    }
}
```

And finally the example function implementation was created. It is the same implementation as when you create a single module project.

## Create the n-th function

Lets now create a few more modules to get a feel of how the multi-module application would behave

Lets run ``fnCreateFunction`` two more times

```bash
gradle fnCreateFunction --name=Function2 --module
```

```bash
gradle fnCreateFunction --name=Function3 --module
```

Now, the project structure should look like this

<pre>
.
├── build.gradle
├── function1
│   ├── build.gradle
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── Function1.java
├── function2
│   ├── build.gradle
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── Function2.java
├── function3
│   ├── build.gradle
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── Function3.java
├── my-app.iml
└── settings.gradle
</pre>

## Mapping functions to paths

Every FN application will have its own root url. The root URL will look something like this **http://localhost:8080/my-app/**

Additionally, every function defined in the application will also need to have its own unique path mapping. Every function can have one or any number of mappings.

To map a function we need to add the mapping information into the ``build.gradle`` of that function.

For example, we could map ``function1`` to the root by changing its **build.gradle** file to look like this:

#### function1/build.gradle
```groovy
fn {
    functionClass = 'com.example.Function1'
    functionMethod = 'handleRequest'
    functionPaths = ['/']
}
```

By setting the function paths to ``/`` we map ``Function1`` to reply at the root URL of the application, i.e. **http://localhost:8080/my-app/**

Let us now re-configure the second functions mapping.

#### function2/build.gradle
```groovy
fn {
    functionClass = 'com.example.Function2'
    functionMethod = 'handleRequest'
    functionPaths = ['/hello.txt']
}
```

Now every time we access **http://localhost:8080/my-app/hello.txt** then ``Function2`` will be invoked.

Finally let us configure the third function.

#### function3/build.gradle
```groovy
fn {
    functionClass = 'com.example.Function3'
    functionMethod = 'handleRequest'
    functionPaths = [
        '/favicon.ico',
        '/bundle.js',
        '/styles.css'
    ]
}
```

In ``Function3`` we are now handling requests to three files; ``favicon.ico``, ``bundle.js`` and ``styles.css``. Whenever one of these files are requested ``Function3`` will be called.

> **Development tip:** You might now wonder if it would be possible to map a function to a *glob*, for example ``/*``. This is not possible. You will need to define every file the function listens to as a path.

> **Development tip:** Remember, every function needs to have a **unique** path. Design your functions around that principle.

## Handling multiple file requests in a function

As was demonstrated in [function3/build.gradle](#function3buildgradle) a function can have multiple path mappings. 

In many cases we need to inside the function implementation to find out which of the paths was called so we can respond appropriately.

### function3/Function3.java
```java
public OutputEvent handleRequest(HTTPGatewayContext context) throws IOException {
    var appName = "my-app";
    var url = context.getRequestURL();
    var filename = url.substring(url.lastIndexOf(appName) + appName.length());
    return OutputEvent.fromBytes(filename.getBytes(), OutputEvent.Status.Success, "application/text");
```

By injecting the [HTTPGatewayContext]() we can get the exact URL with ``HTTPGatewayContext.getRequestURL()`` that the function was called with. We can then
use that to find out which of the defined paths was called.













