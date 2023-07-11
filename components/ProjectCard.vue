<template>
  <div
    class="card transition hover:bg-slate-100 cursor-pointer overflow-hidden"
    :onClick="() => $emit('setSelectedProject', project)"
  >
    <h1 class="text-xl font-bold pb-4">{{ project.title }}</h1>
    <h3 class="text-l truncate">{{ project.purpose }}</h3>
    <h4 class="text-md truncate pb-3">{{ project.description }}</h4>
    <a
      :href="`mailto:${project.contact}`"
      class="font-medium dark:text-rose-quartz text-classic-blue hover:underline"
      >{{ project.contact }}</a
    >
    <div class="flex flex-row flex-wrap py-4 mt-auto">
      <Tag v-for="tag in project.tags" :tag="tag" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { project } = defineProps(["project"]);
</script>
