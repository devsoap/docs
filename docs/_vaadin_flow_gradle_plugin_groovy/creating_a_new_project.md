---
layout: default
title: Create a new project
---

# Create a new Groovy project

The {{ site.data.strings["vaadin_plugin"].title }} supports Groovy project out-of-the-box and integrates seamlessly with the {{ site.data.strings["groovy_plugin"].title }}.

## Creating the initial build.gradle configuration

To create a new project you will need the following *build.gradle* file:

#### build.gradle

```gradle
plugins {
    id 'groovy'
    id 'com.devsoap.vaadin-flow' version '{{ site.data.strings["vaadin_plugin"].version }}'
}
```

On **line 1** we are are defining the *plugins* block. The plugins block defines what plugins will be applied to the project. In this case we are interested in two plugins; the groovy plugin and the Vaadin Flow gradle plugin.

On **line 2** we add the {{ site.data.strings["groovy_plugin"].title }} which will configure the project to allow adding Groovy source code to *src/main/groovy* and add the necessery compiler dependencies. The Vaadin plugin will also use this plugin to determine that this project in fact is a Groovy project and configure the code generation accordingly.

On **line 3** we include the {{ site.data.strings["vaadin_plugin"].title }} which will provide us with all the necessery Vaadin tasks and configurations for us to build a Vaadin application.

But adding the plugins is not yet enough for us to have a working Groovy project, we also will need to add the necessery dependencies and repositories for the project to build. We can do that by using the convenient ``vaadin.autoconfigure()`` helper method the {{ site.data.strings["vaadin_plugin"].title }} provides.

#### build.gradle

```gradle
vaadin.autoconfigure()
```

``vaadin.autoconfigure()`` is a convenient way of starting a new project when you aren't yet familiar with the the dependencies needed for a Vaadin Flow project. It will set up the repositories required for the project, configure the project to have all core dependencies and automatically select the Lumo theme as default.

> Alternatively, if you do not want to use ``vaadin.autoconfigure()`` then you can also define the repositories and dependencies manually. The Vaadin plugin also provides helpers for you when doing this.

#### build.gradle

```gradle
// Manually defining the Vaadin dependencies for a Groovy project
repositories {
    vaadin.repositories()
}

dependencies {
    vaadin.bom()
    vaadin.core()
    vaadin.lumoTheme()
    vaadin.slf4j()
    vaadin.groovy()
}
```
> <p> On <b>line 3</b> all the required repositories are added. The plugin provides a nice helper for you so you don't have to remember any of the Vaadin repository urls. </p>
> <p> On <b>line 7</b> we add the Vaadin BOM dependency. The BOM dependency locks down all transitive dependency versions to versions of the dependencies that are compatible with eachother. This is important since once you start adding addons that might depend on conflicting versions it could otherwise brake.</p> 
> <p> On <b>line 8</b> we add the Vaadin Flow Core framework. These include all the framework code as well as all Open Source dependencies.</p> 
> <p> On <b>line 9</b> we add a dependency to the Lumo base theme which will define how our UI will look like.</p> 
> <p> On <b>line 10</b> we add a Logging implementation. This is optional and if you wish you could switch it out to another Logging implementation.</p> 
> <p> On <b>line 11</b> we add a compatible Groovy dependency. You can also use your own Groovy version, but the one provided by the plugin has been pre-tested.</p> 


## Creating application stubs

Now that we have the **build.gradle** file configured we are ready to create the application source files.

The {{ site.data.strings["vaadin_plugin"].title }} comes with the following out-of-the-box tasks for creating different source files:

