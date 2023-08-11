import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Index from "../pages/index.vue";
import { setActivePinia, createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { Mode } from "../types/index";

const mockCollection = {
  "competence-projects": [
    {
      id: "321",
      title: "Title 1",
      purpose: "Purpose 1",
      description: "Description 1",
      contact: "Contact1@email.com",
      link: "Link 1",
      tags: [{ aspect: "frontend", tag: "vue" }],
    },
    {
      id: "321123",
      title: "Title 2",
      purpose: "Purpose 2",
      description: "Description 2",
      contact: "Contact2@email.com",
      link: "Link 2",
      tags: [{ aspect: "frontend", tag: "react" }],
    },
  ],
  tags: [
    { aspect: "frontend", value: "react" },
    { aspect: "frontend", value: "react" },
  ],
};

vi.mock("vuefire", async () => {
  const actual = await vi.importActual("vuefire");
  return {
    ...actual,
    useFireStore: (name) => {
      return name;
    },
    useCollection: (collection) => {
      collection = mockCollection;
      return collection;
    },
  };
});

vi.mock("../store/index", () => ({
  useModeStore: () => ({
    mode: Mode.Overview,
  }),
}));

const firebaseConfig = {
  apiKey: "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
  authDomain: "cygnicompetencehub.firebaseapp.com",
  projectId: "cygnicompetencehub",
  storageBucket: "cygnicompetencehub.appspot.com",
  messagingSenderId: "225273337132",
  appId: "1:225273337132:web:161ab4d7909b78531e0889",
  measurementId: "G-JY96C7V423",
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/`,
};

describe("Index", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    initializeApp(firebaseConfig);
  });

  it("is a Vue instance", async () => {
    const wrapper = mount(Index);
    expect(wrapper.vm).toBeTruthy();
  });
});
