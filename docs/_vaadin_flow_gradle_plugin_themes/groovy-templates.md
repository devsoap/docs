---
layout: default
title: Layouts with Groovy HTML Templates
priority: 4
modified: '2019-05-17 16:57:40 +0300'
---

# {{ page.title }}

You can also specify your [Polymer templates](polymer-templates.html) using a Groovy DSL. 

The benefit of using Groovy instead of plain HTML is that you get the full Groovy runtime environment available for dynamically generating the templates.

The way you define a component using a Groovy templates is by defining two files; a TPL template file and a Java component class.

The {{ site.data.strings["vaadin_plugin"].title }} expects the  Groovy templates to be placed in the ``src/main/webapp/frontend/templates`` directory.

Groovy templates are translated into HTML using the [Groovy MarkupTemplateEngine](http://docs.groovy-lang.org/next/html/documentation/markup-template-engine.html). For more information about the syntax have a look at [this documentation](http://docs.groovy-lang.org/next/html/documentation/markup-template-engine.html).

#### my-component.tpl
```groovy
link (rel:'import', href: '../bower_components/polymer/polymer-element.html')

'dom-module' ( id:'my-component') {
    template {
        div (id:'caption', 'on-click' : 'sayHello') {
            yield '[[caption]]'
        }
    }
    script('''
        class MyComponent extends Polymer.Element {
            static get is() {
                return 'my-component'
            }
        }
        customElements.define(MyComponent.is, MyComponent);
    ''')
}
```

Once you have created a Groovy template you link it with a Vaadin component like this:

#### MyComponent.java
```java
@Tag("my-component")
@HtmlImport("frontend://templates/my-component.html")
public class MyComponent extends PolymerTemplate<Div> {
  ...
}
```

Note that we reference the *my-component.***html** HTML file in the [@HTMLImport](https://vaadin.com/api/platform/13.0.7/com/vaadin/flow/component/dependency/HtmlImport.html). 

The Groovy templates are converted at build phase by the ``vaadinConvertGroovyTemplatesToHtml`` task.
