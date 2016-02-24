# A-Frame-React-Transform-Boilerplate

## React Transform Boilerplate
**:hotsprings: Hot-swap A-Frame React components in place without browser refresh :bangbang:**

see [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)

### Like this, but in VR!

![react-transform-boilerplate](https://cloud.githubusercontent.com/assets/1539088/11611771/ae1a6bd8-9bac-11e5-9206-42447e0fe064.gif)

## Installation

```bash
git clone https://github.com/meta-meta/aframe-react-transform-boilerplate.git
cd aframe-react-transform-boilerplate
npm install
npm start
open http://localhost:8080
```

:iphone: Point your device's browser to your local IP, assuming you are on the same LAN. (See console output for IP address)

## A-Frame
[A-Frame Project Page](https://aframe.io/)

[A-Frame Docs](https://aframe.io/docs/guide/)

[Awesome A-Frame](https://github.com/aframevr/awesome-aframe)

[A-Frame source](https://github.com/aframevr/aframe)

[aframe-react](https://github.com/ngokevin/aframe-react)


### Registering Third-party A-Frame components

With Webpack's ES6 module syntax:

```
import {registerComponent} from 'aframe-core';
import exampleComponent from 'aframe-example-component';
registerComponent('example', exampleComponent.component);
```

## :globe_with_meridians: Publishing to GitHub Pages

Update package.json with the url for your repo:

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/my-github-username/my-repo.git"
  },
```

Run:

```bash
npm run ghpages
```
