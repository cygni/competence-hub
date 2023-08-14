import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Tags from "../pages/tags.vue";
import { initializeApp } from "firebase/app";

const mockTagsCollection = {
  "competence-tags": [
    { aspect: "frontend", value: "react" },
    { aspect: "frontend", value: "react" },
    { aspect: "backend", value: "c#" },
    { aspect: "embedded", value: "java" },
  ],
};

const mockTags = {
  "competence-tags": [
    { aspect: "frontend", value: "react" },
    { aspect: "frontend", value: "react" },
    { aspect: "backend", value: "c#" },
    { aspect: "embedded", value: "java" },
  ],
};

vi.mock("vuefire", async () => {
  const actual = await vi.importActual("vuefire");
  return {
    ...actual,
    useFireStore: (name) => {
      return name;
    },
    useCollection: (tags) => {
      tags = mockTags;
      return tags;
    },
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    collection: (tags) => {
      tags = mockTagsCollection;
      return tags;
    },
    where: (compare1, sign, compare2) => {
      return { compare1, sign, compare2 };
    },
    query: (tags, condition) => {
      return tags["competence-tags"].filter((tag) => {
        return tag.aspect == condition.compare2;
      });
    },
  };
});

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

describe("Tags", () => {
  beforeEach(() => {
    initializeApp(firebaseConfig);
  });

  it("is a Vue instance", async () => {
    const wrapper = mount(Tags);
    expect(wrapper.vm).toBeTruthy();
  });
});
