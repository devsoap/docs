# docs.devsoap.com

This repository contains the content of https://docs.devsoap.com.

## Development

To install the required dependencies:
```
sudo apt install ruby-bundler ruby-dev
bundle install --path .vendor/bundle
```

To run the site:
```
rm _site -rf; bundle exec jekyll serve --incremental
```

Enable the GIT hooks:
```
git config core.hooksPath hooks
```


## Content

### Adding a main menu

```
my_new_menu:
    output: true
    title: Menu Title
```

Then add a same named folder into **docs** with a '_' prefix.

The articales for that menu is then added to that folder.

Example:
```
_vaadin_flow_gradle_plugin/
├── index.md
└── introduction.md

0 directories, 2 files
```

The index.md content will be displayed when the menu is selected.


### Content articles

All content is written in Markdown and converted to HTML by Jekyll.

All articles should start with the following content:

```
---
layout: default
title: Title of article
modified: <generated by the git hook>
---

# {{ page.title }}
```

That will make the article use the default layer as well as the main title will be displayed in the navigation menu.
