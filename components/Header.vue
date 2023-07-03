<script setup></script>

<template>
  <header
    class="flex justify-between items-center p-6 bg-[#000735] shadow text-white"
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
    <nav>
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
