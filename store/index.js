import { defineStore } from "pinia";
import { Mode } from "../types/index";

// export const useModeStore = defineStore("modeStore", {
//   // const mode = ref(Mode.Overview);
//   state: () => {
//     return { mode: Mode.Overview };
//   },
//   actions: {
//     setOverviewMode() {
//       console.log("overview mode activated");

//       this.mode = Mode.Overview;
//     },
//     setReadMode() {
//       console.log("read mode activated");

//       this.mode = Mode.Read;
//     },
//     setEditMode() {
//       console.log("edit mode activated");

//       this.mode = Mode.Edit;
//     },
//     setNewMode() {
//       console.log("new mode activated");

//       this.mode = Mode.New;
//     },
//   },
// });

export const useModeStore = defineStore("modeStore", () => {
  const mode = ref(Mode.Overview);

  const getMode = computed(() => mode);

  function setOverviewMode() {
    console.log("overview mode activated");

    this.mode = Mode.Overview;
  }

  function setReadMode() {
    console.log("read mode activated");

    this.mode = Mode.Read;
  }
  function setEditMode() {
    console.log("edit mode activated");

    this.mode = Mode.Edit;
  }
  function setNewMode() {
    console.log("new mode activated");

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
