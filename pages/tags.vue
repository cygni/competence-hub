<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { TechTag, Aspect } from "../types/index";

let tags = useCollection(collection(useFirestore(), "competence-tags"));
console.log("tags ", tags);
let newTag = { value: "", aspect: "" };

const readTags = () => {
  tags = useCollection(collection(useFirestore(), "competence-tags"));
};

const isDuplicate = (newTagValue) => {
  let tagValues = tags.value?.map(function (tag) {
    return tag.value;
  });
  console.log("tagvalues", tagValues);
  if (tagValues.includes(newTagValue)) {
    return true;
  }
};

const addTag = () => {
  if (!isDuplicate(newTag.value)) {
    console.log("lala", newTag);
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
    }
    if (newTag.value != "" || aspect != "") {
      console.log("adding tag", newTag);
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
</script>

<template>
  <div class="container text-gray-700">
    <h2 class="text-xl">Available tech-tags</h2>
    <div class="flex -mx-2 mb-8">
      <div class="flex rounded w-1/3 px-2 shadow-lg bg-white p-2 mr-2">
        <div class="p-3">
          <Tag v-if="tags.length > 0" v-for="tag in tags" :tag="tag" />
        </div>
      </div>
      <div class="flex rounded w-1/3 px-2 shadow-lg bg-white p-2 ml-2">
        <div class="p-3">
          <Tag v-if="tags.length > 0" v-for="tag in tags" :tag="tag" />
        </div>
      </div>
      <div class="flex rounded w-1/3 px-2 shadow-lg bg-white p-2 ml-2">
        <div class="p-3">
          <Tag v-if="tags.length > 0" v-for="tag in tags" :tag="tag" />
        </div>
      </div>
    </div>

    <form class="grid grid-cols-1 gap-4 mt-9" :onSubmit="submit">
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
      <div class="col-span-1 max-w-md">
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
        </div>
      </div>
    </form>

    <div class="col-span-1 flex justify-center items-center mt-4 max-w-xs">
      <button class="w-full btn" :onClick="addTag">Add tech tag</button>
    </div>
  </div>
</template>
