<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { deleteTag, getAllTags, getFilteredTags } from "~/api/tags";
import { openDialog } from "../helper/dialog";
import { Aspect, FilteredTags, TechTag } from "../types/index";

let newTag = ref({ value: "", aspect: "" });
let tags = ref<FilteredTags>(getFilteredTags());
let selectedTag = ref(<TechTag>{ value: "", aspect: "" });

const isDuplicate = (newTagValue: string) => {
  const tagValues = getAllTags().map((tag) => tag.value);
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
  <div class="text-gray-700">
    <h2 class="text-2xl mb-6">Available tech-tags</h2>
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
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="New tech tag..."
        />
      </div>
      <div class="col-span-1 max-w-lg">
        <label class="uppercase tracking-wider text-xs font-bold text-gray-700"
          >Aspect</label
        >
        <div
          class="appearance-none w-full text-gray-700 rounded py-3 px-2 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <input
            class="mr-2"
            type="radio"
            id="backend"
            :value="Aspect.Backend"
            v-model="newTag.aspect"
          />
          <label class="mr-8" for="backend">Backend</label>
          <input
            class="mr-2"
            type="radio"
            id="frontend"
            :value="Aspect.Frontend"
            v-model="newTag.aspect"
          />
          <label class="mr-8" for="frontend">Frontend</label>
          <input
            class="mr-2"
            type="radio"
            id="fullstack"
            :value="Aspect.Fullstack"
            v-model="newTag.aspect"
          />
          <label class="mr-8" for="fullstack">Fullstack</label>
          <input
            class="mr-2"
            type="radio"
            id="embedded"
            :value="Aspect.Embedded"
            v-model="newTag.aspect"
          />
          <label class="mr-8" for="embedded">Embedded</label>
        </div>
      </div>
    </form>
    <ConfirmDialog
      :title="`Are you sure you want to delete the tag ${selectedTag.value}`"
      @callbackFn="removeSelectedTag(selectedTag)"
    />

    <div class="col-span-1 flex justify-center items-center mt-4 max-w-xs">
      <button
        class="w-full btn"
        @click="addTag"
        :disabled="!newTag.value || !newTag.aspect"
      >
        Add tech tag
      </button>
    </div>
  </div>
</template>
