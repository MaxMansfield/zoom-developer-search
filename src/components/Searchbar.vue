<template>
  <v-card max-width="1024px" class="mx-auto" color="white">
    <v-card-actions>
      <v-text-field
        :loading="searching"
        :rules="[rules.length]"
        @click:clear="clearQuery"
        autocomplete="off"
        autofocus
        clearable
        label="Search"
        prepend-icon="mdi-magnify"
        required
        return-object
        v-model="query"
      ></v-text-field>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Searchbar",
  data: () => ({
    typingTimer: null,
    query: "",
    rules: {
      length: v => {
        if (v === undefined || v === null) return true;
        return v.length >= 2 || "Please type more than 2 characters";
      }
    }
  }),
  methods: {
    clearQuery() {
      this.query = "";
    },
    ...mapActions("search", ["search"])
  },
  computed: {
    ...mapState({
      searching: state => state.search.searching
    })
  },
  watch: {
    query(val) {
      const isInvalid =
        val === null || val === undefined || val.length <= 2 || val === "";

      // exit
      if (isInvalid || this.searching) return;

      // restart the timer
      if (this.typingTimer !== null) {
        clearTimeout(this.typingTimer);
      }

      this.typingTimer = setTimeout(() => {
        this.$store.commit("search/SET_QUERY", val);
        this.search();
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }, 250);
    }
  }
};
</script>

<style scoped></style>
