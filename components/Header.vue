<script setup></script>

<template>
  <header
    class="md:flex justify-between items-center p-6 bg-[#000735] shadow text-white"
  >
    <div class="flex items-center">
      <h1 class="text-2xl tracking-wider mr-4">Cygni Competence Hub</h1>
      <img
        src="assets/images/smirk_rose_quartz.svg"
        alt="cygni logo"
        width="50"
        height="50"
      />
    </div>
    <nav class="mt-4 md:mt-0">
      <ul class="flex gap-8 text-2xl tracking-wider">
        <li class="transition hover:text-[#eab8b2]">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="transition hover:text-[#eab8b2]">
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li class="transition hover:text-[#eab8b2]">
          <NuxtLink to="/tags">Tags</NuxtLink>
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
