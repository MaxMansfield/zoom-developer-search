<template>
  <section>
    <v-app-bar height="100%" color="primary" flat fixed class="pb-0">
      <v-container class="pb-0" fluid>
        <v-row class="mt-2">
          <v-col>
            <transition-group name="slide-fade">
              <div
                v-if="!showScrollBtn"
                key="1"
                id="zds-title"
                ref="zds-title"
                class="text-center white--text font-weight-thin text-md-h2 text-lg-h2 text-h5 mt-lg-12 mb-2 mb-lg-4 "
              >
                Zoom Developer Search
              </div>
              <searchbar id="searchbar" key="2"></searchbar>
            </transition-group>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-container id="root" class="mt-12 pt-12">
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
    showScrollBtn: false
  }),
  methods: {
    scroll() {
      const threshold = 100;
      this.showScrollBtn = window.scrollY > threshold;
    }
  }
};
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.25s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-35px);
  opacity: 0;
}
</style>
