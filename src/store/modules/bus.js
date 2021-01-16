import Vue from "vue";

const state = {
  error: [],
  warn: [],
  info: []
};

const mutations = {
  /**
   * add will add a message to the specified log level array and write to the console
   * @param state the state to operate on
   * @param level the log level to use
   * @param msg the message object which at a minimum has { message: "text here" }
   */
  ADD(state, { level, str }) {
    const id =
      (state[level].length + 1).toString() + (+new Date()).toString(36);
    let msg = {
      id: id,
      time: new Date(),
      level: level,
      text: str
    };
    // eslint-disable-next-line no-console
    console[level](`${level} #${id}: "${str}"`, msg);
    state[level].push(msg);
    Vue.prototype.$toast[level](msg.text);
  },
  /**
   * remove will remove a message from the specified log level array
   * @param state the state to operate on
   * @param level the log level to use
   * @param id the id of the message to remove
   */
  REMOVE(state, { level, index }) {
    state[level].splice(index, 1);
  }
};

const actions = {
  error({ commit }, str) {
    commit("ADD", { level: "error", str });
  },
  removeError({ commit }, index) {
    commit("REMOVE", { level: "error", index });
  },
  warn({ commit }, str) {
    commit("ADD", { level: "warn", str });
  },
  removeWarn({ commit }, index) {
    commit("REMOVE", { level: "warn", index });
  },
  info({ commit }, str) {
    commit("ADD", { level: "info", str });
  },
  removeInfo({ commit }, index) {
    commit("REMOVE", { level: "info", index });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
