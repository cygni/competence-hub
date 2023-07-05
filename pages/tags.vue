<script setup lang="ts">
import { collection, doc, setDoc } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { getFilteredTags } from "~/api/tags";
import { Aspect, TechTag } from "../types/index";

let newTag = { value: "", aspect: "" };
let tags = ref(getFilteredTags());
let selectedTag = ref(<TechTag>{ value: "", aspect: "" });

const readTags = () => {
  tags.value = useCollection(collection(useFirestore(), "competence-tags"));
};

const isDuplicate = (newTagValue) => {
  let tagValues = tags.value?.map(function (tag) {
    return tag.value;
  });

  if (tagValues.includes(newTagValue)) {
    return true;
  }
};

const addTag = () => {
  if (!isDuplicate(newTag.value)) {
    let aspect = "";

    switch (newTag.aspect) {
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
    if (newTag.value != "" || aspect != "") {
      setDoc(doc(useFirestore(), "competence-tags", newTag.value), {
        aspect: aspect,
        value: newTag.value,
      });
    }
    readTags();
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "Cant add duplicate tech tags",
    });
  }
};

const updateTagsList = () => {
  setTimeout(() => {
    tags.value = getFilteredTags();
  }, 1000);
};

const setSelectedTag = (tag: TechTag) => {
  console.log("set selectedTag", tag);
  selectedTag.value = tag;
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
            @setSelectedTag="setSelectedTag"
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
            @setSelectedTag="setSelectedTag"
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
            @setSelectedTag="setSelectedTag"
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
            @setSelectedTag="setSelectedTag"
          />
        </div>
      </div>
    </div>

    <form class="grid grid-cols-1 gap-3 mt-9" :onSubmit="submit">
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
    <ConfirmDialog :tag="selectedTag" @updateTagsList="updateTagsList" />

    <div class="col-span-1 mt-4">
      <button class="btn" :onClick="addTag">Add tech tag</button>
    </div>
  </div>
</template>
