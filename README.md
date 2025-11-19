# About the project

### Description of the project

This is a an HTML5 platformer prototype built while following [Jed Hastwell's](https://www.udemy.com/user/jedhastwell/) [tutorial](hhttps://www.udemy.com/course/html5-game-development-2d-platform-game-fundamentals/).

---

### Click here for the [video demo](https://youtu.be/LoEi776Z7BA)

### Click here for the [in-browser playable demo](https://hero-phaser-game.web.app/)

Play it in the browser by visiting the [game's site](https://hero-phaser-game.web.app/)

---

# Screen shot of the application

|             Start Screen             |             Game Screen             |
| :----------------------------------: | :---------------------------------: |
| ![](/screenshots/1_start_screen.png) | ![](/screenshots/2_game_screen.png) |

---

### Technology stack

1. node: 12.14.1
2. phaser": 3.24.1

---

### How to run the code using NPM:

The app is deployed on Firebase. Here is the [in-browser playable demo](https://hero-phaser-game.web.app/). Web address is: `https://hero-phaser-game.web.app/`

### 2: Install packages

After cloning this repository, run `npm install` or `nvm exec npm install` if you have the node virtual machine installed

### 3: Run project

Run `npm start` assuming the correct node version or `nvm exec npm start` to use the Node Virtual Machine which will run node 12.14.1 automatically based on the .nvmrc file specified in root of the project folder.

### 4: Open it

Open up your browser at `http://localhost:8080/`

### 5: Deploy it to Firebase

Run `npm run deploy` or `nvm exec npm run deploy` if you have the node virtual machine installed

---

### How to build and package for Itch.io (HTML5)

1. **Install dependencies**

   - `npm install` (or `nvm exec npm install`)

2. **Production build**

   - `npm run build`
   - Outputs to the `dist/` folder: `index.html`, `vendor.js`, `app.js`, and `assets/`.

3. **Test locally (served, not file://)**

   - From the `dist` folder: `python3 -m http.server 8000`
   - Open `http://localhost:8000` and verify the game loads without console errors.

4. **Create the upload ZIP**

   - Important: Put the files at the ROOT of the ZIP (no extra top-level folder).
   - Example:
     - `cd dist`
     - `zip -r ../hero-phaser-itch.zip *`

5. **Upload to Itch.io**
   - Create a new project → Kind of project: `HTML`.
   - Upload `hero-phaser-itch.zip`.
   - Enable: “This file will be played in the browser”.
   - Viewport/Scaling: “This is a responsive web page”.
   - Save & view.

Notes:

- Asset paths are relative (`assets/...`) so the game works under Itch.io’s subpath.
- If the local test only works via `http://` but not by double-clicking `index.html`, that’s expected due to browser CORS on `file://`.
- Consider compressing large audio files if page load is slow.

---

### Acknowledgements

Thank you to [Jed Hastwell](https://www.udemy.com/user/jedhastwell/) for a good [tutorial](https://www.udemy.com/course/html5-game-development-2d-platform-game-fundamentals/). The tutorial was a good intro to Phaser. It was also detailed in showing learners where to find free game assets, how to modify assets for use using free tools and how to create levels. Jed explained everything very well and clearly. The only problem was that the topics were not broad enough to give learners an idea of what a complete game system in Phaser could look like. It did not have to cover everything but could have had sections on enemies/obstacles, health etc. The hardest part of learning to build any software system is learning how to compose various components/systems together.The tutorial was still worth it because it was only about 4.5 hours long, which makes for a good intro to Phaser. Rated 3.5 out of 5 starts from me.

Phaser game development [starter code / boilerplate](https://github.com/jedhastwell/phaser3-es6-webpack-boilerplate) created and provided by Jed Hastwell.

Pixel [Platformer Pack](https://finalbossblues.itch.io/pixel-platformer-pack) including player sprite sheet and level tilesets created and provided by [finalbossblues](https://finalbossblues.itch.io/) for free

Clouds [sprite sheets](https://opengameart.org/content/2d-clouds) created and provided by [kitart360](https://opengameart.org/users/kitart360) under a Creative Commons license.

Background [music](https://www.tribeofnoise.com/music/show/83034) created and provided by [Luno](https://www.tribeofnoise.com/luno) under Creative Commons license (CC 4.0 BY-SHARE ALIKE)

<br/>
<br/>

---

### License

The codebase is MIT licensed unless otherwise specified. Feel free to fork or download this code and use as specified in the license.

#

To be modified further by Kgotso Koete
<br/>
October 2022
