---
title: Using Cascading Style Sheets (CSS)
priority: 1
modified: '2020-01-12 11:01:28 +0200'
version: V14
---

Using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) is the default way of styling Vaadin applications.

## A simple example

When you create a new project, a default CSS file is created to help you get started. Here is an example of some CSS:

#### myproject-theme.css
```css
label { color: green; }
label.clicked { color: red; }
```

In this case we are style an element of type **label** to have a text color of <span style="color:green">green</span> and 
when the user clicks on the label and a new *css-class* is added to the label it becomes <span style="color:red">red</span>. This is just a very simple example of how CSS can be used.

For more information about the CSS syntax checkout [this excellent guide](https://developer.mozilla.org/en-US/docs/Web/CSS).

## Where should I put my CSS files?

CSS files should be put in the ``src/main/stylesheets`` directory. 

This directory is specially treated by the {{ site.data.strings["vaadin_plugin"].title }} and allows you to use CSS files to style also parts of the [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) leveraging the plugin's [auto-wrapping feature](#supporting-styling-shadow-dom-with-css-auto-wrapping). 

If you put CSS files outside of this directory your CSS will not be applied to the [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom).

## Injecting CSS files into your Vaadin application

The way you tell Vaadin about a new CSS file is to annotate a Vaadin class with the [@CssImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/CssImport.html) annotation. This is a new annotation since Vaadin 14.

For example, when you create a new project your UI class will look like this:

#### MyProjectUI.java
```java
@CssImport("./theme.css")
@Theme(Lumo.class)
public class MyProjectUI extends UI { }
```

On **line 1** you can see that we are referencing our [theme.css](#myprojectthemecss) file. This is the same file you can find in the ``src/main/stylesheets`` directory.

## Customizing CSS file injection

By default when you inject your CSS files you will just use pass the file name to the [@CssImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/CssImport.html) annotation. But in some cases you will want to configure how the css is treated to target specific parts of the the or Shadow DOM.

This can be done by setting different attributes of the [@CssImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/CssImport.html) annotation. Here is an example:

```java
@CssImport(value = "./button-theme.css", themeFor="my-button")
```

In this case we want our ``button-theme.css`` to only target our ``my-button`` class. 

Depending which attributes of the [@CssImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/CssImport.html) annotation a slighty different CSS wrapping will occur by the plugin. Check out the Javadoc of [@CssImport](https://vaadin.com/api/platform/com/vaadin/flow/component/dependency/CssImport.html) annotation to understand more of how the different attributes affects how the theme is injected.