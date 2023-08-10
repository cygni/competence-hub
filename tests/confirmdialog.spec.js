import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ConfirmDialog from "../components/ConfirmDialog.vue";

describe("ConfirmDialog", () => {
  it("is a Vue instance", async () => {
    const wrapper = mount(ConfirmDialog);
    expect(wrapper.vm).toBeTruthy();
  });
});
