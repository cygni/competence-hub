<script setup>
const links = [
  { title: "Home", link: "/" },
  { title: "Tags", link: "/tags" },
  { title: "About", link: "/about" },
];
</script>

<template>
  <header
    class="md:flex justify-between items-center p-6 bg-[#000735] shadow text-white"
  >
    <div class="flex items-center">
      <h1 class="text-2xl tracking-wider mr-4">Cygni Competence Hub</h1>
      <img
        src="assets/images/smirk.svg"
        alt="cygni logo"
        width="50"
        height="50"
      />
    </div>
    <nav class="mt-4 md:mt-0">
      <ul class="flex gap-8 text-2xl tracking-wider">
        <!--        <li>
          <img
            :onclick="createNewProject"
            src="assets/images/add.svg"
            alt="create new project button"
            class="cursor-pointer transition hover:stroke-[#eab8b2]"
            width="35"
            height="35"
          />
        </li> -->
        <li v-for="l in links" class="transition hover:text-[#eab8b2]">
          <NuxtLink :to="l.link">{{ l.title }}</NuxtLink>
        </li>
        <li>
          <img
            onclick="window.open('https://github.com/cygni/competence-hub/')"
            src="assets/images/github-white.svg"
            alt="github link"
            class="cursor-pointer transition hover:brightness-90"
            width="35"
            height="35"
          />
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
