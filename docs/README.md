## Docs README

## Runner
#### Background
This game was inspired by bit trip runner. It's an infinite running game with obstacles along the way

#### Functionality & MVP

With this Conway's Game of Life simulator, users will be able to:

 -  Start, pause, and reset the game board
 -  Choose level of difficulty
 -  keeps track of highest score
 -  An About modal describing the background and rules of the game
 -  A production README

#### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the About modal. Game controls will include Start, Stop, and Reset

![Wireframe][pic]

#### Architecture and Technologies
- Vanilla Javascript for game logic and jQuery for button inputs
- HTML5 Canvas for rendering and graphics
- Webpack to bundle and serve scripts

The following scripts will be needed:

player.js to keep track of all movement, obstacles and collision
game.js handles rendering of the main page

#### Timeline
- day 1 - setup html and css and get player to render
- day 2 - implement obstacles
- day 3 - implement levels

[pic]: ./wireframe/wireframe.png
