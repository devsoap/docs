---
title: Using Polymer 3 Javascript components
modified: '2020-06-29 10:21:05 +0300'
priority: 1
version: V14
---

While in most cases composing new components from existing ones or creating server side components is enough to build a business application, in some cases it is beneficial to re-use an existing Javascript component as base for your component.

The [DS Vaadin Flow Gradle Plugin]() supports creating these kind of hybrid components out-of-the-box using the [vaadinCreateWebComponent]() task.

```bash
}> gradle vaadinCreateWebComponent --name PolymerSlider --dependency "@polymer/paper-slider:3.0.1"
```

<blockquote>

    <h4>vaadinCreateWebComponent</h4> 
    <p>
        <i>Task Description:</i>:
        <pre>Creates a new Web Component from a NPM dependency </pre>
    </p><p>
        <i>Usage</i>: 
        <pre>gradle vaadinCreateWebComponent [ARGS]</pre> 
    </p><p>
    <i>Optional arguments</i>:
    <pre>        --name          Component name  
        --package:      Component Java package  
        --tag:          HTML tag of the component  
        --dependency:   Npm dependency
    </pre>
    </p>

</blockquote>

In the example above we are creating a new Vaadin Flow component which leverages the [PaperSlider]() web component on the client side.

What this means is that the given dependency was automatically added as a NPM/Yarn client dependency to the build and when the build runs it will be automatically downloaded from the Npm repository.

This is the way the ``--dependency`` parameter is interpreted

```pre
--dependency "@polymer/paper-slider:3.0.2"
|___________||_____________________||____|
     1                 2               3  
```

<blockquote>
    <ol>
        <li>The dependency parameter option. Must be defined for a Web Component</li>
        <li>The dependency name as it is in NPM repository</li>
        <li>The dependency version. Can be omitted in which case the latest version of the dependency is downloaded.</li>
    </ol>
</blockquote>

Once the task has run the following class will be created:

**PolymerSlider.java**
```java
package com.example.vaadinflowplugintest;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

@Tag("paper-slider")
@NpmPackage(value = "@polymer/paper-slider", version = "3.0.1")
@JsModule("@polymer/paper-slider/paper-slider.js")
public class PolymerSlider extends Component {

    public PolymerSlider() {

    }
}
```

This component can now be used any where in your Vaadin application just as a standard Vaadin component. Lets have a look at the different annotations added to the class to understand how it all ties up.

The first annotation we see is the [@Tag]() annotation. This will be the tag that is rendered into the DOM of the browser. It is important here that *this tag matches the tag that is defined in the Polymer 3 module*.

Next we have the [@NpmPackage]() annotation. This annotation will import the Polymer 3 component from the NPM package respository. The values for this annotation come directly from the parameters which was provided in the ``--dependency`` argument.

Finally, we have the [@JsModule]() annotation that will tell Vaadin in which file the Polymer 3 templete has been defined. This is where the magic of mapping the client dependency to the server side Java class happens. If the Polymer 3 component does not use a standard naming convention for this file (Javascript file has the same name as the package) you might need to manually correct this to correspond to the correct file.