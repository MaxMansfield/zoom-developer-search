import { cacheAction } from "vuex-cache";

const state = {
  pagination: false
};

const mutations = {
  /**
   * Enables/disables pagination
   * @param state the state to manipulate
   * @param isEnabled set to true to enable pagination
   */
  SET_PAGINATION(state, isEnabled) {
    if (typeof isEnabled === "boolean") state.pagination = isEnabled;
  }
};

const actions = {
  clearCache: cacheAction(({ cache, dispatch }) => {
    // Clear the vuex-cache
    cache.clear();

    // Clear the service-worker cache
    caches
      .keys()
      .then(function(names) {
        for (let name of names)
          caches.delete(name).catch(e => {
            return dispatch("bus/error", e.message, { root: true });
          });

        //refresh the page without the cache
        window.location.reload(true);
      })
      .catch(e => {
        return dispatch("bus/error", e.message, { root: true });
      });
  })
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
