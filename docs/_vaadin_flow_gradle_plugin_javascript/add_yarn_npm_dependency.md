---
title: Adding a Javascript dependency
modified: '2019-05-29 13:38:38 +0300'
---

The plugin supports [3 ways of adding a Javascript dependency](/vaadin_flow_gradle_plugin_javascript), 
with [Webjars](https://www.webjars.org), [Bower](https://bower.io) or [Yarn](https://yarnpkg.com).


## Adding a Javascript dependency to the project

While usually to use Bower or Yarn you will need to manage the dependencies in separate *json* files, the 
plugin allows you to manage the dependencies inside your *build.gradle* and it will then generate the proper 
files automatically.

To add a new dependency we use the *vaadinClientDependencies*-configuration block in *build.gradle*. 

### Bower

This is how you would include a bower component:

```groovy
vaadinClientDependencies {
    bower 'PolymerElements/paper-slider'
}
```

In this example we want to include the **paper-slider** component from the *PolymerElements* project into our 
project using *Bower*. 

The syntax for adding dependencies is very similar to what adding normal Gradle dependencies is.

### Yarn

And here is the same example using Yarn:

```groovy
 vaadinClientDependencies {
    yarn '@polymer/paper-slider:0.0.3'
}
```

It looks mostly the same except using the **yarn** configuration instead of **bower**.

### @NPMPackage

New since *1.2* is also a way of using the [@NpmPackage](https://vaadin.com/api/platform/14.0.0.beta2/com/vaadin/flow/component/dependency/NpmPackage.html) annotation in your application to fetch the client side dependencies with Yarn.

You can add this annotation to any class and the plugin will automatically download that dependency for you.

The syntax of the annotation is the following:

```css
@NpmPackage(value = "@polymer/paper-slider", version="0.0.3");
|__________||__________________________________||_______________|
     1                     2                           3        

1) The annotation to define that we want to download the NPM package
2) The name of the package to download
3) The version of the package to download
```

The plugin will automatically download the package at build time and place it in the */build/frontend/node_modules folder*.

### Webjars

And finally here is the same using Webjars:
```groovy
 dependencies {
    compile 'org.webjars.bowergithub.polymerelements:paper-slider:3.0.2'
 }
```

The Yarn and Bower dependencies are added to the ``vadinClientDependencies`` closure while the Webjars are added to the standard ``dependencies`` closure.
 
As you can see you can also optionally add a specific version of the dependency if you wish. If you omit the version, 
then the latest version will be used.

When you build the project the ``vaadinInstallYarnDependencies`` will install all the Yarn dependencies into ``build/frontend/node_modules`` 
, ``vaadinInstallBowerDependencies`` will install all your Bower components into ``build/frontend/bower_components``. Webjars are downloaded as standard
jars and stored in your local Gradle cache with all other project dependencies. 

## Taking a client dependency into use in a Vaadin project

We have so far only looked at how we can download the dependency into our project with Gradle but not yet looked at how we 
can integrate that Javascript component with our Java application.

To simplify things the plugin comes with a special task for adding web components to the project and generating the necessery 
stubs for using the component in the Java application.

To create a new Web Component in our project we can simply run

```bash
$> gradle vaadinCreateWebComponent --dependency 'bower:PolymerElements/paper-slider' --name 'PaperSlider'
```

This will create the following class in your project: 

```java
package com.example.vaadinflowtest;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;

@Tag("paper-slider")
@HtmlImport("frontend://bower_components/paper-slider/paper-slider.html")
public class PaperSlider extends Component {

    public PaperSlider() {
    }
}
```

You can then use this class anywhere in your views just as you do with normal Vaadin components. 

The task will also add the client dependency to your *build.gradle* automatically, so you don't have to 
manually add the dependency.

One thing to note is that, the first time you run the task it will be slow. This is because Gradle will 
need to download all necessery tooling for handling Javascript web components and download the actual component 
as well. This can take some time so be patient. Once you have the dependencies already downloaded then it will be faster.