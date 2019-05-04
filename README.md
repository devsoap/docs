# docs.devsoap.com

This repository contains the content of https://docs.devsoap.com.


## Development

To run the site:

```
bundle exec jekyll serve --incremental
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