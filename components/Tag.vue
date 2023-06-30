<template>
  <span
    :id="'tag-' + tag"
    class="text-white p-2 mr-2 rounded-xl"
    :style="{ 'background-color': randomBackground() }"
  >
    {{ tag }}
  </span>
</template>
<script setup lang="ts">
defineProps<{ tag: string }>();
/* Cygni brand colors */
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
const randomBackground = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
</script>
