---
modified: '2019-05-31 13:47:16 +0300'
title: Running functions locally
---

Once you have [created a new function]({% link _fn_gradle_plugin_tasks/create_java_function.md %}) the {{ site.data.strings["fn_plugin"].title }} provides ways of both running and testing the function.

## Starting the local FN server

To publish your function you will need to start the a FN server locally.

The {{ site.data.strings["fn_plugin"].title }} provides you with a simple task that starts the server:

```bash 
gradle fnStart
```

#### fnStart Task Description
```pre
Runs the FN Server in standalone mode on the local docker instance

Usage: gradle fnStart

Optional arguments:
  * No arguments available.
```

The server will be started in the background as a docker deamon process.

The server will be listening on [http://localhost:8080](http://localhost:8080)

To stop the server you can run **fnStop**


```bash 
gradle fnStop
```

#### fnStop Task Description
```pre
Runs the FN Server in standalone mode on the local docker instance

Usage: gradle fnStop

Optional arguments:
  * No arguments available.
```

## Publishing a function to the local server

By default the {{ site.data.strings["fn_plugin"].title }} will assume to deploy locally so there is minimal configuration needed.

To deploy the function we use the **fnDeploy** gradle task:

```bash 
gradle fnDeploy
```

#### fnDeploy Task Description
```pre
Deploys the function to a running FN Server

Usage: gradle fnDeploy

Optional arguments:
  * No arguments available.
```

The gradle plugin will do three things:
1. Assemble the plugin into a Docker image
2. Deploy the image to the local docker registry
3. Register the function image with the FN server and set up any necessary routes



## Testing the function

While any utility that can create HTTP requests can be used, the plugin comes with a built in task for doing some preliminary testing.

To invoke the function running locally we use the **fnInvoke** command.


```bash 
gradle fnInvoke
```

#### fnDeploy Task Description
```pre
Performs a HTTP request to the running function and displays the response

Usage: gradle fnInvoke

Optional arguments:
  --input         The input to provide the function. Sent as the body of the HTTP request.
  --trigger       The trigger (path) of the function to invoke
  --app           The function application to invoke (if a multimodule project)
  --context       The FN configuration context to use. Uses "default" by default.
  --headers       Custom HTTP headers to pass the function
  --method        The HTTP Method to use. If input is given the by default POST otherwise GET.
  --params        URL parameters to provide the function
```

The gradle plugin will do three things:
1. Assemble the plugin into a Docker image
2. Deploy the image to the local docker registry
3. Register the function image with the FN server and set up any necessary routes

After the gradle task is run the response payload is displayed in the console.

For example, if we take the default application created by the plugin then invoking the function would provide the following output

```bash
gradle fnInvoke --input="John" --method=POST

> Task :fnInvoke

================ FUNCTION RESPONSE ====================

Hello, John!

=======================================================

BUILD SUCCESSFUL in 4s
5 actionable tasks: 1 executed, 4 up-to-date
```

## Publishing a new version every time a change is made

When developing a function it is convenient that the function would be re-deployed every time a change has been made so it is easier to see
if it works or not.

The {{ site.data.strings["fn_plugin"].title }} supports Gradle's continuous mode so this can be achieved by using the **-t** switch. Whenever you change the source code the function will re-deploy.

You can use **-t** switch with both the **fnDeploy** and the **fnInvoke** tasks. If you use it with **fnDeploy** the function will only be re-deployed with every change. If you use it with **fnInvoke** the function will first be deployed and then invoked every time you change the source code.