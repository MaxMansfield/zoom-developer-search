import Vue from "vue";
import Vuetify, { VSnackbar, VBtn, VIcon } from "vuetify/lib";
import VuetifyToast from "vuetify-toast-snackbar";

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#2D8CFF",
        secondary: "#F2F2F7",
        accent: "#F26D21",
        error: "#E02828",
        background: "#2D8CFF"
      }
    }
  }
};

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});

const V = new Vuetify(opts);

export default V;

Vue.use(VuetifyToast, {
  $vuetify: V.framework,
  x: "center",
  timeout: 10000,
  //showClose: true,
  closeIcon: "mdi-close",
  closeText: ""
});
