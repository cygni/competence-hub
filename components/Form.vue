<script setup lang="ts">
const emit = defineEmits(["addToProject"]);
const title = ref("");
const description = ref("");
const contact = ref("");
const tags = ref([]);

const submit = (e: any) => {
  e.preventDefault();
  emit("addToProject", {
    title: title.value,
    description: description.value,
    contact: contact.value,
    tags: [tags.value],
  });
  e.target.reset();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
    <div class="text-gray-700 mb-4">
      <h1 class="tracking-wider text-2xl font-bold">Add new project</h1>
    </div>

    <form class="grid grid-cols-2 gap-4" :onSubmit="submit">
      <div class="col-span-1">
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
          v-model="title"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-description"
        >
          Description
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-description"
          type="text"
          v-model="description"
        />
      </div>
      <div class="col-span-1">
        <label
          class="uppercase tracking-wider text-xs font-bold mb-2 text-gray-700"
          for="project-contact"
        >
          Contact
        </label>
        <input
          class="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight transition focus:outline-none focus:bg-white focus:border-gray-500"
          id="project-contact"
          type="text"
          v-model="contact"
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
          >
            <option disabled value="">Select tags</option>
            <option>React</option>
            <option>Vue</option>
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
      <div class="col-span-2 flex justify-center items-center mt-4">
        <button class="w-full btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
