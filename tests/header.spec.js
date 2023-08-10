import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../components/Header.vue";
import { setActivePinia, createPinia } from "pinia";
import { Mode } from "../types/index";

vi.mock("../store/index", () => ({
  useModeStore: () => ({
    mode: Mode.Overview,
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("is a Vue instance", async () => {
    const wrapper = mount(Header);
    expect(wrapper.vm).toBeTruthy();
  });
});