{% for task in site.data.strings["vaadin_plugin"].creator_tasks %}
* [{{task}}](https://github.com/devsoap/gradle-vaadin-flow/wiki/Tasks-and-configuration-DSL#user-content-{{task | downcase }})
{% endfor %}

Since we are creating a new project, we are going to go with the [vaadinCreateProject](https://github.com/devsoap/gradle-vaadin-flow/wiki/Tasks-and-configuration-DSL#user-content-vaadincreateproject) task.

```bash
gradle vaadinCreateProject --name MyProject --package com.example
```

Once you have run that task you should see the following folder structure:

<pre>
.
├── build.gradle
└── src
    └── main
        ├── groovy
        │   └── com
        │       └── example
        │           ├── {{ "[MyProjectServlet.groovy](#myprojectservletgroovy)" | markdownify | remove: "<p>" | remove: "</p>"}}        │           ├── {{ "[MyProjectUI.groovy](#myprojectuigroovy)" | markdownify | remove: "<p>" | remove: "</p>"}}        │           └── {{ "[MyProjectView.groovy](#myprojectviewgroovy)" | markdownify | remove: "<p>" | remove: "</p>"}}        └── webapp
            └── frontend
                └── styles
                    └── {{ "[myproject-theme.css](#myprojectthemecss)" | markdownify | remove: "<p>" | remove: "</p>" }}
8 directories, 5 files
</pre>

<br>
Lets have a look at the created files one-by-one.

#### MyProjectServlet.groovy

```groovy
package com.example

import com.vaadin.flow.server.VaadinServlet
import com.vaadin.flow.server.VaadinServletConfiguration
import javax.servlet.annotation.WebServlet

@WebServlet(urlPatterns = '/*', name = 'MyProjectServlet', asyncSupported = true)
@VaadinServletConfiguration(ui = MyProjectUI, productionMode = false)
class MyProjectServlet extends VaadinServlet { }
```

As the name of the file describes, the Servlet class will configure our Vaadin Flow servlet. In this class we do not need to implement or override anything, everything is configured using annotations.

[``@WebServlet``](https://docs.oracle.com/javaee/7/api/javax/servlet/annotation/WebServlet.html) annotation is a standand Java EE Servlet 3 annotation for declaring a Servlet 3 servlet. In the generated code we define the Vaadin servlet to listen to the root context (*/*) of the server. It also enables the asyncronous support for the servlet as Vaadin by default supports it.

[``@VaadinServletConfiguration``](https://vaadin.com/api/platform/com/vaadin/flow/server/VaadinServletConfiguration.html) is used to further configure the Vaadin Flow specific servlet parameters. In our case it points us to the main UI of the application as well as turns of production mode by default. 

> Even though **productionMode=false** here the plugin can enable the production mode in other ways. Read more about production mode in the section about production mode configuration.

All Vaadin Flow application servlets should extend the [``VaadinServlet``](https://vaadin.com/api/platform/com/vaadin/flow/server/VaadinServlet.html). The [``VaadinServlet``](https://vaadin.com/api/platform/com/vaadin/flow/server/VaadinServlet.html) is a standard Java servlet with Vaadin specific implementation for handling HTTP requests.


#### MyProjectUI.groovy

```groovy
package com.example

import com.vaadin.flow.component.dependency.HtmlImport
import com.vaadin.flow.component.UI
import com.vaadin.flow.theme.lumo.Lumo
import com.vaadin.flow.theme.Theme

@HtmlImport("frontend://styles/myproject-theme.html")
@Theme(Lumo)
class MyProjectUI extends UI { }

```

The [``UI``](https://vaadin.com/api/platform/com/vaadin/flow/component/UI.html) is responsible for rendering the Vaadin Flow application. 

By default the implemention of the UI is empty and it will automatically be initializated with the main view, but if we want lower level access then it is advisable to create your own [``UI``](https://vaadin.com/api/platform/com/vaadin/flow/component/UI.html). 

For example, if you want to get the request parameters you can override the ``init(VaadinRequest request)`` method of the UI and read the parameters from the provided [``VaadinRequest``](https://vaadin.com/api/platform/com/vaadin/flow/server/VaadinRequest.html).

In some cases, for instance when using [Spring Boot](https://spring.io/projects/spring-boot), no [``UI``](https://vaadin.com/api/platform/com/vaadin/flow/component/UI.html) instance is required.


#### MyProjectView.groovy

```groovy
package com.example

import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Label
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.page.BodySize
import com.vaadin.flow.component.page.Viewport
import com.vaadin.flow.router.Route

@Route('')
@BodySize(height = '100vh', width = '100vw')
@Viewport('width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes')
class MyProjectView extends VerticalLayout {

    MyProjectView() {

        className = 'app-view'

        add new Label('Hello Groovy app!')

        add new Button('Click me!', { event ->
             event.source.with {
                text = 'Clicked!'
                className = 'clicked'
            }
        })
    }
}
```
The view class is what the end-user sees when accessing the application url.

The [``@Route``](https://vaadin.com/api/platform/com/vaadin/flow/router/Route.html) annotation configures on which sub-path the view is displayed. The path is relative to the application path so if you for example are hosting the Vaadin application at **https://example.com/myproject** and you would have defined your route to be ``@Route('roxx')`` then your view would be accessable at **https://example.com/myproject/roxx**.

Using the [``@BodySize``](https://vaadin.com/api/platform/com/vaadin/flow/component/page/BodySize.html) annotation we can configure the size of the root body tag. In most cases when building an application you will want your application to take up all the space of the browser window, so by default it is set to 100vh (**100** % of the **v**iewport **h**eight) and 100vw (**100**% of the **v**iewport **w**idth).

We can also further tweak how the application can scale when the user zooms in or out by using the [``@Viewport``](https://vaadin.com/api/platform/com/vaadin/flow/component/page/Viewport.html) annotation.

One thing to remember is that every view needs to extend a Vaadin [``Component``](https://vaadin.com/api/platform/com/vaadin/flow/component/Component.html). By default the default view will use the [``VerticalLayout``](https://vaadin.com/api/platform/com/vaadin/flow/component/orderedlayout/VerticalLayout.html) which will stack the components vertically.

The created default application will add a [``Label``](https://vaadin.com/api/platform/com/vaadin/flow/component/html/Label.html) as well as a [``Button``](https://vaadin.com/api/platform/com/vaadin/flow/component/button/Button.html) with an event-handler to demonstrate how to add a few components to the view.

#### myproject-theme.css
```css
/*
 * This file contains the Application theme
 */
label { color: green; }
label.clicked { color: red; }⏎    
```

A CSS theme file for the application is also created for your convenience. The theme file is by default imported in [MyProjectUI.groovy](#myprojectuigroovy).

> <b>How can a CSS file work HTML imports?</b> <br>
>By default any CSS file placed in */webapp/frontend/styles* will automatically be wrapped in a HTML wrapper. That is why we can simply use CSS files and not always wrap the css in a HTML file that is done in many Maven project examples. IF you want to have a look at how the HTML wrappers will look like then look into **/build/webapp-gen/frontend/styles** where the generated will exist.
