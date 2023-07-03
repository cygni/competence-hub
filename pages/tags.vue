<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { TechTag } from "../types/index";

let tags = useCollection(collection(useFirestore(), "competence-tags"));
console.log("tags ", tags);
let newTag = { value: "", aspect: "" };

const readTags = () => {
  projects = useCollection(collection(useFirestore(), "competence-tags"));
};

const addTag = () => {
  console.log("lala", newTag);
  if (newTag.value != "" || newTag.aspect != "") {
    console.log("adding tag", newTag);
    setDoc(doc(useFirestore(), "competence-tags", newTag.value), {
      aspect: newTag.aspect,
      value: newTag.value,
    });
  }
  readTags();
};
</script>

<template>
  <div class="text-gray-700">
    <p>Available tech-tags</p>
    <div class="p-3">
      <Tag v-if="tags.length > 0" v-for="tag in tags" :tag="tag" />
    </div>

    <form class="grid grid-cols-2 gap-4" :onSubmit="submit">
      <div class="col-span-1">
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
      <div class="col-span-1">
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
            value="backend"
            v-model="newTag.aspect"
          />
          <label class="mr-2" for="backend">Backend</label>
          <input
            class="mr-2"
            type="radio"
            id="frontend"
            value="frontend"
            v-model="newTag.aspect"
          />
          <label class="mr-2" for="frontend">Frontend</label>
          <input
            class="mr-2"
            type="radio"
            id="fullstack"
            value="fullstack"
            v-model="newTag.aspect"
          />
          <label class="mr-2" for="fullstack">Fullstack</label>
        </div>
      </div>
    </form>

    <button class="w-full btn" :onClick="addTag">Add tech tag</button>
  </div>
</template>
