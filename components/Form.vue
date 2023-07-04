<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModeStore } from "../store/index";
import { Mode, Project } from "../types/index";

const emit = defineEmits(["addToProject", "updateProject", "setEditMode"]);
const { selectedproject } = defineProps<{ selectedproject: Project }>();
const modeStore = useModeStore();
const { mode } = storeToRefs(modeStore);

const title = ref(selectedproject?.title);
const description = ref(selectedproject?.description);
const contact = ref(selectedproject?.contact);
const tags = ref(selectedproject?.tags);
let heading = ref("");
let isInputDisabled = ref(
  mode.value === Mode.Edit || mode.value === Mode.New ? false : true
);

if (mode.value === Mode.Read) {
  title.value = selectedproject.title;
  description.value = selectedproject.description;
  contact.value = selectedproject.contact;
  tags.value = selectedproject.tags;
}

watchEffect(() => {
  switch (mode.value) {
    case Mode.Overview: {
      heading.value = `Project ${selectedproject?.title}`;
      isInputDisabled = true;
      break;
    }
    case Mode.Read: {
      heading.value = `Project ${selectedproject?.title}`;
      isInputDisabled = true;
      break;
    }
    case Mode.Edit: {
      heading.value = `Edit project ${selectedproject?.title}`;
      isInputDisabled = false;
      break;
    }
    case Mode.New: {
      heading.value = "Create new project";
      isInputDisabled = false;
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
        tags: tags.value,
      });
      break;
    }
    case Mode.Edit: {
      emit("updateProject", {
        title: title.value,
        description: description.value,
        contact: contact.value,
        tags: tags.value,
      });
      break;
    }
  }

  e.target.reset();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
    <div class="text-gray-700 mb-4 flex justify-between">
      <h1 class="tracking-wider text-2xl font-bold">{{ heading }}</h1>

      <button
        v-if="mode === Mode.Read"
        :onClick="() => $emit('setEditMode')"
        type="button"
        class="btn bg-blue-800 hover:bg-blue-800 font-bold py-2 px-2 rounded inline-flex"
      >
        <svg
          class="w-5 h-5 mr-2"
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
          :disabled="isInputDisabled"
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
          :disabled="isInputDisabled"
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
          :disabled="isInputDisabled"
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
            :disabled="isInputDisabled"
          >
            <option v-for="option in tags" :key="tag" :value="tag">
              {{ tag }}
            </option>
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

      <div class="col-span-2 flex justify-center items-center mt-4">
        <button class="w-full btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
