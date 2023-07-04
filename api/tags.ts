import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

export default defineEventHandler(async (event: any) => {
  try {
    const data = useCollection(collection(useFirestore(), "competence-tags"));
    return data;
  } catch (error) {
    console.log(error);
  }
});
