import axios from "axios";
import { cacheAction } from "vuex-cache";

const state = {
  query: "",
  searching: false,
  nextPage: {},
  pages: []
};

const getters = {
  hasNextPage: state => {
    return state.nextPage !== undefined;
  }
};

const mutations = {
  /**
   * set the search query
   * @param state the state to use
   * @param query the query to set
   */
  SET_QUERY(state, query) {
    if (typeof query === "string" && query !== "") state.query = query;
  },
  /**
   * set the nextPage object used for requesting the next page of results
   * @param state the state to use
   * @param nextPage the nextPage object
   */
  SET_NEXT_PAGE(state, nextPage) {
    if (typeof nextPage === "object") state.nextPage = nextPage;
  },
  /**
   * clear the nextPage object
   * @param state the state to use
   */
  CLEAR_NEXT_PAGE(state) {
    state.nextPage = undefined;
  },
  /**
   * add a page to the pages array
   * @param state the state to use
   * @param page the page to add
   */
  ADD_PAGE(state, page) {
    if (typeof page === "object") state.pages.push(page);
  },
  /**
   * remove all pages from the pages array
   * @param state the state to use
   */
  CLEAR_PAGES(state) {
    state.pages = [];
  },
  /**
   * set if the app  is searching or not
   * @param state the state to use
   * @param isSearching if the app is searching
   */
  SET_SEARCHING(state, isSearching) {
    state.searching = isSearching;
  }
};

const actions = {
  /**
   * search calls the CSE API with the query supplied by the user
   * @param commit the object to commit mutations
   * @param dispatch the object to dispatch actions
   * @param query the query to search
   * @param useNextPage if the nextPage object should be used
   */
  search: cacheAction(
    ({ cache, commit, dispatch, getters }, useNextPage = false) => {
      let start = 0;
      useNextPage &= getters.hasNextPage;

      if (useNextPage) {
        start = state.nextPage.startIndex;
        const num = state.nextPage.num;
        const totalResults = state.nextPage.totalResults;

        const isDone = start + num > totalResults;
        const isAtLimit = start >= 100 || state.pages.length >= 10;

        if (isDone || isAtLimit) return;
      } else commit("CLEAR_PAGES");

      commit("CLEAR_NEXT_PAGE");
      if (state.query === undefined || start === undefined) return;

      commit("SET_SEARCHING", true);

      let payload = {
        q: state.query,
        start: start
      };

      cache
        .dispatch("get", payload)
        .then(r => {
          if (r.data === undefined) return;

          commit("ADD_PAGE", r.data.items);

          let nextPage = r.data.queries.nextPage;

          if (nextPage === undefined) commit("CLEAR_NEXT_PAGE");
          else commit("SET_NEXT_PAGE", nextPage[0]);

          commit("SET_SEARCHING", false);
        })
        .catch(e => {
          commit("SET_SEARCHING", false);
          commit("CLEAR_NEXT_PAGE");
          return dispatch("bus/error", e.message, {
            root: true
          });
        });
    }
  ),
  get(_, { q, start }) {
    const endpoint = "https://www.googleapis.com/customsearch/v1";
    const key = process.env.VUE_APP_API_KEY;
    const cx = process.env.VUE_APP_CX;

    return axios.get(endpoint, {
      params: {
        q,
        start,
        cx,
        key
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
