const state = {
  sources: {
    marketplace: true,
    forum: true,
    help: true
  }
};

const mutations = {
  /**
   * Enables/disables the Marketplace as a search source
   * @param state the state to manipulate
   * @param isEnabled set to false to disable the marketplace source
   */
  SET_MARKETPLACE_SOURCE(state, isEnabled) {
    if (typeof isEnabled === "boolean") state.sources.marketplace = isEnabled;
  },
  /**
   * Enables/disables the Forum as a search source
   * @param state the state to manipulate
   * @param isEnabled set to false to disable the forum source
   */
  SET_FORUM_SOURCE(state, isEnabled) {
    if (typeof isEnabled === "boolean") state.sources.forum = isEnabled;
  },
  /**
   * Enables/disables the help as a search source
   * @param state the state to manipulate
   * @param isEnabled set to false to disable the help source
   */
  SET_HELP_SOURCE(state, isEnabled) {
    if (typeof isEnabled === "boolean") state.sources.help = isEnabled;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
