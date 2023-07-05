<template>
  <div
    class="text-white p-2 mr-2 mb-2 rounded-xl inline-flex duration-600 transition-all hover:scale-x-105 group"
    :style="randomBackground(tag)"
  >
    <div :id="'tag-' + tag">
      {{ tag.value ? tag.value : tag }}
    </div>
    <div
      v-if="edit"
      :onClick="() => showConfirmDialog(tag)"
      class="cursor-pointer transition-width ease-in-out max-w-0 group-hover:max-w-full"
    >
      <img src="assets/images/close-white.svg" alt="delete" width="25" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TechTag } from "../types";

defineProps<{ tag: TechTag; edit?: boolean }>();
const emit = defineEmits(["setSelectedTag"]);

/* Cygni brand colors */
const fullstackColors = ["#000735", "#440B45"];
const backendColors = ["#00b3b0", "#00966d"];
const frontendColors = ["#eab8b2", "#DD5928"];
const embeddedColors = ["#f9e79f", "#e3d9d7"];
const colors = [
  "#000735",
  "#eab8b2",
  "#231F20",
  "#440B45",
  "#DD5928",
  "#0f4c81",
  "#00b3b0",
  "#00966d",
  "#f9e79f",
];
const randomBackground = (tag: TechTag) => {
  if (!tag.aspect) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return {
      "background-color": colors[randomIndex],
    };
  }

  switch (tag.aspect) {
    case "backend": {
      const randomIndex = Math.floor(Math.random() * backendColors.length);
      return {
        "background-color": backendColors[randomIndex],
      };
    }
    case "frontend": {
      const randomIndex = Math.floor(Math.random() * frontendColors.length);
      return {
        "background-color": frontendColors[randomIndex],
      };
    }
    case "fullstack": {
      const randomIndex = Math.floor(Math.random() * fullstackColors.length);
      return {
        "background-color": fullstackColors[randomIndex],
      };
    }
    case "embedded": {
      const randomIndex = Math.floor(Math.random() * fullstackColors.length);
      return {
        "background-color": embeddedColors[randomIndex],
        color: "#000735",
      };
    }
  }
};

const showConfirmDialog = (tag: TechTag) => {
  console.log("lalala");
  console.log("show confirm dialog set selected tag", tag);
  emit("setSelectedTag", tag);

  const dialog = <HTMLDialogElement>document.getElementById("confirmDialog");
  dialog.addEventListener("click", closeDialogIfOutside);
  dialog.addEventListener("cancel", closeDialogIfOutside);
  dialog.showModal();
};

const closeDialogIfOutside = (ev: any) => {
  if (ev.target.id === "confirmDialog") {
    closeDialog();
  }
};
</script>
