import { defineStore } from "pinia";
import { Mode } from "../types/index";

export const useModeStore = defineStore("modeStore", () => {
  const mode = ref(Mode.Overview);
  const selectedProject = ref(undefined);

  const getMode = computed(() => mode);
  const getSelectedProject = computed(() => selectedProject);

  function setOverviewMode() {
    this.mode = Mode.Overview;
  }

  function setReadMode() {
    this.mode = Mode.Read;
  }

  function setEditMode() {
    this.mode = Mode.Edit;
  }

  function setNewMode() {
    this.mode = Mode.New;
  }

  function setSelectedProject(project) {
    selectedProject.value = project;
  }

  return {
    mode,
    getMode,
    setOverviewMode,
    setReadMode,
    setEditMode,
    setNewMode,
    setSelectedProject,
    selectedProject,
    getSelectedProject,
  };
});
