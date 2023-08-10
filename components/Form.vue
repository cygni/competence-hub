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
import { auth } from "firebase-admin";
import { getAuth } from "firebase/auth";

const { selectedProject } = defineProps<{
  selectedProject: Project | undefined;
}>();
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

const auth = await getAuth();

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
    userID: auth.currentUser?.uid ? auth.currentUser.uid : "",
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
    if (selectedProject && auth.currentUser?.uid === selectedProject.userID) {
      deleteDoc(doc(useFirestore(), "competence-projects", selectedProject.id));
      resolve(null);
    } else {
      return reject(new Error("Only the owner of the project can delete"));
    }
  })
    .then(() => {
      emit("onProjectChanged");
    })
    .catch((error: Error) => {
      alert("Only the owner of the project can delete");
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

  const route = useRoute();
  console.log("papapapapapapa", route.name);
  if (useRoute().name != "index") {
    navigateTo("/");
  }
};

const tagAlreadyChosen = (tag: string) => {
  return Boolean(tags.value.find((t) => t.value === tag));
};
</script>

<template>
  <div
    id="form"
    class="bg-rose-quartz dark:bg-copy-black bg-opacity-50 rounded-lg shadow-lg p-6 overflow-hidden"
  >
    <div class="text-galaxy-blue mb-4 flex justify-between">
      <h1 class="tracking-wider text-2xl font-bold">{{ heading }}</h1>
      <div class="flex gap-2">
        <button
          v-if="mode === Mode.Read"
          :onClick="() => setEditMode()"
          type="button"
          class="btn bg-classic-blue bg-opacity-90 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md enabled:hover:bg-classic-blue focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue inline-flex"
        >
          <img
            src="../assets/images/edit.svg"
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
          class="btn bg-orange-red enabled:hover:bg-orange-red py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue inline-flex"
          :onClick="() => deleteProject()"
        >
          <img
            src="../assets/images/delete.svg"
            class="mr-2"
            alt="delete"
            width="20"
            height="20"
          />
          <span>Delete</span>
        </button>
        <img
          :onClick="() => $emit('closeDialog')"
          src="../assets/images/close.svg"
          class="ml-4 cursor-pointer transition hover:bg-gray-200 rounded-full"
          alt="close"
          width="30"
        />
      </div>
    </div>

    <form class="grid grid-cols-2 gap-4" :onSubmit="addToProject">
      <div class="col-span-2">
        <label
          class="uppercase tracking-wider text-xs font-bold text-galaxy-blue"
          for="project-title"
        >
          Title
        </label>
        <input
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
          class="uppercase tracking-wider text-xs font-bold mb-2 text-galaxy-blue"
          for="project-description"
        >
          Description
        </label>
        <input
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
          class="uppercase tracking-wider text-xs font-bold mb-2 text-galaxy-blue"
          for="project-purpose"
        >
          Purpose
        </label>
        <textarea
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
          class="uppercase tracking-wider text-xs font-bold mb-2 text-galaxy-blue"
          for="project-link"
        >
          Github
        </label>
        <input
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
          class="uppercase tracking-wider text-xs font-bold mb-2 text-galaxy-blue"
          for="project-contact"
        >
          Contact (Email)
        </label>
        <input
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
          class="uppercase tracking-wider text-xs font-bold mb-2 text-galaxy-blue"
          for="project-tags"
        >
          Tags
        </label>
        <div class="relative">
          <select
            class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
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
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-galaxy-blue"
          >
            <img
              :onClick="() => $emit('closeDialog')"
              src="../assets/images/arrow-down.svg"
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

      <div class="col-span-2 flex justify-end items-center mt-4">
        <button
          class="flex-shrink-0 bg-classic-blue bg-opacity-90 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md enabled:hover:bg-classic-blue focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue"
          type="submit"
          :disabled="mode === Mode.Read"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
