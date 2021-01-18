import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Home from "@/views/Home.vue";
import Searchbar from "@/components/Searchbar";
import Results from "@/components/Results";

describe("Home.vue", () => {
  let vuetify, router, wrapper, store;
  const query = "SET_QUERY";
  const actions = {
    search: jest.fn()
  };
  const mutations = {
    SET_QUERY: jest.fn()
  };

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);

  function quickMount(opts) {
    return shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router,
      ...opts
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();

    vuetify = new Vuetify();
    router = new VueRouter();

    store = new Vuex.Store({
      modules: {
        search: {
          mutations,
          actions,
          namespaced: true
        }
      }
    });
    router.push({ path: "/", query: { q: query } });
    wrapper = quickMount();
  });

  it("should have a header with text 'Zoom Developer Search'", () => {
    const header = "Zoom Developer Search";
    const h1 = wrapper.find("div#zds-title");
    expect(h1.text()).toEqual(header);
  });

  it("should hide the #scroll-to-top button", () => {
    const btn = wrapper.find("#scroll-to-top");
    expect(btn.isVisible()).toBeFalsy();
  });

  it("should call the SET_QUERY mutation on created()", () => {
    expect(mutations.SET_QUERY).toHaveBeenCalledTimes(1);
  });

  it("should call not the SET_QUERY mutation if q is blank", () => {
    router.push({ path: "/" });
    expect(mutations.SET_QUERY).toHaveBeenCalledTimes(1);
  });

  it("should have a Searchbar component", () => {
    expect(wrapper.findComponent(Searchbar).exists()).toBeTruthy();
  });

  it("should have a Results component", () => {
    expect(wrapper.findComponent(Results).exists()).toBeTruthy();
  });
});
