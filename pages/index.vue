<script setup lang="ts">
type Project = {
  title: string;
  description: string;
  contact: string;
  tags: string[];
};

const projects = ref<Project[]>([]);

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

const selectedproject = ref<Project>();

const addToProject = (project: Project) => {
  console.log(project);
  projects.value.push(project);
};
const showProject = (project: Project) => {
  selectedproject.value = project;
};

try {
  /*   const { data, error } = await useFetch("/api/projects");
  projects.value = (data.value as Project[]) ?? []; */
  const data = await useFetch(
    "https://competence-hub-default-rtdb.europe-west1.firebasedatabase.app/projects.json"
  );
  if (data.error.value) {
    throw new Error(data.error.value.message);
  }
  console.log(data);
} catch (error) {
  console.error(error);
}
</script>

<template>
  <div>
    <div class="flex justify-center mb-8">
      <Form @addToProject="addToProject" />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="project in projects">
        <ProjectCard :project="project" @setSelectedProject="showProject" />
      </div>
    </div>
  </div>
</template>
