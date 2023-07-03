<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import createError from "http-errors";
import { storeToRefs } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import { useModeStore } from "../store/index";
import { Mode, Project } from "../types/index";

let projects = useCollection(collection(useFirestore(), "competence-projects"));

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

let selectedproject = ref<Project>();
const modeStore = useModeStore();
const { getMode } = storeToRefs(modeStore);
const mode = getMode.value;
const { setReadMode, setEditMode, setNewMode, setOverviewMode } = modeStore;

const addToProject = (project: Project) => {
  console.log("project", project);
  if (
    project.title != "" ||
    project.description != "" ||
    project.contact != ""
  ) {
    setDoc(doc(useFirestore(), "competence-projects", project.title), {
      title: project.title,
      description: project.description,
      contact: project.contact,
      tags: project.tags,
    });
  }
  modeStore.setReadMode();
  readProject();
};
const updateProject = (project: Project) => {
  console.log("updating project", project);

  if (
    project.title != "" ||
    project.description != "" ||
    project.contact != ""
  ) {
    updateDoc(doc(useFirestore(), "competence-projects", project.title), {
      title: project.title,
      description: project.description,
      contact: project.contact,
      tags: project.tags,
    });
  }
  setReadMode();
  readProject();
};
const deleteProject = (title: string) => {
  deleteDoc(doc(useFirestore(), "competence-projects", title));
};

const readProject = () => {
  projects = useCollection(collection(useFirestore(), "competence-projects"));
};

const showDialog = (project?: Project) => {
  if (project) {
    selectedproject.value = project;
    setReadMode();
  } else {
    setNewMode();
  }
  const dialog = <HTMLDialogElement>document.getElementById("projectDialog");
  dialog.addEventListener("click", closeDialogIfOutside);
  dialog.addEventListener("cancel", closeDialogIfOutside);
  dialog.showModal();
};

function closeDialogIfOutside(ev: any) {
  if (ev.target.id === "projectDialog") {
    const dialog = <HTMLDialogElement>document.getElementById("projectDialog");
    dialog.removeEventListener("click", closeDialogIfOutside);
    dialog.removeEventListener("cancel", closeDialogIfOutside);
    dialog.close();
    selectedproject.value = undefined;
    setOverviewMode();
  }
}
</script>

<template>
  <div>
    <div>
      <button
        class="w-full btn"
        :onClick="
          () => {
            showDialog();
          }
        "
      >
        Create new project
      </button>
      <button class="w-full btn" :onClick="setOverviewMode">
        Go to overview
      </button>
    </div>

    <Dialog>
      <div v-if="mode != Mode.Overview" id="wrapper">
        <Form
          :selectedproject="selectedproject"
          @addToProject="addToProject"
          @updateProject="updateProject"
          @setEditMode="setEditMode"
        />
      </div>
    </Dialog>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" @setSelectedProject="showDialog" />
      </div>
    </div>
  </div>
</template>
