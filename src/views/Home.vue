<template>
  <section>
    <v-app-bar
      height="100%"
      color="primary"
      flat
      fixed
      :scroll-threshold="threshold"
      hide-on-scroll
      class="pb-0 mb-0"
    >
      <v-container class="pb-0 mb-0" fluid>
        <transition name="slide-fade" translate="yes">
          <div
            v-if="!showScrollBtn"
            id="zds-title"
            ref="zds-title"
            class="text-center white--text font-weight-thin text-md-h2 text-lg-h2 text-h5 mt-lg-12 mb-2"
          >
            Zoom Developer Search
          </div>
        </transition>

        <searchbar id="searchbar" key="2"></searchbar>
      </v-container>
    </v-app-bar>

    <v-container id="root">
      <v-row>
        <v-col>
          <results id="results"></results>
          <v-fab-transition>
            <v-btn
              id="scroll-to-top"
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
    showScrollBtn: false,
    threshold: 100
  }),
  methods: {
    scroll() {
      const scroll = window.scrollY;
      this.showScrollBtn = scroll > this.threshold;
    }
  }
};
</script>

<style>
#root {
  margin-top: 5%;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.05s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-35px);
  opacity: 0;
}
</style>
