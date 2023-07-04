<template>
  <span
    :id="'tag-' + tag"
    class="text-white p-2 mr-2 mb-2 rounded-xl"
    :style="{ 'background-color': randomBackground(tag) }"
  >
    {{ tag.value ? tag.value : tag }}
  </span>
</template>
<script setup lang="ts">
import { TechTag } from "../types";

defineProps<{ tag: TechTag }>();
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
const randomBackground = (tag) => {
  if (tag.aspect) {
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
  } else {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
};
</script>
