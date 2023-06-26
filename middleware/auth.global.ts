import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();
  console.log(user);
  //to.params.access_token = user.accessToken;
  console.log(to);
  if (!user) signIn();
});

const signIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};
