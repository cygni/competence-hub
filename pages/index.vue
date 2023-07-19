<script setup lang="ts">
import { collection } from "firebase/firestore";
import createError from "http-errors";
import { storeToRefs } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import { closeDialog, openDialog } from "~/helper/dialog";
import { useModeStore } from "../store/index";
import { Mode, Project } from "../types/index";

let projects = useCollection(collection(useFirestore(), "competence-projects"));

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

const selectedproject = ref<Project | undefined>();
const modeStore = useModeStore();
const { getMode } = storeToRefs(modeStore);
const mode = getMode.value;
const { setReadMode, setNewMode, setOverviewMode } = modeStore;

const onProjectChanged = () => {
  setReadMode();
  close();
};

const open = (project?: Project) => {
  if (project) {
    selectedproject.value = project;
    setReadMode();
  } else {
    setNewMode();
  }
  openDialog("projectDialog");
};

function close() {
  closeDialog("projectDialog");
  selectedproject.value = undefined;
  setOverviewMode();
}
</script>

<template>
  <div>
    <Dialog id="projectDialog">
      <div v-if="mode != Mode.Overview" id="wrapper">
        <Form
          :selected-project="selectedproject"
          @onProjectChanged="onProjectChanged"
          @closeDialog="close"
        />
      </div>
    </Dialog>
    <h2 class="text-3xl mb-6">All projects</h2>
    <div class="flex flex-row">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @setSelectedProject="open"
      />
    </div>
  </div>
</template>
