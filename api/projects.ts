import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

export default defineEventHandler(async (event) => {
  try {
    const data = useCollection(
      collection(useFirestore(), "competence-projects")
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});
