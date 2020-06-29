---
title: Project structure
modified: '2020-06-29 10:21:05 +0300'
priority: 1
version: V14
---

The folder structure for Vaadin Flow projects follow the standard Java folder recommendations.
Here is the folder structure which you will get if you run the vaadinCreateProject task.

```bash
.
├── build.gradle
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── example
│       │           └── vaadinflowplugintest
│       │               ├── HelloButton.java
│       │               └── VaadinFlowPluginTestView.java
│       ├── javascript
│       │   └── hello-button.js
│       └── stylesheets
│           └── theme.css

```

This is a Java project, if you are using Groovy or Kotlin then the folder structure might vary slightly according to the language specific locations.

**Java Sources**
```bash
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── example
│       │           └── vaadinflowplugintest
│       │               ├── HelloButton.java
│       │               └── VaadinFlowPluginTestView.java
```

All the Java sources are located in src/main/java. This is the standard Java convention. 

**Polymer templates and other Javascript imports**

```bash
├── src
│   └── main
│       ├── javascript
│       │   └── hello-button.js
```

The plugin expects to find all the javascript sources you want to include in your Javascript bundle to be located under the src/main/javascript source directory.

src/main/javascript directory is analogous to the frontend directory in the Maven plugin.

**Theme and other CSS files**

```bash
├── src
│   └── main
│       └── stylesheets
│           └── theme.css
```

<p>All stylesheets should be placed under the stylesheets folder.</p> 
<p>All stylesheets placed here will be automatically converted into a JS Polymer module at build time so you can use them to style Polymer templates as well.</p>