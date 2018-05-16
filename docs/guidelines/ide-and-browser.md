# IDE and browser setup guidelines

## IDE

* Use [Visual Studio Code](https://code.visualstudio.com/)
* Install and read about the following extensions:
  * [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) - pause and debug web apps from VS Code
  * [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - automatic code formatting
* Configuration:

  * Make Prettier run on every 'Save' by adding this line to your VS Code preferences file:

    `"editor.formatOnSave": true`

  * Enable `tab` for HTML autocompletion in JSX files by adding these lines to your VS Code preferences file:
    ```
    "emmet.triggerExpansionOnTab": true,
    "emmet.syntaxProfiles": {
      "javascript": "jsx",
      "xml": {
        "attr_quotes": "single"
      }
    }
    ```

## Browser

* Use [Chrome](https://www.google.co.uk/chrome/)
* Install and read about the following extensions:
  * [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - view props, state, React DOM in Chrome dev tools
