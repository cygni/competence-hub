<script setup lang="ts">
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { openDialog } from "../helper/dialog";
import { Aspect, TechTag } from "../types/index";
import { collection, query, where } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

const collection_name = "competence-tags";

let tagsRef = collection(useFirestore(), collection_name);

if (!tagsRef) {
  throw createError({ statusCode: 404, statusMessage: "No tags" });
}

let frontendTags = ref(
  useCollection(query(tagsRef, where("aspect", "==", "frontend")))
);
let backendTags = ref(
  useCollection(query(tagsRef, where("aspect", "==", "backend")))
);
let fullstackTags = ref(
  useCollection(query(tagsRef, where("aspect", "==", "fullstack")))
);
let embeddedTags = ref(
  useCollection(query(tagsRef, where("aspect", "==", "embedded")))
);

let newTag = ref({ value: "", aspect: "" });
let selectedTag = ref(<TechTag>{ value: "", aspect: "" });

const isDuplicate = (newTagValue: string) => {
  console.log("inside is duplicate", useCollection(tagsRef));
  const tagValues = useCollection(tagsRef).value.map((tag) => tag.value);
  return tagValues.includes(newTagValue);
};

const addTag = () => {
  if (!isDuplicate(newTag.value.value)) {
    let aspect = "";

    switch (newTag.value.aspect) {
      case Aspect.Fullstack: {
        aspect = "fullstack";
        break;
      }
      case Aspect.Frontend: {
        aspect = "frontend";
        break;
      }
      case Aspect.Backend: {
        aspect = "backend";
        break;
      }
      case Aspect.Embedded: {
        aspect = "embedded";
        break;
      }
    }
    if (newTag.value.value != "" || aspect != "") {
      setDoc(doc(useFirestore(), "competence-tags", newTag.value.value), {
        aspect: aspect,
        value: newTag.value.value,
      }).then(() => {
        getTags();
      });
    }
  } else {
    alert("Can't add duplicate tech tags");
    throw createError({
      statusCode: 403,
      statusMessage: "Cant add duplicate tech tags",
    });
  }
};

const removeSelectedTag = (selectedTag: TechTag) => {
  new Promise((resolve, reject) => {
    deleteTag(selectedTag);
    resolve(null);
  }).then(() => {
    setTimeout(() => {
      getTags();
    }, 1000);
  });
};

const getTags = () => {
  frontendTags = useCollection(
    query(tagsRef, where("aspect", "==", "frontend"))
  );
  backendTags = useCollection(query(tagsRef, where("aspect", "==", "backend")));
  fullstackTags = useCollection(
    query(tagsRef, where("aspect", "==", "fullstack"))
  );
  embeddedTags = useCollection(
    query(tagsRef, where("aspect", "==", "embedded"))
  );
};

const deleteTag = (tag: TechTag) => {
  deleteDoc(doc(useFirestore(), collection_name, tag.value));
};

const showConfirmDialog = (tag: TechTag) => {
  selectedTag.value = tag;
  openDialog();
};
</script>

