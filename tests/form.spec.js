import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Form from "../components/Form.vue";

describe("Form", () => {
  it("is a Vue instance", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm).toBeTruthy();
  });
});
