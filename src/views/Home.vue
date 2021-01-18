<template>
  <section>
    <div
      id="zds-title"
      class="text-center white--text font-weight-thin mt-lg-6 mt-4 text-md-h2 text-lg-h2 text-h5"
    >
      Zoom Developer Search
    </div>
    <v-container id="root">
      <v-row>
        <v-col>
          <searchbar class="mt-lg-6 mt-2 mb-4"></searchbar>
          <results></results>
          <v-fab-transition>
            <v-btn
              v-show="showScrollBtn"
              color="accent"
              dark
              fixed
              bottom
              right
              fab
              @click="$vuetify.goTo(0)"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
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
    this.$store.dispatch("search/search");
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  },
  components: {
    Results,
    Searchbar
  },
  data: () => ({
    showScrollBtn: false
  }),
  methods: {
    scroll() {
      this.showScrollBtn = window.scrollY > 50;
    }
  }
};
</script>
