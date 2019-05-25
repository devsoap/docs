---
layout: default
title: Layouts with Polymer HTML Templates
priority: 3
modified: '2019-05-25 19:37:04 +0300'
---

[Polymer templates](https://polymer-library.polymer-project.org/2.0/docs/devguide/dom-template) allows you to define a custom components structure by using a *declarative* HTML snippet.

The way you define a component using a [Polymer template](https://polymer-library.polymer-project.org/2.0/docs/devguide/dom-template) is by defining two files; a HTML template file and a Java component class.

The {{ site.data.strings["vaadin_plugin"].title }} expects the [Polymer templates](https://polymer-library.polymer-project.org/2.0/docs/devguide/dom-template) to be placed in the ``src/main/webapp/frontend/templates`` directory.

#### my-component.html
```html
<link rel="import" href="../bower_components/polymer/polymer-element.html">

<dom-module id="${componentTag}">
    <template>
        <div id="caption" on-click="sayHello">[[caption]]</div>
    </template>
    <script>
        class ${componentName} extends Polymer.Element {
            static get is() {
                return '${componentTag}'
            }
        }
        customElements.define(${componentName}.is, ${componentName});
    </script>
</dom-module>
```

Once you have created a [Polymer template](https://polymer-library.polymer-project.org/2.0/docs/devguide/dom-template) you link it with a Vaadin component like this:

#### MyComponent.java
```java
@Tag("my-component")
@HtmlImport("frontend://templates/my-component.html")
public class MyComponent extends PolymerTemplate<Div> {
  ...
}
```