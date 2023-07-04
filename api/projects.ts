export default defineEventHandler(async (event) => {
  try {
    const data = await $fetch(
      "https://competence-hub-default-rtdb.europe-west1.firebasedatabase.app/projects.json"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});
