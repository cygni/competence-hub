<template>
  <Dialog id="confirmDialog">
    <div class="relative w-full max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
          :onClick="() => closeDialog()"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ title }}
          </h3>
          <button
            :onClick="() => callback()"
            data-modal-hide="popup-modal"
            type="button"
            class="btn text-white bg-orange-red enabled:hover:bg-orange-red font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue px-5 py-3 text-center mr-4"
          >
            Yes, I'm sure
          </button>
          <button
            :onClick="() => closeDialog()"
            data-modal-hide="popup-modal"
            type="button"
            class="btn text-white bg-classic-blue bg-opacity-90 text-white font-semibold rounded-lg shadow-md enabled:hover:bg-classic-blue focus:outline-none focus:ring-2 focus:ring-classic-blue focus:ring-offset-2 focus:ring-offset-classic-blue px-5 py-3"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
const emit = defineEmits(["callbackFn"]);
import { closeDialog } from "../helper/dialog";
const callback = () => {
  emit("callbackFn");
  closeDialog();
};
</script>
