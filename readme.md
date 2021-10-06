# GlassesUSA - Design System

This is an adapted version of the [React DSM](https://optimaxdev.github.io/design-system/?path=/story/badge--default) for static HTML sites.

## Documentation 

The full documentation for the system can be found at [https://glassesusa.github.io/dsm-docs/](https://glassesusa.github.io/dsm-docs/)

## Installation

Using the package manager [npm](npmjs.com) to install it.

```bash
npm install @glassesusa/dsm
```
Using a CDN to install it.

```xml
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/styles.css">
 <script type="module" src="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/dsm-effects.js"></script>
```

## Usage
### NPM
#### Styles
```css
@import "@glassesusa/dsm/dist/styles.css";
```
#### Scripts
```jsx
import { loadElements } from '@glassesusa/dsm/dist/dsm-effects'
```
### Magento
Magento automatically deletes scripts so the script needs to be inserted using a script on page load.
```xml
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/styles.css">
 <script>
     var insertScript = document.createElement("script");
     insertScript.src =
         'https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/dsm-effects.js'
     insertScript.type = 'module'
     document.head.appendChild(insertScript)
 </script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)