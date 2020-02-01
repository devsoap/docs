---
title: Using Syntactically Awesome Style Sheets (SASS)
modified: '2020-02-01 09:54:44 +0200'
priority: 2
version: V10-V13
---

For Vaadin 7 and 8 users using [SASS](https://sass-lang.com) was the default way of styling Vaadin applications. This is no longer the case with Vaadin Flow but nevertheless, it is still fully possible to use [SASS](https://sass-lang.com) to style the application.

## A simple example

Before we start we need to first include the {{ site.data.strings["sass_plugin"].title }} into the project.

#### build.gradle
```groovy
    plugins {
        id 'io.freefair.jsass-war' version {{ site.data.strings["sass_plugin"].version }}
        ...
    }
```

Once that is done then the {{ site.data.strings["sass_plugin"].title }} will take care of converting our [SASS](https://sass-lang.com) into CSS at build time.

Next lets look at a trivial example.

#### myproject-theme.scss
```scss
$primary-color: green;
$secondary-color: red;

label { 
    color: $primary_color;
    &.clicked { 
        color: $secondary_color; 
    } 
}
```

In this case we are style an element of type **label** to have a text color of <span style="color:green">green</span> and 
when the user clicks on the label and a new *css-class* is added to the label it becomes <span style="color:red">red</span>. This is just a very simple example of how CSS can be used.

For more examples of how to use the [SASS](https://sass-lang.com) syntax, check out [this great tutorial](https://sass-lang.com/guide).

## Where should I put my SCSS files?

SCSS files should be put in the ``src/main/webapp/frontend/styles`` directory. 

This directory is specially treated by the {{ site.data.strings["vaadin_plugin"].title }} and allows you to use SCSS files to style also parts of the [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) leveraging the plugin's [auto-wrapping feature](#supporting-styling-shadow-dom-with-css-auto-wrapping). 

## Injecting SCSS files into your Vaadin application

The way you tell Vaadin about a new SCSS file is to annotate a Vaadin class with the [@HTMLImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/HtmlImport.html) annotation.

For example, when you create a new project your UI class will look like this:

#### MyProjectUI.java
```java
@HtmlImport("frontend://styles/myproject-theme.html")
@Theme(Lumo.class)
public class MyProjectUI extends UI { }
```

On **line 1** you can see that we are referencing our [myproject-theme.scss](#myprojectthemecss) file. 

## How does SASS become HTML

The way this works is that the {{ site.data.strings["vaadin_plugin"].title }} will leverage the  {{ site.data.strings["sass_plugin"].title }} to convert the 
[SASS](https://sass-lang.com) into CSS and then use the [CSS auto-wrapping feature](css.html#supporting-styling-shadow-dom-with-css-auto-wrapping) to wrap the remaining CSS into HTML.

By using the [CSS auto-wrapping feature](css.html#supporting-styling-shadow-dom-with-css-auto-wrapping) it means you will also be able to style the [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) with SASS.

