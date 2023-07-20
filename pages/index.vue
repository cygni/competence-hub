<script setup lang="ts">
import { collection } from "firebase/firestore";
import createError from "http-errors";
import { storeToRefs } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import { openDialog } from "~/helper/dialog";
import { useModeStore } from "../store/index";
import { Project } from "../types/index";

let projects = useCollection(collection(useFirestore(), "competence-projects"));

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

const modeStore = useModeStore();
const { setReadMode, setNewMode, setSelectedProject } = modeStore;

const open = (project?: Project) => {
  if (project) {
    setSelectedProject(project);
    setReadMode();
  } else {
    setNewMode();
  }
  openDialog("projectDialog");
};
</script>

<template>
  <div>
    <h2 class="text-3xl mb-6">All projects</h2>
    <div class="flex flex-wrap flex-row">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @setSelectedProject="open"
      />
    </div>
  </div>
</template>
