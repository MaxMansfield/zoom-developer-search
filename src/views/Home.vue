<template>
  <section>
    <div
      id="zds-title"
      class="text-center white--text font-weight-thin mt-6 text-h4 text-md-h2 text-lg-h2"
    >
      Zoom Developer Search
    </div>
    <v-container>
      <searchbar class="mt-6 mb-4"></searchbar>
      <results></results>
    </v-container>
  </section>
</template>

<script>
import Results from "@/components/Results";
import Searchbar from "@/components/Searchbar";

export default {
  name: "Search",
  created() {
    let query = this.$route.query.q;
    if (query === undefined || query === "") return;
    this.$store.commit("search/SET_QUERY", query);
    this.$store.dispatch("search/search").catch(e => {
      console.error(`Unable to search query ${query}`, e);
    });
  },
  components: {
    Results,
    Searchbar
  }
};
</script>
