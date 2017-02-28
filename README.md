## Tetris

### Background

Tetris is a a browser version of the classic tile-matching, puzzle video game, built using vanilla Javascript and HTML5 Canvas.  The objective of the game is to score points by eliminating horizontal lines of tetromino blocks from the board. A player eliminates a line of blocks from the screen by placing blocks such that the entire line is filled. The game ends when a block reaches the top of the board.

### Functionality & MVP  

In Tetris, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Rotate and move blocks to control placement
- [ ] Encounter blocks that fall with increasing speed as the game continues
- [ ] Enter a high-score and restart the game after losing

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, and Reset buttons, two rotate buttons, two buttons for moving left and right, and a button to drop the block immediately.

![wireframes](https://github.com/lceames/Tetris/docs/tetris_wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be a few other scripts involved in this project:

.js files for each of the seven blocks that appear in the game.

`board.js`: this script will handle the logic for rendering static blocks, as well as periodically re-rendering the falling block. It will also keep track of the height of fallen blocks to trigger the end of the game, as well as the state of each static line, to trigger line eliminations.

'cell.js': this lightweight script will simply determine whether it is an open cell or occupied by a block

`game.js`: this script will keep track starting and ending the game, points, and block speed, and next block.

### Implementation Timeline

**Phase 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file, scripts for each block, and the bare bones of 3 scripts outlined above.   

- Get a green bundle with `webpack`
- Scripts that render each block.

**Phase 2**: Render falling blocks in the Board with user control for movement and rotation.

- Flesh out board.rb to make grid of correct size
- Set interval to effectively render a falling block
- Add left, right, rotate left, rotate right controls
- Add callback that renders when a line or lines have been eliminated

**Phase 3**: Create the game logic. Incorporate the game logic into the `Board.js` rendering.  

- Create 2-block queue that is repopulated when a new block is given to the board
- Loop until board's game over callback is triggered
- Update score every time board take a new piece
