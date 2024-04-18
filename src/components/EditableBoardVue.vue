<template>
  <div class="root" ref="rootElement">
    <!-- lowest layer -->
    <div class="lowest-layer" @click="reactToClick">
      <!-- upper coordinates -->
      <div />
      <template v-for="file in fileIndexes">
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("A".charCodeAt(0) + file) }}
        </p>
        <div v-else />
      </template>
      <div />
      <!-- upper coordinates -->

      <!-- medium lines -->
      <template v-for="rank in rankIndexes">
        <!-- left coordinate -->
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("1".charCodeAt(0) + rank) }}
        </p>
        <div v-else />
        <!-- left coordinate-->

        <!-- cells -->
        <template v-for="file in fileIndexes">
          <div
            class="cell"
            :class="(rank + file) % 2 !== 0 ? 'white' : 'black'"
          >
            <WP
              v-if="isWhitePawnAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <WN
              v-else-if="isWhiteKnightAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <WB
              v-else-if="isWhiteBishopAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <WR
              v-else-if="isWhiteRookAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <WQ
              v-else-if="isWhiteQueenAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <WK
              v-else-if="isWhiteKingAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BP
              v-else-if="isBlackPawnAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BN
              v-else-if="isBlackKnightAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BB
              v-else-if="isBlackBishopAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BR
              v-else-if="isBlackRookAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BQ
              v-else-if="isBlackQueenAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <BK
              v-else-if="isBlackKingAtCell(currentPosition, file, rank)"
              class="no-highlight-cell"
            />
            <div v-else class="no-highlight-cell" />
          </div>
        </template>
        <!-- cells -->

        <!-- right coordinate -->
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("1".charCodeAt(0) + rank) }}
        </p>
        <div v-else />
        <!-- right coordinate-->
      </template>
      <!-- medium lines -->

      <!-- bottom coordinates -->
      <div />
      <template v-for="file in fileIndexes">
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("A".charCodeAt(0) + file) }}
        </p>
        <div v-else />
      </template>
      <div class="player-turn-cell">
        <div
          class="player-turn"
          :class="whiteTurn ? 'white-turn' : 'black-turn'"
        />
      </div>
      <!-- bottom coordinates -->
    </div>
    <!-- lowest layer -->
  </div>
</template>

<script setup lang="ts">
import { Move } from "./types.ts";
import { ref, computed } from "vue";

import BP from "./pieces/BP.vue";
import BN from "./pieces/BN.vue";
import BB from "./pieces/BB.vue";
import BR from "./pieces/BR.vue";
import BQ from "./pieces/BQ.vue";
import BK from "./pieces/BK.vue";
import WP from "./pieces/WP.vue";
import WN from "./pieces/WN.vue";
import WB from "./pieces/WB.vue";
import WR from "./pieces/WR.vue";
import WQ from "./pieces/WQ.vue";
import WK from "./pieces/WK.vue";

import {
  isWhitePawnAtCell,
  isWhiteKnightAtCell,
  isWhiteBishopAtCell,
  isWhiteRookAtCell,
  isWhiteQueenAtCell,
  isWhiteKingAtCell,
  isBlackPawnAtCell,
  isBlackKnightAtCell,
  isBlackBishopAtCell,
  isBlackRookAtCell,
  isBlackQueenAtCell,
  isBlackKingAtCell,
  getPieces,
  getBoardPosition,
} from "./util/PiecesTest.js";

const emit = defineEmits<{
  checkmate: [byWhite: boolean];
  stalemate: [];
  perpetualDraw: [];
  missingMaterialDraw: [];
  fiftyMovesDraw: [];
  waitingManualMove: [];
  moveDone: [
    moveNumber: number,
    whiteTurn: boolean,
    moveSan: string,
    moveFan: string,
    resultingPosition: string,
    move: Move,
    promotion?: string
  ];
}>();
const standardPosition =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const currentValue = ref("X");

const currentPosition = ref(standardPosition);

const props = withDefaults(
  defineProps<{
    size?: number;
    whiteTurn?: boolean;
    reversed?: boolean;
    background?: string;
    coordinatesVisible?: boolean;
    coordinatesColor?: string;
    whiteCellsColor?: string;
    blackCellsColor?: string;
  }>(),
  {
    size: 100,
    whiteTurn: true,
    reversed: false,
    background: "#124589",
    coordinatesVisible: true,
    coordinatesColor: "yellow",
    whiteCellsColor: "navajowhite",
    blackCellsColor: "peru",
  }
);

const cellsSize = computed<number>(() => props.size / 9.0);
const halfCellsSize = computed<number>(() => cellsSize.value * 0.5);

const fontSize = computed<string>(() => `${cellsSize.value * 0.3}px`);

const globalSizePx = computed<string>(() => `${props.size}px`);
const cellsSizePx = computed<string>(() => `${cellsSize.value}px`);
const gridTemplate = computed<string>(
  () =>
    `${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px / ${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px`
);

const rootElement = ref<HTMLElement | undefined>();

const fileIndexes = computed<Array<number>>(() =>
  props.reversed ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7]
);
const rankIndexes = computed<Array<number>>(() =>
  props.reversed ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0]
);

function updateCell(file: number, rank: number) {
  let valuesArray = getPieces(currentPosition.value);
  valuesArray[rank][file] = currentValue.value;
  currentPosition.value = getBoardPosition(valuesArray, props.whiteTurn);
}

function getCell(x: number, y: number, cellsSize: number, reversed: boolean) {
  const cellX = Math.floor((x - cellsSize * 0.5) / cellsSize);
  const cellY = Math.floor((y - cellsSize * 0.5) / cellsSize);

  const file = [true, "true"].includes(reversed) ? 7 - cellX : cellX;
  const rank = [true, "true"].includes(reversed) ? cellY : 7 - cellY;

  return { cellX, cellY, file, rank };
}

function getLocalCoordinates(
  event: MouseEvent,
  rootElement: HTMLElement
): Array<number> {
  if (!rootElement) return [];

  const thisComponentLocation = rootElement.getBoundingClientRect();
  const localX = event.clientX - thisComponentLocation.x;
  const localY = event.clientY - thisComponentLocation.y;

  return [localX, localY];
}

function reactToClick(e: MouseEvent) {
  e.preventDefault();
  if (!rootElement.value) return;

  const [x, y] = getLocalCoordinates(e, rootElement.value);
  const { file, rank } = getCell(x, y, cellsSize.value, props.reversed);

  if (file < 0 || file > 7) return;
  if (rank < 0 || rank > 7) return;

  updateCell(file, rank);
}

function setFromBoardCode(boardFen: string) {
  currentPosition.value = boardFen;
}

function setCurrentEditingValue(value: string) {
  currentValue.value = value.charAt(0);
}

function getBoardCode(): string {
  return currentPosition.value.split(" ")[0];
}

defineExpose({
  getBoardCode,
  setCurrentEditingValue,
  setFromBoardCode,
});
</script>

<style scoped>
.root {
  position: relative;
  display: inline-block;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
  background-color: v-bind(background);
}

.lowest-layer {
  position: absolute;
  display: grid;
  left: 0;
  top: 0;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
  grid-template: v-bind(gridTemplate);
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell.white {
  background-color: v-bind(whiteCellsColor);
}

.cell.black {
  background-color: v-bind(blackCellsColor);
}

.coordinate {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(coordinatesColor);
}

.player-turn-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
}

.player-turn {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.white-turn {
  background-color: white;
}

.black-turn {
  background-color: black;
}

.no-highlight-cell {
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}
</style>
