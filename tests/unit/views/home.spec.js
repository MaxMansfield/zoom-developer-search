import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Home from "@/views/Home.vue";
import Searchbar from "@/components/Searchbar";
import Results from "@/components/Results";

describe("Home.vue", () => {
  let vuetify;
  let router;
  const actions = {
    search: jest.fn()
  };

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);

  beforeEach(() => {
    // There is a lot of repeated code in these tests
    // using beforeEach for that code will break tests
    // this seems to be due to issues with Vuetify 2. Fixed in 3.
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it("should have a header with text 'Zoom Developer Search'", () => {
    const header = "Zoom Developer Search";
    const mutations = {
      SET_QUERY: jest.fn()
    };
    const store = new Vuex.Store({
      modules: {
        search: {
          mutations,
          actions,
          namespaced: true
        }
      }
    });
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router
    });
    const h1 = wrapper.find("div#zds-title");
    expect(h1.text()).toEqual(header);
  });

  it("should call the SET_QUERY mutation on created()", () => {
    const query = "SET_QUERY";
    const mutations = {
      SET_QUERY: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        search: {
          mutations,
          actions,
          namespaced: true
        }
      }
    });

    router.push({ path: "/", query: { q: query } });

    //eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router
    });

    expect(mutations.SET_QUERY).toHaveBeenCalledTimes(1);
  });

  it("should set state.query using SET_QUERY on created()", () => {
    const query = "SET_QUERY";
    const mutations = {
      SET_QUERY: state => (state.query = query)
    };
    const store = new Vuex.Store({
      modules: {
        search: {
          state: {
            query: ""
          },
          mutations,
          actions,
          namespaced: true
        }
      }
    });
    router.push({ path: "/", query: { q: query } });

    //eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router
    });

    expect(store.state.search.query).toEqual(query);
  });

  it("should have a Searchbar component", () => {
    const mutations = {
      SET_QUERY: jest.fn()
    };
    const store = new Vuex.Store({
      modules: {
        search: {
          mutations,
          actions,
          namespaced: true
        }
      }
    });
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router
    });
    expect(wrapper.findComponent(Searchbar).exists()).toBeTruthy();
  });

  it("should have a Results component", () => {
    const mutations = {
      SET_QUERY: jest.fn()
    };
    const store = new Vuex.Store({
      modules: {
        search: {
          mutations,
          actions,
          namespaced: true
        }
      }
    });
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store,
      router
    });
    expect(wrapper.findComponent(Results).exists()).toBeTruthy();
  });
});
