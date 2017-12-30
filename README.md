# phosphor-standalone
A standalone, browser compatible build of PhosphorJS. 

[![Build Status](https://travis-ci.org/LukeSheard/phosphor-standalone.svg?branch=master)](https://travis-ci.org/LukeSheard/phosphor-standalone)

## Usage

Just load the bundle into the browser. It can then be used in conjunction with [Phosphor Custom Elements](//github.com/LukeSheard/phosphor-webcomponents) to display custom views. 

```html
<html>
  ...
  <body>
    ...
    <script src="node_modules/@lukesheard/phosphor-standalone/dist/phosphor.js"></script>
    <script>
      const {
        Widget, 
        DockPanel
      } = window.phosphor
    </script>
  </body>
</html>
```

