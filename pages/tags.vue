<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { deleteTag, getAllTags, getFilteredTags } from "~/api/tags";
import { openDialog } from "../helper/dialog";
import { Aspect, FilteredTags, TechTag } from "../types/index";

let tags = ref<FilteredTags>(getFilteredTags());
let newTag = ref({ value: "", aspect: "" });
let selectedTag = ref(<TechTag>{ value: "", aspect: "" });

const isDuplicate = (newTagValue: string) => {
  const tagValues = getAllTags().map((tag) => tag.value);
  return tagValues.includes(newTagValue);
};

// function RadioFields() {
//   return {
//     value: false,
//     init() {
//       this.value = this.$el.querySelector("input[type=radio]:checked").value;
//     },
//   };
// }
// window.RadioFields = RadioFields;

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
        tags.value = getFilteredTags();
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
      tags.value = getFilteredTags();
    }, 1000);
  });
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
      <div class="rounded basis-1/4 shadow-lg bg-white p-3 mr-3">
        <h2 class="text-xl mb-3">Frontend</h2>
        <div class="flex flex-wrap max-w-[80%]">
          <Tag
            :edit="true"
            v-if="tags.frontend?.length > 0"
            v-for="tag in tags.frontend"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/4 shadow-lg bg-white p-3 mx-3">
        <h2 class="text-xl mb-3">Backend</h2>
        <div class="flex flex-wrap max-w-[80%]">
          <Tag
            :edit="true"
            v-if="tags.backend?.length > 0"
            v-for="tag in tags.backend"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/4 shadow-lg bg-white p-3 mx-3">
        <h2 class="text-xl mb-3">Fullstack</h2>
        <div class="flex flex-wrap max-w-[80%]">
          <Tag
            :edit="true"
            v-if="tags.fullstack?.length > 0"
            v-for="tag in tags.fullstack"
            :tag="tag"
            @deleteTag="showConfirmDialog"
          />
        </div>
      </div>
      <div class="rounded basis-1/4 shadow-lg bg-white p-3 ml-3">
        <h2 class="text-xl mb-3">Embedded</h2>
        <div class="flex flex-wrap max-w-[80%]">
          <Tag
            :edit="true"
            v-if="tags.embedded?.length > 0"
            v-for="tag in tags.embedded"
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
