<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { storeToRefs } from "pinia";
import { useModeStore } from "../store/index";
import { Mode, Project, TechTag } from "../types/index";

const { selectedProject } = defineProps<{ selectedProject: Project }>();
const emit = defineEmits(["onProjectChanged", "closeDialog"]);

const modeStore = useModeStore();
const { mode } = storeToRefs(modeStore);
const { setEditMode } = modeStore;
const tagOptions = useCollection(collection(useFirestore(), "competence-tags"));

const title = ref("");
const description = ref("");
const contact = ref("");
const purpose = ref("");
const link = ref("");
const heading = ref("");
const tags = ref<TechTag[]>([]);

const isInputDisabled = ref(
  mode.value === Mode.Edit || mode.value === Mode.New ? false : true
);

if (selectedProject && mode.value === Mode.Read) {
  title.value = selectedProject.title;
  description.value = selectedProject.description;
  contact.value = selectedProject.contact;
  purpose.value = selectedProject.purpose;
  link.value = selectedProject.link;
  tags.value = [...selectedProject.tags];
}

watchEffect(() => {
  switch (mode.value) {
    case Mode.Edit: {
      heading.value = `Edit project ${selectedProject?.title}`;
      isInputDisabled.value = false;
      break;
    }
    case Mode.New: {
      heading.value = "Create new project";
      isInputDisabled.value = false;
      break;
    }
    default:
      heading.value = `Project ${selectedProject?.title}`;
      isInputDisabled.value = true;
      break;
  }
});

const addToProject = (e: any) => {
  e.preventDefault();
  const body: Project = {
    id: selectedProject?.id ?? crypto.randomUUID(),
    title: title.value,
    description: description.value,
    contact: contact.value,
    tags: tags.value,
    purpose: purpose.value,
    link: link.value,
  };

  if (isProjectFormValid(body)) {
    new Promise((resolve, reject) => {
      mode.value === Mode.New
        ? setDoc(doc(useFirestore(), "competence-projects", body.id), body)
        : updateDoc(doc(useFirestore(), "competence-projects", body.id), body);
      resolve(null);
    }).then(() => {
      emit("onProjectChanged");
      e.target.reset();
    });
  }
};

const isProjectFormValid = (p: Project) => {
  return (
    p.id != "" ||
    p.title != "" ||
    p.description != "" ||
    p.contact != "" ||
    p.purpose != "" ||
    p.link != "" ||
    p.tags.length !== 0
  );
};

const deleteProject = () => {
  new Promise((resolve, reject) => {
    deleteDoc(doc(useFirestore(), "competence-projects", selectedProject.id));
    resolve(null);
  }).then(() => {
    emit("onProjectChanged");
  });
};

const removeTag = (tag: TechTag) => {
  tags.value = tags.value.filter((t) => t.value !== tag.value);
};

const addTags = (e: any) => {
  e.preventDefault();
  const selectedTag = tagOptions.value[e.target.selectedIndex - 1];
  const tag: TechTag = {
    aspect: selectedTag.aspect,
    value: selectedTag.value,
  };
  tags.value.push(tag);
};

const tagAlreadyChosen = (tag: string) => {
  return Boolean(tags.value.find((t) => t.value === tag));
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
    <div class="text-gray-700 mb-4 flex justify-between">
      <h1 class="tracking-wider text-2xl font-bold">{{ heading }}</h1>
      <div class="flex gap-2">
        <button
          v-if="mode === Mode.Read"
          :onClick="() => setEditMode()"
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
          :onClick="() => deleteProject()"
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

    <form class="grid grid-cols-2 gap-4" :onSubmit="addToProject">
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

      <div class="col-span-2">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-purpose"
        >
          Purpose
        </label>
        <textarea
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-purpose"
          placeholder="Enter the purpose of the project"
          type="text"
          required
          v-model="purpose"
          :disabled="isInputDisabled"
        />
      </div>
      <div class="col-span-2">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-link"
        >
          Github
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-link"
          type="link"
          required
          placeholder="Enter the projects github url"
          v-model="link"
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
            class="appearance-none cursor-pointer w-full border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="project-tags"
            name="tags"
            :onchange="addTags"
            :disabled="isInputDisabled"
          >
            <option selected disabled>Select tags</option>
            <option
              v-for="tag in tagOptions"
              :disabled="tagAlreadyChosen(tag.value)"
              :key="tag.value"
              :value="tag"
            >
              {{ tag.value }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <img
              :onClick="() => $emit('closeDialog')"
              src="assets/images/arrow-down.svg"
              alt="arrow down"
              width="20"
            />
          </div>
        </div>
      </div>

      <div class="mt-2 col-span-2">
        <Tag
          v-for="tag in tags"
          :tag="tag"
          :edit="mode === Mode.Edit || mode === Mode.New"
          @deleteTag="removeTag"
        />
      </div>

      <div class="col-span-2 flex justify-center items-center mt-4">
        <button class="w-full btn" type="submit" :disabled="mode === Mode.Read">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
