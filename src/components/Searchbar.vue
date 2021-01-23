<template>
  <v-card max-width="1024px" class="mx-auto" elevation="6" color="white">
    <v-card-actions>
      <v-row class="mt-1">
        <v-col cols="9" sm="10" md="11">
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
            @keyup="startDebounce"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-menu
            bottom
            right
            nudge-right="25px"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="float-right" icon large v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list flat subheader three-line>
              <v-subheader>Settings</v-subheader>

              <v-list-item-group multiple>
                <!--                <v-list-item @click="pagination = !pagination">-->
                <!--                  <template v-slot:default="{ active }">-->
                <!--                    <v-list-item-action>-->
                <!--                      <v-checkbox-->
                <!--                        color="accent"-->
                <!--                        :input-value="active"-->
                <!--                        v-model="pagination"-->
                <!--                        @click.prevent="pagination = !pagination"-->
                <!--                      >-->
                <!--                      </v-checkbox>-->
                <!--                    </v-list-item-action>-->

                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title>Pagination</v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                        >Use pagination instead of infinite scrolling-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </template>-->
                <!--                </v-list-item>-->
                <v-list-item @click.stop="forumPreview = !forumPreview">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox
                        color="accent"
                        :input-value="active"
                        v-model="forumPreview"
                        @click.prevent="forumPreview = !forumPreview"
                      >
                      </v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>Forum Previews</v-list-item-title>
                      <v-list-item-subtitle
                        >Show previews of forum posts on large screens
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
              <v-subheader>Actions</v-subheader>

              <v-list-item-group multiple active-class="">
                <v-list-item @click="clearCache">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-btn
                        @click="clearCache"
                        icon
                        color="success"
                        :input-value="active"
                      >
                        <v-icon>mdi-cached</v-icon>
                      </v-btn>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>Start Fresh!</v-list-item-title>
                      <v-list-item-subtitle
                        >Clear the app and search data from your device
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Searchbar",
  data: () => ({
    typingTimer: null,
    rules: {
      length: v => {
        if (v === undefined || v === null) return true;
        return v.length > 2 || "Please type more than 2 characters";
      }
    }
  }),
  methods: {
    startDebounce() {
      const isInvalid =
        this.query === null ||
        this.query === undefined ||
        this.query.length <= 2 ||
        this.query === "";

      // exit
      if (isInvalid || this.searching) return;

      // restart the timer
      if (this.typingTimer !== null) clearTimeout(this.typingTimer);

      this.typingTimer = setTimeout(() => {
        this.search();
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }, 500);
    },
    clearQuery() {
      this.query = "";
    },
    ...mapActions("search", ["search"]),
    ...mapActions("settings", ["clearCache"])
  },
  computed: {
    query: {
      get() {
        return this.$store.state.search.query;
      },
      set(v) {
        this.$store.commit("search/SET_QUERY", v);
      }
    },
    forumPreview: {
      get() {
        return this.$store.state.settings.forumPreview;
      },
      set(v) {
        this.$store.commit("settings/SET_FORUM_PREVIEW", v);
      }
    },
    pagination: {
      get() {
        return this.$store.state.settings.pagination;
      },
      set(v) {
        this.$store.commit("settings/SET_PAGINATION", v);
      }
    },
    ...mapState({
      searching: state => state.search.searching
    })
  }
};
</script>

<style scoped></style>
