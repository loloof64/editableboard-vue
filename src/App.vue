<script setup lang="ts">
import { computed, ref } from "vue";
import EditableBoard from "./components/EditableBoardVue.vue";
const board = ref<typeof EditableBoard>();
const reversed = ref<boolean>(false);
const whiteTurn = ref<boolean>(true);
const position = computed(() => {
  if (!board.value) return ""
  return board.value.getBoardCode();
})

function setPieceTo(value: string) {
  if (!board.value) return;
  board.value.setCurrentEditingValue(value);
}
</script>

<template>
  <h2>Editable board test</h2>
  <div class="mainZone">
    <EditableBoard
      :size="300"
      ref="board"
      :reversed="reversed"
      :white-turn="whiteTurn"
    />
    <div class="controls">
      <p>{{ position }}</p>
      <button @click="reversed = !reversed">Reverse</button>
      <button @click="whiteTurn = !whiteTurn">Toggle turn</button>
      <div class="piecesLine">
        <button @click="setPieceTo('')">Empty</button>
      </div>
      <div class="piecesLine">
        <button @click="setPieceTo('P')">P</button>
        <button @click="setPieceTo('N')">N</button>
        <button @click="setPieceTo('B')">B</button>
        <button @click="setPieceTo('R')">R</button>
        <button @click="setPieceTo('Q')">Q</button>
        <button @click="setPieceTo('K')">K</button>
      </div>
      <div class="piecesLine">
        <button @click="setPieceTo('p')">p</button>
        <button @click="setPieceTo('n')">n</button>
        <button @click="setPieceTo('b')">b</button>
        <button @click="setPieceTo('r')">r</button>
        <button @click="setPieceTo('q')">q</button>
        <button @click="setPieceTo('k')">k</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainZone {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.controls {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.controls > button {
  margin: 5px 0;
}

.piecesLine {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.piecesLine > button {
  border: 1px solid black;
}
</style>
