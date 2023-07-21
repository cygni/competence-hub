<template>
  <div
    class="h-screen dark:bg-copy-black bg-rose-quartz dark:text-rose-quartz text-copy-black"
  >
    <Header />
    <Dialog id="projectDialog">
      <div v-if="mode != Mode.Overview" id="wrapper">
        <Form
          :selectedProject="selectedproject"
          @onProjectChanged="onProjectChanged"
          @closeDialog="close"
        />
      </div>
    </Dialog>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { closeDialog, openDialog } from "~/helper/dialog";
import { useModeStore } from "~/store/index";
import { Mode, Project } from "../types/index";

const modeStore = useModeStore();
const { getMode, getSelectedProject } = storeToRefs(modeStore);
const mode = getMode.value;
const selectedproject = getSelectedProject.value;
const { setReadMode, setNewMode, setOverviewMode, setSelectedProject } =
  modeStore;

const onProjectChanged = () => {
  setReadMode();
  close();
};

const open = (project?: Project) => {
  if (project) {
    setSelectedProject(project);
    setReadMode();
  } else {
    setNewMode();
  }
  openDialog("projectDialog");
};

function close() {
  closeDialog("projectDialog");
  setSelectedProject({ undefined });
  setOverviewMode();
}
</script>
