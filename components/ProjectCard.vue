<template>
  <div
    class="card transition hover:bg-slate-100 cursor-pointer overflow-hidden"
    :onClick="() => $emit('setSelectedProject', project)"
  >
    <h1 class="text-xl font-bold pb-4">{{ project.title }}</h1>
    <p class="truncate">{{ project.description }}</p>
    <p>{{ project.contact }}</p>
    <div class="flex flex-row flex-wrap py-4 mt-auto">
      <Tag v-for="tag in project.tags" :tag="tag" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { project } = defineProps(["project"]);
</script>
