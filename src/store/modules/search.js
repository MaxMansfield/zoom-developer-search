import axios from "axios";
import { cacheAction } from "vuex-cache";

const state = {
  query: "",
  searching: false,
  nextPage: {},
  pages: []
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
   * @param isNextPage if the nextPage object should be used
   */
  search: cacheAction(({ cache, commit, dispatch }, useNextPage = false) => {
    const KEY = process.env.VUE_APP_API_KEY;
    const CX = process.env.VUE_APP_CX;
    let URL = `https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${CX}`;

    if (useNextPage) {
      let start = state.nextPage.startIndex;
      let num = state.nextPage.count;

      if (start >= 100 || state.pages.length === 10) {
        return;
      } else {
        URL += `&start=${start}&num=${num}`;
        commit("SET_QUERY", state.nextPage.searchTerms);
      }
    } else {
      commit("CLEAR_PAGES");
    }

    URL += `&q=${state.query}`;

    commit("SET_SEARCHING", true);

    cache
      .dispatch("request", URL)
      .then(r => {
        commit("ADD_PAGE", r.data.items);

        let nextPage = r.data.queries.nextPage;
        if (nextPage !== undefined) commit("SET_NEXT_PAGE", nextPage[0]);

        commit("SET_SEARCHING", false);
      })
      .catch(e => {
        commit("SET_SEARCHING", false);
        dispatch("bus/error", e.message, {
          root: true
        });
      });
  }),
  request(_, URL) {
    return axios.get(URL);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
