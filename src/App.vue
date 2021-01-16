<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <v-snackbar v-model="updateAvailable" :timeout="-1" class="text-center">
        A new version of ZDS is available
        <v-btn color="success" text @click="refresh"> Update </v-btn>
      </v-snackbar>
    </v-main>
    <v-footer color="primary">
      <p class="white--text caption mx-auto mb-0">v{{ version }}</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  data: () => ({
    refreshing: false,
    registration: null,
    updateAvailable: false
  }),
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateAvailable = true;
    },
    refresh() {
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  },
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables";

html,
body,
footer,
.bg-blue {
  background-color: $zoom-blue;
}
</style>