<template>
  <div class="text-copy-black">
    <h2 class="text-3xl mb-6">Available tech-tags</h2>
    <div class="flex flex-row">
      <div class="rounded basis-1/5 shadow-lg bg-white p-4 mr-4">
        <h2 class="text-xl mb-4">Frontend</h2>
        <div class="flex flex-wrap max-w-[85%]">
          <Tag
            :edit="true"
            v-if="frontendTags?.length > 0"
            v-for="tag in frontendTags"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/5 shadow-lg bg-white p-4 mx-4">
        <h2 class="text-xl mb-4">Backend</h2>
        <div class="flex flex-wrap max-w-[85%]">
          <Tag
            :edit="true"
            v-if="backendTags?.length > 0"
            v-for="tag in backendTags"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/5 shadow-lg bg-white p-4 mx-4">
        <h2 class="text-xl mb-4">Fullstack</h2>
        <div class="flex flex-wrap max-w-[85%]">
          <Tag
            :edit="true"
            v-if="fullstackTags?.length > 0"
            v-for="tag in fullstackTags"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/5 shadow-lg bg-white p-4 ml-4">
        <h2 class="text-xl mb-4">Embedded</h2>
        <div class="flex flex-wrap max-w-[85%]">
          <Tag
            :edit="true"
            v-if="embeddedTags?.length > 0"
            v-for="tag in embeddedTags"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
    </div>

    <form class="grid grid-cols-1 gap-4 mt-9" :onSubmit="addTag">
      <div class="col-span-1 max-w-md">
        <label
          class="uppercase tracking-wider text-xs font-bold text-gray-700"
          for="techtag-value"
        >
          Tech tag
        </label>
        <input
          v-model="newTag.value"
          id="techtag-value"
          class="appearance-none w-full text-purple-rain border border-purbeck-stone rounded py-3 px-4 leading-tight transition border focus:outline-none focus:ring-2 focus:ring-purple-rain focus:border-transparent appearance-none border border-transparent w-full py-2 px-4 bg-white placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="New tech tag..."
        />
      </div>
      <div class="col-span-1 max-w-lg">
        <label class="uppercase tracking-wider text-xs font-bold text-gray-700"
          >Aspect</label
        >
        <div class="pb-5 flex">
          <fieldset>
            <legend class="sr-only">Privacy setting</legend>

            <div class="rounded-md -space-y-px">
              <div
                class="relative border rounded-tl-md rounded-tr-md py-2 px-6 flex"
                :class="{
                  'bg-purple-rain bg-opacity-50 border-purple-rain':
                    newTag.aspect == Aspect.Backend,
                  'border-purple-rain border-opacity-50 bg-white bg-opacity-80':
                    newTag.aspect != Aspect.Backend,
                }"
              >
                <div class="flex items-center h-5">
                  <input
                    :value="Aspect.Backend"
                    v-model="newTag.aspect"
                    type="radio"
                    class="focus:ring-purple-rain h-4 w-4 text-purple-rain cursor-pointer border-purbeck-stone"
                  />
                </div>
                <label
                  for="settings-option-0"
                  class="ml-3 flex flex-col cursor-pointer"
                >
                  <span
                    class="block text-sm font-medium"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Backend,
                      'text-copy-black': newTag.aspect != Aspect.Backend,
                    }"
                  >
                    Backend
                  </span>
                  <span
                    class="block text-sm"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Backend,
                      'text-copy-black': newTag.aspect != Aspect.Backend,
                    }"
                  >
                    The tech tag you are adding is used in backend development
                  </span>
                </label>
              </div>

              <div
                class="relative border rounded-tl-md rounded-tr-md py-2 px-6 flex"
                :class="{
                  'bg-purple-rain bg-opacity-50 border-purple-rain':
                    newTag.aspect == Aspect.Frontend,
                  'border-purple-rain border-opacity-50 bg-white bg-opacity-80':
                    newTag.aspect != Aspect.Frontend,
                }"
              >
                <div class="flex items-center h-5">
                  <input
                    :value="Aspect.Frontend"
                    v-model="newTag.aspect"
                    type="radio"
                    class="focus:ring-purple-rain h-4 w-4 text-purple-rain cursor-pointer border-purbeck-stone"
                  />
                </div>
                <label
                  for="settings-option-0"
                  class="ml-3 flex flex-col cursor-pointer"
                >
                  <span
                    class="block text-sm font-medium"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Frontend,
                      'text-copy-black': newTag.aspect != Aspect.Frontend,
                    }"
                  >
                    Frontend
                  </span>
                  <span
                    class="block text-sm"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Frontend,
                      'text-galaxy-blue': newTag.aspect != Aspect.Frontend,
                    }"
                  >
                    The tech tag you are adding is used in frontend development
                  </span>
                </label>
              </div>

              <div
                class="relative border rounded-tl-md rounded-tr-md py-2 px-6 flex"
                :class="{
                  'bg-purple-rain bg-opacity-50 border-purple-rain':
                    newTag.aspect == Aspect.Fullstack,
                  'border-purple-rain border-opacity-50 bg-white bg-opacity-80':
                    newTag.aspect != Aspect.Fullstack,
                }"
              >
                <div class="flex items-center h-5">
                  <input
                    :value="Aspect.Fullstack"
                    v-model="newTag.aspect"
                    type="radio"
                    class="focus:ring-purple-rain h-4 w-4 text-purple-rain cursor-pointer border-purbeck-stone"
                  />
                </div>
                <label
                  for="settings-option-0"
                  class="ml-3 flex flex-col cursor-pointer"
                >
                  <span
                    class="block text-sm font-medium"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Fullstack,
                      'text-copy-black': newTag.aspect != Aspect.Fullstack,
                    }"
                  >
                    Fullstack
                  </span>
                  <span
                    class="block text-sm"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Fullstack,
                      'text-galaxy-blue': newTag.aspect != Aspect.Fullstack,
                    }"
                  >
                    The tech tag you are adding is used in fullstack development
                  </span>
                </label>
              </div>

              <div
                class="relative border rounded-tl-md rounded-tr-md py-2 px-6 flex"
                :class="{
                  'bg-purple-rain bg-opacity-50 border-purple-rain':
                    newTag.aspect == Aspect.Embedded,
                  'border-purple-rain border-opacity-50 bg-white bg-opacity-80':
                    newTag.aspect != Aspect.Embedded,
                }"
              >
                <div class="flex items-center h-5">
                  <input
                    :value="Aspect.Embedded"
                    v-model="newTag.aspect"
                    type="radio"
                    class="focus:ring-purple-rain h-4 w-4 text-purple-rain cursor-pointer border-purbeck-stone"
                  />
                </div>
                <label
                  for="settings-option-0"
                  class="ml-3 flex flex-col cursor-pointer"
                >
                  <span
                    class="block text-sm font-medium"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Embedded,
                      'text-copy-black': newTag.aspect != Aspect.Embedded,
                    }"
                  >
                    Embedded
                  </span>
                  <span
                    class="block text-sm"
                    :class="{
                      'text-white': newTag.aspect == Aspect.Embedded,
                      'text-galaxy-blue': newTag.aspect != Aspect.Embedded,
                    }"
                  >
                    The tech tag you are adding is used in embedded development
                  </span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </form>
    <ConfirmDialog
      :title="`Are you sure you want to delete the tag ${selectedTag.value}`"
      @callbackFn="removeSelectedTag(selectedTag)"
    />

    <div class="col-span-1 flex justify-start items-center mt-4 max-w-xs">
      <button
        class="flex-shrink-0 bg-classic-blue bg-opacity-90 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md enabled:hover:bg-classic-blue focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue"
        @click="addTag"
        :disabled="!newTag.value || !newTag.aspect"
      >
        Add tech tag
      </button>
    </div>
  </div>
</template>
