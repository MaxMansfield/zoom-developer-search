import Vue from "vue";
import Vuex from "vuex";
import createCache from "vuex-cache";
import bus from "@/store/modules/bus";
import search from "@/store/modules/search";
import settings from "@/store/modules/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bus,
    search,
    settings
  },
  plugins: [createCache()],
  strict: true
});
