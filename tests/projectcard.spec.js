import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ProjectCard from "../components/ProjectCard.vue";

const mockProject = {
  id: "321",
  title: "Title",
  purpose: "Purpose",
  description: "Description",
  contact: "Contact@email.com",
  link: "Link",
  tags: [{ aspect: "frontend", tag: "vue" }],
};

describe("ProjectCard", () => {
  it("is a Vue instance", async () => {
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: mockProject,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
