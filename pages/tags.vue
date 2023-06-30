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
let newTag = ref<TechTag>({ value: "hej", aspect: "plopp" });

const addTag = (tag: TechTag) => {
  console.log("lala");
};
</script>

<template>
  <div class="text-gray-700">
    <p>Available tech-tags</p>
    <div class="p-3">
      <Tag v-if="tags.length > 0" v-for="tag in tags" :tag="tag" />
    </div>
    <input v-model="newTag.value" placeholder="Add new tag..." />
    <input type="radio" id="backend" value="Backend" v-model="newTag.aspect" />
    <label for="backend">Backend</label>
    <input
      type="radio"
      id="frontend"
      value="Frontend"
      v-model="newTag.aspect"
    />
    <label for="frontend">Frontend</label>
    <input
      type="radio"
      id="fullstack"
      value="Fullstack"
      v-model="newTag.aspect"
    />
    <label for="fullstack">Fullstack</label>
  </div>
</template>
