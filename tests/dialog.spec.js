import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Dialog from "../components/Dialog.vue";

describe("Dialog", () => {
  it("is a Vue instance", async () => {
    const wrapper = mount(Dialog);
    expect(wrapper.vm).toBeTruthy();
  });
});
