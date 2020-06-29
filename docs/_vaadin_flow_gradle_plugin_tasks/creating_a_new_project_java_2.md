---
title: Create a new Java project
modified: '2020-06-29 10:21:05 +0300'
priority: 1
version: V14
---

The DS Vaadin Flow Gradle Plugin supports Java projects out-of-the-box and integrates seamlessly with both the Gradle Java Plugin and the Gradle WAR Plugin.

#### Creating the initial build.gradle

To create a new Java project you will need the following  in your build.gradle file:

**build.gradle** 
```groovy
plugins {
	id 'com.devsoap.vaadin-flow' version '1.3.3'
}
...
```

<blockquote>
<p>On <b>line 1</b> we are are defining the plugins block. The plugins block defines what plugins will be applied to the project.</p>
<p>On <b>line 2</b> we include the DS Vaadin Flow Gradle Plugin which will provide us with all the necessary Vaadin tasks and configurations for us to build a Vaadin application.</p>
<p><i>Compatibility note:</i> You will need plugin version 1.3 or above to use the NPM features of Vaadin 14 and beyond.</p>
</blockquote>

That is all we need, the DS Vaadin Flow Gradle Plugin will automatically apply the Gradle Java Plugin to the project, we don’t need to do it here.

#### Configuring the repositories and dependencies

**build.gradle**
```groovy
...
vaadin.autoconfigure()
...
```

``vaadin.autoconfigure()`` is a convenient way of starting a new project when you aren’t yet familiar with the the dependencies needed for a Vaadin Flow project. It will set up the repositories required for the project, configure the project to have all core dependencies and automatically select the Lumo theme as default.

Alternatively, if you do not want to use ``vaadin.autoconfigure()`` then you can also define the repositories and dependencies manually. The Vaadin plugin also provides helpers for you when doing this.

**Alternative manual configured build.gradle**
```groovy
// Manually defining the Vaadin dependencies for a Java project
repositories {
  vaadin.repositories()
}

dependencies {
  vaadin.bom()
  vaadin.core()
  vaadin.lumoTheme()
  vaadin.slf4j()
}
```

<blockquote>
<p>On <b>line 3</b> all the required repositories are added. The plugin provides a nice helper for you so you don't have to remember any of the Vaadin repository urls.</p>
<p>On <b>line 7</b> we add the Vaadin BOM dependency. The BOM dependency locks down all transitive dependency versions to versions of the dependencies that are compatible with eachother. This is important since once you start adding addons that might depend on conflicting versions it could otherwise brake.</p>
<p>On <b>line 8</b> we add the Vaadin Flow Core framework. These include all the framework code as well as all Open Source dependencies.</p>
<p>On <b>line 9</b> we add a dependency to the Lumo base theme which will define how our UI will look like.</p>
<p>On <b>line 10</b> we add a Logging implementation. This is optional and if you wish you could switch it out to another Logging implementation. We add the Vaadin Flow Core framework. These include all the framework code as well as all Open Source dependencies.</p>
</blockquote>

#### Creating application stubs
Now that we have the build.gradle file configured we are ready to create the application source files.<br/>
The DS Vaadin Flow Gradle Plugin comes with the following out-of-the-box tasks for creating different source files:
<ul>
    <li><i>vaadinCreateProject</i> - Create a new project</li>
    <li><i>vaadinCreateComponent</i> - Create a new server side component</li>
    <li><i>vaadinCreateComposite</i> - Create a new server side component out of existing components</li>
    <li><i>vaadinCreateWebComponent</i> - Create a new server side component connected to a client side Web component</li>
    <li><i>vaadinCreateWebTemplate</i> - Create a new server side component connected to ta client side Polymer Web Template</li>
</ul>

Since we are creating a new project, we are going to go with the vaadinCreateProject-task:

```bash
}> gradle vaadinCreateProject --name MyProject --package com.example
```

Lets have a look at the created files one-by-one.

