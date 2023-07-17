<script setup>
const links = [
  { title: "Projects", link: "/", order: "order-first" },
  { title: "Tags", link: "/tags", order: "order-2" },
];
</script>

<template>
  <header
    class="md:flex justify-center justify-between items-center px-8 py-2 bg-[#000735] shadow text-white"
  >
    <div class="flex justify-center items-center">
      <img
        class="mb-4 md:ml-0 ml-4 mr-2"
        src="../assets/images/smirk.svg"
        alt="cygni logo"
        width="50"
        height="50"
      />
      <h1 class="text-2xl tracking-wider mr-3">Cygni Competence Hub</h1>
      <img
        class="cursor-pointer transition hover:brightness-90"
        onclick="window.open('https://github.com/cygni/competence-hub/')"
        src="../assets/images/github-white.svg"
        alt="github link"
        width="35"
        height="35"
      />
    </div>
    <nav class="flex justify-center py-2">
      <ul class="flex gap-10 text-2xl tracking-wider">
        <li class="order-1 -ml-8">
          <img
            :onclick="createNewProject"
            src="assets/images/add.svg"
            alt="create new project button"
            class="cursor-pointer transition hover:stroke-[#eab8b2]"
            width="35"
            height="35"
          />
        </li>
        <li
          v-for="l in links"
          :class="l.order"
          class="transition hover:text-[#eab8b2]"
        >
          <NuxtLink :to="l.link">{{ l.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
.router-link-exact-active {
  color: #eab8b2;
}
</style>
