<script setup lang="ts">
import { Mode } from "../types/index";
import { useModeStore } from "../store/index";
import { storeToRefs } from "pinia";

const emit = defineEmits(["addToProject"]);
const { selectedproject } = defineProps(["mode", "selectedproject"]);
const title = ref("");
const description = ref("");
const contact = ref("");
const tags = ref([]);
let heading = ref("");

const modeStore = useModeStore();
const { mode } = storeToRefs(modeStore);

console.log("selected project inside form", selectedproject);

watch(mode, () => {
  switch (mode.value) {
    case Mode.Read: {
      heading.value = `Project ${selectedproject?.title}`;
      break;
    }
    case Mode.Edit: {
      heading.value = `Edit project ${selectedproject?.title}`;
      break;
    }
    case Mode.New: {
      heading.value = "Create new project";
      break;
    }
  }
});

const submit = (e: any) => {
  e.preventDefault();

  switch (mode.value) {
    case Mode.New: {
      emit("addToProject", {
        title: title.value,
        description: description.value,
        contact: contact.value,
        tags: [tags.value],
      });
      break;
    }
    case Mode.Edit: {
      emit("updateProject", {
        title: title.value,
        description: description.value,
        contact: contact.value,
        tags: [tags.value],
      });
      break;
    }
  }

  e.target.reset();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
    <div class="text-gray-700 mb-4">
      <h1 class="tracking-wider text-2xl font-bold">{{ heading }}</h1>
    </div>

    <form class="grid grid-cols-2 gap-4" :onSubmit="submit">
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold text-gray-700"
          for="project-title"
        >
          Title
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-title"
          type="text"
          v-model="title"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-description"
        >
          Description
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-description"
          type="text"
          v-model="description"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-contact"
        >
          Contact
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-contact"
          type="text"
          v-model="contact"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-tags"
        >
          Tags
        </label>
        <div class="relative">
          <select
            class="appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="project-tags"
            name="tags"
            v-model="tags"
          >
            <option disabled value="">Select tags</option>
            <option>React</option>
            <option>Vue</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        :onClick="() => $emit('setEditMode')"
        class="btn bg-blue-800 hover:bg-blue-800 font-bold py-2 px-2 rounded inline-flex"
      >
        <svg
          class="w-6 h-6 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"
          ></path>
        </svg>
        <span>Edit</span>
      </button>
      <div class="col-span-2 flex justify-center items-center mt-4">
        <button class="w-full btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
