# Editable board component

A chess position editor component for Vue JS (>= 3), written in Typescript.

## Usage

1. With your package manager, add the 'editableboard-vue' package (e.g `bun add editableboard-vue`)
2. In you main.js add the following content :

```js
import EditableBoardVueComponent from "editableboard-vue";
import "editableboard-vue/dist/style.css";
```

3. Don't forget to use the component (in the same file), e.g :

```js
createApp(App)
  .use(EditableBoardVueComponent) //add this line
  .use(pinia)
  .use(router);
```

4. You can use the EditableBoardVue component from any template in your project. E.g :

```html
<EditableBoardVue
  :size="500"
  ref="board"
  :reversed="reversed"
  :white-turn="whiteTurn"
/>
```

## Documentation

### Attributes

| Name               | Purpose                                                                                                                  | Type    | Default     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------- | ----------- |
| size               | Defines the common width and height of the board, in pixels.                                                             | number  | 100         |
| whiteTurn           | Says if the turn indicator at bottom of the board shows  a white turn.                                                                        | boolean | false       |
| reversed           | Says if the black side is at bottom of the board.                                                                        | boolean | false       |
| background         | Defines the overall background color of the board.                                                                       | string  | #124589     |
| coordinatesVisible | Says if the coordinates (around the cells) are visible.                                                                  | boolean | true        |
| coordinatesColor   | Defines the text color of the coordinates.                                                                               | string  | yellow      |
| whiteCellsColor    | Defines the color of the white cells.                                                                                    | string  | navajowhite |
| blackCellsColor    | Defines the color of the black cells.                                                                                    | string  | peru        |

### Methods

#### getBoardCode

Get the board position [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) : only returns the first part of the specification, the part related to the board.

This method does not take any parameter and does not return anything.

#### setCurrentEditingValue

Sets the current editing piece value, in [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). For example : give 'K' for setting white king as the editing value. Also, if you want to define the erase value, simply pass an empty string.
The first value, before any call to this method, is the erase value ('').

| Field name |             Purpose                    |   Type | Default     |
|------------|:--------------------------------------:|-------:|-------------|
| value      | Defines the current editing piece FEN. | string | Not defined |

This method does not return anything.

#### setFromBoardCode

Sets the position of the board, in [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation), though only the first part of the string will be taken into account (not even the player type, as you have the property `whiteTurn` for that purpose).
The first value, before any call to this method or any editing from the user, is the standard position of chess.

| Field name    |             Purpose                           |   Type | Default     |
|---------------|:---------------------------------------------:|-------:|-------------|
| boardFen      | Defines the current position in FEN notation. | string | Not defined |

This method does return anything.

## For developers

### Building

1. Install dependencies : e.g with bun `bun install`
2. Build : e.g with bun `bun run vue-tsc && bun run vite build`

## Credits

Pieces vectors definitions from CBurnett and found on [Wikimedia commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).
