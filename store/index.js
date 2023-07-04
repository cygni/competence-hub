import { defineStore } from "pinia";
import { Mode } from "../types/index";

export const useModeStore = defineStore("modeStore", () => {
  const mode = ref(Mode.Overview);

  const getMode = computed(() => mode);

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

  return {
    mode,
    getMode,
    setOverviewMode,
    setReadMode,
    setEditMode,
    setNewMode,
  };
});
