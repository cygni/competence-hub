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

const selectedproject = ref<Project>();
const modeStore = useModeStore();
const { getMode } = storeToRefs(modeStore);
const mode = getMode.value;
const { setReadMode, setEditMode, setNewMode, setOverviewMode } = modeStore;

const addToProject = (p: Project, mode: string) => {
  if (isProjectFormValid(p)) {
    const body = {
      id: p.id ?? crypto.randomUUID(),
      title: p.title,
      description: p.description,
      contact: p.contact,
      tags: p.tags,
      comment: p.comment,
      link: p.link,
    };
    new Promise((resolve, reject) => {
      mode === Mode.New
        ? setDoc(doc(useFirestore(), "competence-projects", body.id), body)
        : updateDoc(doc(useFirestore(), "competence-projects", body.id), body);
      resolve(null);
    }).then(() => {
      setReadMode();
      closeDialog();
    });
  }
};

const isProjectFormValid = (p: Project) => {
  return (
    p.title != "" ||
    p.description != "" ||
    p.contact != "" ||
    p.comment != "" ||
    p.link != "" ||
    p.tags.length !== 0
  );
};

const deleteProject = (title: string) => {
  deleteDoc(doc(useFirestore(), "competence-projects", title));
  closeDialog();
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
  if (ev.target.id === "projectDialog") closeDialog();
}

function closeDialog() {
  const dialog = <HTMLDialogElement>document.getElementById("projectDialog");
  dialog.removeEventListener("click", closeDialogIfOutside);
  dialog.removeEventListener("cancel", closeDialogIfOutside);
  dialog.close();
  selectedproject.value = undefined;
  setOverviewMode();
}
</script>

<template>
  <div>
    <div class="flex justify-center items-center mb-8">
      <button
        class="btn mr-4"
        :onClick="
          () => {
            showDialog();
          }
        "
      >
        Create new project
      </button>
      <button class="btn" :onClick="setOverviewMode">Go to overview</button>
    </div>

    <Dialog id="projectDialog">
      <div v-if="mode != Mode.Overview" id="wrapper">
        <Form
          :selectedproject="selectedproject"
          @addToProject="addToProject"
          @deleteProject="deleteProject"
          @setEditMode="setEditMode"
          @closeDialog="closeDialog"
        />
      </div>
    </Dialog>

    <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @setSelectedProject="showDialog"
      />
    </div>
  </div>
</template>
