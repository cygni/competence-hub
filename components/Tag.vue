<template>
  <div
    class="text-white p-2 mr-2 mb-2 rounded-xl inline-flex transition max-w-20 group"
    :style="randomBackground(tag)"
  >
    <div :id="'tag-' + tag">
      {{ tag.value ? tag.value : tag }}
    </div>
    <div
      v-if="edit"
      :onClick="() => $emit('deleteTag', tag)"
      class="cursor-pointer transition-width ease-in-out max-w-0 group-hover:max-w-full"
    >
      <img src="../assets/images/close-white.svg" alt="delete" width="25" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TechTag } from "../types";
defineProps<{ tag: TechTag; edit?: boolean }>();
defineEmits(["deleteTag"]);

/* Cygni brand colors */
const fullstackColors = ["#0f4c81", "#440B45"];
const backendColors = ["#00b3b0", "#00966d"];
const frontendColors = ["#eab8b2", "#DD5928"];
const embeddedColors = ["#f9e79f", "#e3d9d7"];

const randomBackground = (tag: TechTag) => {
  switch (tag.aspect) {
    case "backend": {
      const randomIndex = Math.floor(Math.random() * backendColors.length);
      return {
        "background-color": backendColors[randomIndex],
      };
    }
    case "frontend": {
      const randomIndex = Math.floor(Math.random() * frontendColors.length);
      return {
        "background-color": frontendColors[randomIndex],
      };
    }
    case "fullstack": {
      const randomIndex = Math.floor(Math.random() * fullstackColors.length);
      return {
        "background-color": fullstackColors[randomIndex],
      };
    }
    case "embedded": {
      const randomIndex = Math.floor(Math.random() * fullstackColors.length);
      return {
        "background-color": embeddedColors[randomIndex],
        color: "#000735",
      };
    }
    default:
      const allColors = [
        fullstackColors,
        backendColors,
        frontendColors,
        embeddedColors,
      ].flat();
      const randomIndex = Math.floor(Math.random() * allColors.length);
      return {
        "background-color": allColors[randomIndex],
      };
  }
};
</script>
