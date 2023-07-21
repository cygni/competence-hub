<template>
  <div
    class="rounded md:max-w-[21%] max-w-[50%] md:basis-1/5 basis-1/2 shadow-lg bg-white p-4 mr-4 mt-4 card transition hover:bg-slate-100 cursor-pointer"
    :onClick="(event : Event) => handleClick(event, project)"
  >
    <h1 class="mb-4">
      <a
        class="text-xl font-bold dark:text-rose-quartz text-classic-blue hover:underline"
        id="project-title"
        >{{ project.title }}</a
      >
    </h1>
    <h3 class="text-l line-clamp-2 mb-2">{{ project.purpose }}</h3>
    <h4 class="text-l line-clamp-3 mb-4">{{ project.description }}</h4>
    <p class="text-sm dark:text-rose-quartz">
      If you are interested contact:
      <a
        :href="`mailto:${project.contact}`"
        class="text-md dark:text-rose-quartz text-classic-blue hover:underline"
        >{{ project.contact }}</a
      >
    </p>
    <div class="flex flex-row flex-wrap py-4 mt-auto">
      <Tag v-for="tag in project.tags" :tag="tag" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Project } from "../types/index";

const { project } = defineProps(["project"]);

const emit = defineEmits(["setSelectedProject"]);

const handleClick = (event: Event, project: Project) => {
  if (event.target != null && event.target.id === "project-title") {
    window.open(project.link, "_blank");
    event.preventDefault();
  } else {
    emit("setSelectedProject", project);
  }
};
</script>