**MyProjectView.java**
```java
package com.example;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.BodySize;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.theme.Theme;

/**
 * The main view of the application
 */
@Route("")
@Theme(Lumo.class)
@BodySize(height = "100vh", width = "100vw")
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
@CssImport("./theme.css")
public class MyProjectView extends VerticalLayout {

    public VaadinFlowPluginTestView() {
        setClassName("app-view");

        Label hello = new Label("Hello Gradle app!");
        add(hello);

        Button button = new Button("This is a Vaadin Button, Click me!", event -> {
            hello.setClassName("clicked");
            hello.setText("Clicked! Next is a custom Polymer template button, Click it!");
            event.getSource().setVisible(false);
            add(new HelloButton());
        });

        add(button);
    }
}
```

<p>
The view class is what the end-user sees when accessing the application url.
</p><p>
The @Route annotation configures on which sub-path the view is displayed. The path  is relative to the application path so if you for example are hosting  the Vaadin application at https://example.com/myproject and you would have defined your route to be @Route('roxx') then your view would be accessable at https://example.com/myproject/roxx.
</p><p>
Using the @BodySize annotation we can configure the size of the root body tag. In most  cases when building an application you will want your application to  take up all the space of the browser window, so by default it is set to  100vh (100 % of the viewport height) and 100vw (100% of the viewport width).
We can also further tweak how the application can scale when the user zooms in or out by using the @Viewport annotation.
</p><p>
One thing to remember is that every view needs to extend a Vaadin Component. By default the default view will use the VerticalLayout which will stack the components vertically.
</p><p>
The created default application will add a Label as well as a Button with an event-handler to demonstrate how to add a few components to the view.
Furthermore, a Javascript Web component (HelloButton) is created in the project to demonstrate the usage of Web Components with Vaadin.
</p>

**HelloButton.java**
```java
package com.example;

import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.polymertemplate.EventHandler;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.templatemodel.TemplateModel;

@Tag("hello-button")
@JsModule("./hello-button.js")
public class HelloButton extends PolymerTemplate<HelloButton.HelloButtonModel> {

    @Id("caption")
    private Element caption;

    public HelloButton() {
        caption.setText("Click Me!");
    }

    @EventHandler
    private void sayHello() {
        caption.setText("You clicked, how can I help you? Click again!");
        getParent().ifPresent(layout -> ((HasComponents)layout).add(new HelloButton()));
    }

    public interface HelloButtonModel extends TemplateModel {}
}
```

To connect the server side Java class with the web component, a javascript file is created under ``/src/main/javascript``. All Javascript files (web components, Polymer templates, etc.) you want to use should be placed under this folder for the plugin to be able to bundle them into the Javascript bundle provide for the browser.

**hello-button.js**
```javascript
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

class HelloButtonElement extends PolymerElement {

  static get template() {
    return html`
        <style>
            :host { display: inline-block; cursor: pointer; animation: blinker 1s linear infinite;  }
            @keyframes blinker { 50% { opacity: 0; }}
        </style>
        <span id="caption" on-click="sayHello">[[caption]]</span>
    `;
  }

  static get is() {
      return 'hello-button';
  }
}
customElements.define(HelloButtonElement.is, HelloButtonElement);
```

The HelloButtonElement is a simple Polymer element with some inline styles as well as a caption that is bound to a model property.

Finally a theme is created for the project which allows you to style your project. All stylesheets should be put under the ``src/main/stylesheets`` folder.Javascript button implementation with a click handler that sends the event to the server.

**theme.css**
```css
/*
 * This file contains the Application theme
 */
label {
  color: var(--lumo-primary-text-color);
}
label.clicked {
  color: var(--lumo-success-color);
}
```

One thing to note is that Lumo variables are available in this CSS file otherwise this is plain CSS.

<blockquote>
<b>Styling the Shadow DOM</b><br/>
When a CSS file is placed into src/main/stylesheets it will be wrapped in a Javascript wrapper that allows you to style also the inner parts of a web components (also called the Shadow DOM). This is done transparently at build phase by the plugin.
</blockquote>

To continue with running the project on Jetty, add the Gretty plugin as described here and then you can run the project by invoking the jettyRun task. 