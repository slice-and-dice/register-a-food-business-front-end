# CSS guidelines and information

## CSS-in-JS using [Emotion](https://emotion.sh)

Follow the [tutorial](https://emotion.sh) to learn the basics.

> **Note:** Emotion CSS-in-JS allows for SCSS-like practices, such as nesting, extensions, etc.

### Styled elements using Emotion

Emotion supports the creation of HTML elements with baked-in styling. This is useful as this project will make regular re-use of element styling for consistency. `src/styles/elements` contains `.js` files that should generally export multiple styled elements to minimise the number of files that components then need to import.

As a naming convention, prefix all styled elements with `Fsa`.

```jsx
// styled-elements-example.js

import styled, { css } from "react-emotion";

export const FsaExampleContainer = styled("div")`
  display: flex;
  background-color: red;
  padding: 1rem;
  text-align: center;
`;

export const FsaAnotherElement = styled("h1")`
  color: blue;
`;
```

```jsx
// App.js

import {
  FsaExampleContainer,
  FsaAnotherElement
} from "./styles/elements/styled-elements-example.js";

class App extends Component {
  render() {
    return (
      <FsaExampleContainer>
        This is a red background box, containing...
        <FsaAnotherElement>...a blue H1 title</FsaAnotherElement>
      </FsaExampleContainer>
    );
  }
}
```

### Using Emotion CSS classes for one-off styling

Emotion also supports basic class names within components. This approach should only be used where a class is to be applied as a one-off. If the class is likely to be applied more than once (within one component or across multiple components), consider whether it would be better to create a styled element and import it.

```jsx
// App.js

import { css } from "react-emotion";

const hotPinkBlock = css`background-color: hotpink;`;

...

<div className={hotPinkBlock}>A hotpink box</div>
```

Combining multiple classes one one element should be done using Emotion's `cx` function:

```jsx
// App.js

import { cx, css } from "react-emotion";

const hotPinkBlock = css`
  background-color: hotpink;
`;

const bigText = css`
  font-size: 3rem;
`;

...

<div className={cx(hotPinkBlock, bigText)}>A hotpink box with big text</div>
```

### Global variables using Emotion

`src/vars.js` exports multiple objects, one example being `primary`. These objects contain one entry per variable, or alternatively nested objects for further categorisation of variables. Each variable is stored as a simple string, and can be anything from a Hex colour code to an animation. These variables are then imported into both the styled elements files and component files wherever they are needed, e.g.

```jsx
// vars.js

export const primary = {
  foodGreen: "#00823b",
  textColor: "black"
};
```

```jsx
// styled-elements-example.js

import styled, { css } from "react-emotion";
import { primary } from "../vars";

export const FsaExampleContainer = styled("div")`
  background-color: ${primary.foodGreen};
  color: ${primary.textColor};
`;
```

### Global styles using Emotion

Treat the `injectGlobal` object in `src/index.js` as a stylesheet that is injected globally. Use this for basics such as fonts and font sizes, etc.

## CSS reset (no action required)

Consistency of basic styling (such as fonts, sizes, default element spacing etc.) is ensured across browsers with the `normalize.css` NPM dependency, imported into `src/index.js`.

## Global CSS styles

These should be stored in the top-level `src/index.scss` file and imported into index.js.

(E.g. `body`, `p`, or a class that will be used across multiple components such as `.container` or `.--bold`).

## Use camelCase for CSS class names

Use `.thisIsAClassName` instead of `.this-is-a-class-name`. This helps keep visual clarity when using BEM.

## Flexbox over floats

Avoid the use of floats. Research `display: flex;` if unfamiliar. [Flexboxfroggy.com](http://flexboxfroggy.com/) is a good resource for learning.

## Only use `rem` and `%` units, avoid `px`, `em` and `pt`

Use `rem` for the majority of size and space measurements. This is beneficial for accessibility purposes, for ease of resizing global styles, and for keeping relative sizing accurate no matter what browser or screen setup is present on a user's device.

Only use `%` where necessary (e.g where something must scale precisely with changes to the window size).

`px` should only be used at the root level for setting a global font size default, and `em` should only be used if you understand the implications it can have for nested elements and if this behaviour is desirable. `pt` should never be used.

## Responsive/mobile CSS

TO-DO

## BEM: 'Block', 'Element' and 'Modifier'

> **Note:** using Emotion means BEM is only relevant for one-off class names.

> **Note:** using BEM means using only classes for CSS selectors (`className={}`), not IDs.

From [getbem.com](http://getbem.com/introduction/):

> Block: A standalone entity that is meaningful on its own. **Examples**: `header`, `container`, `menu`, `checkbox`, `input`

> Element: A part of a block that has no standalone meaning and is semantically tied to its block. **Examples**: `menu item`, `list item`, `checkbox caption`, `header title`

> Modifier: A flag on a block or element. Use them to change appearance or behavior. **Examples**: `disabled`, `highlighted`, `checked`, `fixed`, `size big`, `color yellow`

BEM class names look like this:

`.blockName__elementName--modifierName {}`

### Modifiers can be reused

Modifiers should be kept separate from the block/element part of class names when they are likely to be re-used, e.g.

Example button 1: `.submitButton__text--hover {}`

Example button 2: `.anotherButton__element--hover {}`

If the `--hover` modifier adds the same transformation to both of these buttons, it should be separated and re-used:

`.submitButton__text`

`.anotherButton__element`

`.--buttonHover {}`

### 'Grandchild' elements should be written like 'child' elements

Don't write CSS to reflect grandchild nesting of elements inside blocks. Keep it individual, e.g.

Instead of this:

`.parentName__childName`

`.parentName__childName__grandchildName {}`

Do this:

`.parentName__childName {}`

`.parentName__grandchildName {}`

If the block and element are logically separate, consider describing the element as a new block or organism/molecule/atom type e.g.

`.thisIsLogicallySeparate__fromThis {}`

Should be...

`.thisIsLogicallySeparate {}`

`.fromThis {}`

or...

`.thisIsLogicallySeparate {}`

`.fromThis {}`

## Vendor prefixing isn't needed

E.g. `-webpack` or `-moz`. This is automatically added during the `yarn build` process.

## Put `<script async/>` tags before `<link>` tags in `<head>`

E.g. Google Analytics scripts. When adding these to `<head>` in `index.html`, add above the `<link>` tags to increase page load performance. If the `<script>` tags are lacking the `async` attribute, find out whether adding it is an acceptable practice for the script in question.

---

# SCSS fallback

Creating `.scss` files and importing them into components will still work. However, the current view is that CSS-in-JS should be used across the app.

## SCSS Variables (per component)

Define the variable in the appropriate `.scss` file: `$variableName: blue;`

Use the variable within the same file: `color: $variableName;`

## SCSS Variables (global)

`src/styles/_vars.scss` - this file is prefixed with an underscore to show that it is a 'partial', which prevents it from being compiled as a standalone file.

Webpack is configured to auto-import this file into every SCSS file, so `@import "vars";` is not required.

This makes the variables in `_vars.scss` available globally, but does not take up additional space in the compiled CSS.
