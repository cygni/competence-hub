<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModeStore } from "../store/index";
import { Mode, Project } from "../types/index";

const emit = defineEmits([
  "addToProject",
  "updateProject",
  "deleteProject",
  "setEditMode",
]);
const { selectedproject } = defineProps<{ selectedproject: Project }>();
const modeStore = useModeStore();
const { mode } = storeToRefs(modeStore);

const title = ref("");
const description = ref("");
const contact = ref("");
const tags = ref([]);
let heading = ref("");
let isInputDisabled = ref(
  mode.value === Mode.Edit || mode.value === Mode.New ? false : true
);

if (mode.value === Mode.Read) {
  console.log("FILL INPUT FIELDS");
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
  const emitMode = mode.value === Mode.New ? "addToProject" : "updateProject";
  emit(emitMode, {
    title: title.value,
    description: description.value,
    contact: contact.value,
    tags: tags.value,
  });
  e.target.reset();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
    <div class="text-gray-700 mb-4 flex justify-between">
      <h1 class="tracking-wider text-2xl font-bold">{{ heading }}</h1>
      <div class="flex gap-2">
        <button
          v-if="mode === Mode.Read"
          :onClick="() => $emit('setEditMode')"
          type="button"
          class="btn bg-blue-500 hover:bg-blue-700 inline-flex"
        >
          <img
            src="assets/images/edit.svg"
            class="mr-2"
            alt="edit"
            width="20"
            height="20"
          />
          <span>Edit</span>
        </button>
        <button
          v-if="mode !== Mode.New"
          type="button"
          class="btn bg-red-500 hover:bg-red-700 inline-flex"
          :onClick="() => $emit('deleteProject', title)"
        >
          <img
            src="assets/images/delete.svg"
            class="mr-2"
            alt="delete"
            width="20"
            height="20"
          />
          <span>Delete</span>
        </button>
        <img
          :onClick="() => $emit('closeDialog')"
          src="assets/images/close.svg"
          class="ml-4 cursor-pointer transition hover:bg-gray-200 rounded-full"
          alt="close"
          width="30"
        />
      </div>
    </div>

    <form class="grid grid-cols-2 gap-4" :onSubmit="submit">
      <div class="col-span-2">
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
          required
          placeholder="Enter a title for the project"
          v-model="title"
          :disabled="isInputDisabled"
        />
      </div>
      <div class="col-span-2">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-description"
        >
          Description
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-description"
          placeholder="Enter a description for the project"
          type="text"
          required
          v-model="description"
          :disabled="isInputDisabled"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-contact"
        >
          Contact (Email)
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-contact"
          type="email"
          required
          placeholder="Enter your email"
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
            <option v-for="tag in tags" :key="tag" :value="tag">
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

      <div v-if="mode === Mode.Edit" class="mt-4">
        <Tag v-for="tag in selectedproject.tags" :tag="tag" :edit="true" />
      </div>

      <div
        class="col-span-2 flex justify-center items-center mt-4"
        v-if="mode === Mode.Edit || mode === Mode.New"
      >
        <button class="w-full btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
