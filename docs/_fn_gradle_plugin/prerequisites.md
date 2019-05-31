---
modified: '2019-05-31 13:47:16 +0300'
title: Prerequisites
priority: 1
---

To get started with the {{ site.data.strings["fn_plugin"].title }} you will need to install both [Gradle]() and [Docker]() on your system.

## Installing Gradle on the system

If you are starting from scratch with Gradle you will first need to install Gradle on your system. How you do this depends on your operating system.

### Linux
On Linux Gradle can already be found under most package managers. However, many times the version of Gradle that is distributed via the default repositories are usually quite old and might not work with the Gradle Vaadin Plugin.

If you are on **Ubuntu** there is an excellent ppa available that will always provide you with the newest version of Gradle. You can install it using the following commands:
```bash
sudo add-apt-repository ppa:cwchien/gradle
sudo apt-get update
sudo apt-get install gradle
```

Another alternative is to use [SDKMAN!](http://sdkman.io/) to install gradle. Look at the website for further instructions of how to install. After you have installed it, you can issue ``sdk install gradle`` to get the latest version of gradle.

If no other option works for you then you can always download the distributable directly from gradle.org and put in the the PATH of your system. The latest release can always be found at https://gradle.org/gradle-download/

### Windows
There is not installer for Gradle on Windows so you will have to download the Gradle distribution from https://gradle.org/gradle-download/ and put Gradle on your PATH. 

A very good tutorial on how to do that can be found at http://www.bryanlor.com/blog/gradle-tutorial-how-install-gradle-windows

### OSX

On OSX you can use homebrew to install Gradle, in your console execute
```bash
brew install gradle
```

However, the version available via homebrew might be old, so if you want to update to the latest version you can use the good instructions over at http://ondrej-kvasnovsky.blogspot.fi/2012/05/how-to-install-gradle-on-mac-os.html.


## Installing Docker on the system

Similarly, if you haven't used [Docker]() before you will also need to install it on the system. 

### Linux

Most linux system will have [Docker]() in their package repositories. 

For example on **Ubuntu** you will only need to install the following package:

```bash
sudo apt install docker.io
```

The package name may vary on different distributions.

### Windows

A docker installer is available via Docker Hub. It is [available here](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

After installing it you should be good to go.

### OSX

As with Windows, an installer for OSX is also available on Docker Hub. You can find it [here](https://hub.docker.com/editions/community/docker-ce-desktop-mac).

After installing it you should be good to go.
