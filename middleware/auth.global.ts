import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("MIDDLEWARE ACTIVE");

  const user = await getCurrentUser();
  if (!user) signIn();
});

const signIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};
