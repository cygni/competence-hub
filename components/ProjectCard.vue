<template>
  <div
    class="card transition hover:bg-slate-100 cursor-pointer"
    :onClick="() => $emit('setSelectedProject', project)"
  >
    <h1 class="font-bold pb-4">{{ project.title }}</h1>
    <p class="truncate">{{ project.description }}</p>
    <p>{{ project.contact }}</p>
    <div class="py-4 mt-auto">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="bg-[#000735] text-white p-2 mr-2 rounded-xl"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { project } = defineProps(["project"]);
</script>
