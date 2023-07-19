<template>
  <dialog
    :id="id"
    class="min-w-[33%] p-0 shadow-md rounded-lg focus:outline-none focus:border-transparent active:border-transparent"
  >
    <slot></slot>
  </dialog>
</template>
<style scoped>
dialog[open] {
  animation: fadeIn 250ms ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    filter: blur(0.1rem);
  }
  to {
    opacity: 1;
    filter: blur(0rem);
  }
}
</style>

<script setup lang="ts">
const { id } = defineProps(["id"]);
</script>
