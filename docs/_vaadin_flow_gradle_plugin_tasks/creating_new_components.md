---
layout: default
title: Creating new Vaadin Flow components
modified: '2019-05-25 19:37:04 +0300'
priority: 2
---

When you start out with Vaadin Flow you will find that there are plenty of components to chose from even if you are using the basic core components.

But most likely soon you will want to start composing existing components into new, re-usable components within your application or create new components based on existing Javascript components. Whatever your use-case is the {{ site.data.strings["vaadin_plugin"].title }} has tasks for creating them.

## Composing new components

Composing new components out of existing components is one of the most basic thing you can do with a component based framework like Vaadin Flow. For this purpose the {{ site.data.strings["vaadin_plugin"].title }} has two tasks.

Lets look at the first use-case:

> **USE CASE**: To create a composite component out of layouts or other components

To create a very simple new component in the project run the following

```bash
gradle vaadinCreateComposite --name MyLabel
```

#### vaadinCreateComposite Task Description
```pre

Creates a new Vaadin Flow server side composite component

Usage: gradle vaadinCreateComposite [ARGS]

Optional arguments:
  --name          Component name
  --package:      Component Java package
  --baseClass:    Base class the component inherits from
```

Once the task has run a new class file will be created with the following content.

(Example in a Java project. For Groovy and Kotlin a similar class will be created)

#### MyLabel.java
```java
public class MyLabel extends Composite<Div> {

  private final Label label = new Label();
  private final Input input = new Input();

  public MyLabel(String labelText, String value) {
      label.setText(labelText);
      input.setValue(value);
      getContent().add(label, input);
  }
}
```
On **line 1** we create a new class which extends the [Composite]() type. This means that the component content will be wrapped in a simple **div**-element.<br/>
On **line 3** and **line 4** we create the components we want to compose to become the new component.<br/>
Finally on **line 6** to **line 9** we provide some values for the components.

This approach is good if you want to encase a few components in a wrapper and only expose a simple Java API server side.

Lets look at the second use-case:

> **USE CASE**: To create a plain component and add some minor listeners and modifications

To create a standard plain Vaadin Flow component we can execute the following task

```bash
gradle vaadinCreateComponent --name MyTextField --tag my-text-field
```

#### vaadinCreateComponent Task Description
```pre
Creates a new Flow component

Usage: gradle vaadinCreateComponent [ARGS]

Optional arguments:
  --name          Component name
  --package:      Component Java package
  --tag:          HTML tag of the component
```
Once the task has run a new class file will be created with the following content.

(Example in a Java project. For Groovy and Kotlin a similar class will be created)

#### MyTextField.java
```java
@Tag("my-text-field")
public class MyTextField extends Component {

    public MyTextField(String value) {
        setValue(value);
    }

    @Synchronize("change")
    public String getValue() {
        return getElement().getProperty("value");
    }

    public void setValue(String value) {
        getElement().setProperty("value", value);
    }
}
```

On **line 1**  the HTML tag of the component is defined. This is the element name that will be shown in the DOM.
<br/>
On **line 2**  we define the component class. Not that most component inherit the [Component](https://vaadin.com/api/platform/com/vaadin/flow/component/Component.html) class.
<br/>
On **line 8** we define a client side value getter. This getter will fetch the value of an element property in the DOM and return it as a plain String. This is a convenient way of fetching values set by client side Javascript for example.
<br/>
On **line 13** we define the client side value setter. This does the inverse of what we did vie the getter, i.e sets the value into the DOM.


## Re-using existing Javascript components

While in most cases composing new components from existing ones or creating server side components is enough to build a business application, in some cases it is beneficial to re-use an existing Javascript component as base for your component.

The {{ site.data.strings["vaadin_plugin"].title }} supports creating these kind of hybrid components out-of-the-box using the **vaadinCreateWebComponent** task.

```bash
gradle vaadinCreateWebComponent --name PolymerSlider --dependency "bower:PolymerElements/paper-slider:v2.0.5"
```

#### vaadinCreateWebComponent Task Description
```pre
Creates a new Web Component from a Bower/Yarn dependency

Usage: gradle vaadinCreateWebComponent [ARGS]

Optional arguments:
  --name          Component name
  --package:      Component Java package
  --tag:          HTML tag of the component
  --dependency:   Bower/Yarn dependency
```

In the example above we are creating a new Vaadin Flow component which leverages the [https://www.webcomponents.org/element/@polymer/paper-slider] web component on the client side. 

The first thing you will notice after the task was run is that the following section was added to *build.gradle*

```groovy
vaadinClientDependencies.bower('PolymerElements/paper-slider:v2.0.5')
```

What this means is that the given dependency was automatically added as a Bower client dependency to the build and when the build runs it will be automatically downloaded from the Bower repository.

This is the way the ``--dependency`` parameter is interpreted

```css
--dependency "bower:PolymerElements/paper-slider:v2.0.5"
|___________||_____||___________________________||_____|
     1           2                3                 4

1) The dependency parameter option. Must be defined for a Web Component
2) The repository from where the dependency should be downloaded. Can be either bower or yarn
3) The dependency name
4) The dependency version. Can be omitted in which case the latest version of the dependency is downloaded
```

To see more about client dependencies read the [Adding a Javascript dependency]({% link _vaadin_flow_gradle_plugin_javascript/add_yarn_npm_dependency.md %}) tutorial.

This is how the Java component will look after running the **vaadinCreateWebComponent** task

#### PolymerSlider.java
```java
@Tag("polymer-slider")
@HtmlImport("frontend://bower_components/paper-slider/paper-slider.html")
public class PolymerSlider extends Component {
    public PolymerSlider() {}
}
```
On **line 1** a [@Tag]() annotation was added to define the HTML element tag the component should have in the DOM.
On **line 2** the actual import is added. This is what glues together the server side component with the Web Component.
On **line 3** all components extend the [Component]() base class so they can be added to any layout in Vaadin Flow. 

If we examine the [@HTMLImport]() tag a bit closer:

```css
@HtmlImport("frontend://bower_components/paper-slider/paper-slider.html");
|__________||_________||_______________||_____________||________________|
     1           2             3               4                5

1) The annotation to define that we want to import a Web Component via HTML
2) A magic protocol definition that will make the Vaadin Servlet search for the downloaded Web Component in 
   a "frontend" folder packaged with the web application
3) The component repository path. Components downloaded from Bower resides in "bower_components" and components 
   downloaded from Yarn/NPM resides in "node_modules".
4) The relative path to the downloaded component within the repository folder
5) The HTML file to import
```

Currently the {{ site.data.strings["vaadin_plugin"].title }} only supports importing Polymer 1/2 components using HTML Imports. In the future Polymer 3 and Javascript imports are planned.