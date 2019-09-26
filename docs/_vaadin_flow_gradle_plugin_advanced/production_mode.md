---
title: Production Mode
modified: '2019-05-29 18:06:52 +0300'
compatibility_mode: true
---

Vaadin comes with a special production mode to enable running the application with older browsers, namely Internet Explorer 11.

To be able to support those browsers, the {{ site.data.strings["vaadin_plugin"].title }}  will need to re-factor the
Javascript sources of the application to a compatible form so the older browsers can interpret it correctly. This is commonly referred
to as *transpiling*.


### Enabling production mode

The production mode can either be enabled by setting a property in *build.gradle* or providing the property as an environment variable.

To enable *production mode* via *build.gradle* add the following:

#### build.gradle
```groovy
vaadin {
   productionMode = true
}
```

or when running the build by setting the ``vaadin.productionMode`` system property like so:

```bash
gradle -Dvaadin.productionMode war
```
> The example builds a WAR archive for production.


When the plugin is in production mode, it will no longer rely on static resources from the classpath, but instead it will pre-compile the
static resources in *bundles* for both older browsers and newer browsers.

### Production mode build steps

Normally you will not need to concern yourself with the individual build steps but it might be useful to know about the steps when troubleshooting 
issues with the production mode.

#### 1. Setting up the build tooling

When you start the build the plugin needs to download the necessary tooling to be able to perform the *transpilation*. This means the plugin will
download NodeJS, BowerJS and Yarn and set up their binary distributions for your project.

The reason why the plugin just doesn't use tooling that would be installed globally on the system is that in that case the build would not be *reproducible*, i.e. it would not behave the same way everywhere it is run. This is an important aspect of setting up stable and well behaving application builds.

This step is done by the **nodeSetup** and **yarnSetupTask** tasks.

#### 2. Downloading client dependencies

The next step is installing any client dependencies from Bower or Yarn/NPM the user might have defined. These dependencies might come from the ``vaadinClientDependencies`` closure in *build.gradle* or from a ``@NpmPackage`` annotation.

To download the dependencies the plugin will setup a valid ``bower.json`` and ``package.json`` files in the ``build/frontend/`` directory which 
references the dependencies and then invoke the Bower CLI tool as well as the Yarn CLI tool to perform the download.

Downloaded dependencies will be extracted to ``build/frontend/bower_components`` and ``build/frontend/node_modules`` respectively.

For Yarn/NPM dependencies an offline mirror will also be set up, so subsequent builds can be done without a network. The offline mirror will be
set up at in ``.gradle/yarn/yarn-offline-mirror``. The mirror path can be changed by using the following property:

#### build.gradle
```groovy
vaadinClientDependencies {
    offlineCachePath = '/path/to/store/local/mirror'
}
```

The download step is performed by the **vaadinInstallYarnDependencies** and **vaadinInstallBowerDependencies** tasks.

#### 3. Extract WebJars in classpath

Since Javascript components can be stored as Web Jars the sources from the also needs to be extracted for *transpilation*.

To do this the plugin will extract the Webjars into **bower_components** or **node_modules** depending on if the Jar contains
a *bower.json* or *package.json*. (In the case it contains both, it is assumed to be a Bower component).

This step is performed by the **vaadinInstallYarnDependencies** and **vaadinInstallBowerDependencies** tasks.

#### 4. Unpack dependent Java sub-projects

In a Gradle multi-module project some projects might depend on other sub-projects which produces Web Jar like artifacts. Like addon projects for example.

The plugin will scan the dependent projects and extract any jars containing web resources. This means that before the transpilation can be done all sub-project JAR artifacts will need to be built.

This step is performed by the **vaadinInstallYarnDependencies** and **vaadinInstallBowerDependencies** tasks.

#### 5. Unpack dependent resource sub-projects

The plugin supports using resource projects with Javascript dependencies in the build. A project is considered a resources project if the **base** Gradle plugin is applied to the project.

This step is performed by the **vaadinInstallYarnDependencies** and **vaadinInstallBowerDependencies** tasks.

#### 6. Convert Groovy templates to HTML

Since the plugin allows the user to define the Polymer templates as Groovy Markup templates, the templates will at this stage be converted to HTML so they
can be included in the resulting bundle.

This step is performed by the **vaadinConvertGroovyTemplatesToHtml** task.

#### 7. Wrap CSS into HTML wrappers

The plugin will wrap any CSS in **src/main/webapp/frontend** into a HTML wrapper so an user can style even inner parts of web components. Since the CSS will
be included in the bundle it needs to be done before the bundling can be done.

This step is performed by the **vaadinConvertStyleCssToHtml** task.

#### 8. Compose frontend build directory

Before the actual *transpilation** can be done the plugin will need to set up a directory for the build with all resources at specific places so the tooling
can perform the operation.

To do so, the plugin will thus copy all resources from the ``src/main/webapp/**`` folders. Then it will perform an annotation scan in the project to find all [@HTMLImport]() and [@NpmPackage]() annotations and from those compose a the necessery metadata files to proceed.

This step is performed by the **vaadinTranspileDependencies** task.

#### 9. Run polymer-bundler

At this stage the plugin isready to proceed with the bundling. It invokes the ``polymer-bundler`` command to produce a manifest file that will be needed for the next step. The manifest is an HTML file that will list all the resources that the plugin will include in the bundle.

This step is performed by the **vaadinTranspileDependencies** task.

#### 10. Run polymer-build

Now finally the plugin will perform the ``polymer build`` to *transpile* the resources into two bundles; **frontend-es5** and **frontend-es6**. 

The Vaadin Flow framework will automatically select one of these bundles depending on which browser the user is using.

This step is performed by the **vaadinTranspileDependencies** task.

#### 11. Assemble frontend

After transpilation the outputs are still located in the build directory and the plugin needs to assemble them in a form that can be included in a WAR
or JAR.

This final step is performed by the **vaadinAssembleClient** task.

