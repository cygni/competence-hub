import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("MIDDLEWARE ACTIVE");

  const user = await getCurrentUser();
  if (!user) signIn();
});

const signIn = async () => {
  const auth = await getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
