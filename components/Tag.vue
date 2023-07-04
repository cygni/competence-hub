<template>
  <div
    class="text-white p-2 mr-2 mb-2 rounded-xl inline-flex transition max-w-20 group"
    :style="{ 'background-color': randomBackground(tag) }"
  >
    <div :id="'tag-' + tag">
      {{ tag.value ? tag.value : tag }}
    </div>
    <div
      v-if="edit"
      class="cursor-pointer transition duration-350 max-w-0 opacity-0 group-hover:max-w-full group-hover:opacity-100"
      @click="$emit('removeTag', tag)"
    >
      <img src="assets/images/close-white.svg" alt="delete" width="25" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TechTag } from "../types";
defineProps<{ tag: TechTag; edit?: boolean }>();

/* Cygni brand colors */
const fullstackColors = ["#000735", "#440B45"];
const backendColors = ["#00b3b0", "#00966d"];
const frontendColors = ["#eab8b2", "#DD5928"];
const colors = [
  "#000735",
  "#eab8b2",
  "#231F20",
  "#440B45",
  "#DD5928",
  "#0f4c81",
  "#00b3b0",
  "#00966d",
  "#f9e79f",
];
const randomBackground = (tag: TechTag) => {
  if (!tag.aspect) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  switch (tag.aspect) {
    case "backend": {
      const randomIndex = Math.floor(Math.random() * backendColors.length);
      return backendColors[randomIndex];
    }
    case "frontend": {
      const randomIndex = Math.floor(Math.random() * frontendColors.length);
      return frontendColors[randomIndex];
    }
    case "fullstack": {
      const randomIndex = Math.floor(Math.random() * fullstackColors.length);
      return fullstackColors[randomIndex];
    }
  }
};
</script>
