import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Tag from "../components/Tag.vue";

const mockTag = { aspect: "frontend", tag: "vue" };

describe("Tag", () => {
  it("is a Vue instance", async () => {
    const wrapper = mount(Tag, {
      propsData: {
        tag: mockTag,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
