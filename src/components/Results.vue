<template>
  <div
    v-infinite-scroll="scroll"
    infinite-scroll-disabled="searching"
    infinite-scroll-distance="25"
    class="spaced"
  >
    <div v-for="(page, i) in pages" :key="i">
      <v-card
        max-width="1024"
        color="blue-grey"
        :key="i + 'card'"
        class="mx-auto"
      >
        <v-list v-if="page !== undefined" three-line class="py-0">
          <template v-for="(post, index) in page">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title class="text-wrap text-body-1 mb-xs-4"
                      ><a
                        class="text--darken-4"
                        :href="post.link"
                        v-html="`${post.htmlTitle}`"
                      ></a
                    ></v-list-item-title>
                    <a
                      :href="post.link"
                      class="caption grey--text d-none d-sm-flex"
                      v-html="`${post.htmlFormattedUrl}`"
                    >
                    </a>
                    <v-list-item-subtitle
                      class="text-wrap text-break body-2 mt-1"
                      v-html="`${post.htmlSnippet.replace('<br>', '')}`"
                    >
                    </v-list-item-subtitle>
                  </v-col>
                  <v-col
                    v-if="isDevTopic(post)"
                    cols="1"
                    xs="0"
                    class="d-none d-sm-flex"
                  >
                    <v-list-item-action>
                      <v-badge
                        bordered
                        color="error"
                        :content="getComments(post).length"
                        overlap
                      >
                        <v-menu
                          transition="slide-x-transition"
                          bottom
                          right
                          open-on-hover
                          :close-on-content-click="false"
                          offset-x
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              @click.prevent.stop=""
                              icon
                              :disabled="!isDevTopic(post)"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon
                                large
                                :color="isDevTopic(post) ? 'blue-grey' : 'grey'"
                                >mdi-comment
                              </v-icon>
                            </v-btn>
                          </template>

                          <v-card class="ma-0 pa-0" tile>
                            <v-virtual-scroll
                              bench="1"
                              :items="getComments(post)"
                              :height="Math.min(countComments(post) * 150, 640)"
                              width="500"
                              item-height="150"
                            >
                              <template v-slot:default="{ item, index }">
                                <v-list-item
                                  :key="item.pos"
                                  class="text-wrap text-break ma-0 pa-0"
                                >
                                  <v-list-item-content class="ma-0 pa-0">
                                    <v-alert
                                      class="subtitle-2 ma-0"
                                      tile
                                      width="100%"
                                      height="150"
                                      text
                                      dense
                                      icon="mdi-account"
                                      color="blue-grey"
                                      @click="openLink(item.link)"
                                    >
                                      <v-list-item-title class="clickable mx-0">
                                        <span class="caption text-right">
                                          #{{ index + 1 }} from
                                          {{ item.date | moment }}
                                        </span>
                                      </v-list-item-title>
                                      <v-list-item-subtitle
                                        class="clickable text-wrap text-break"
                                      >
                                        <div>
                                          {{ item.body }}
                                        </div>
                                      </v-list-item-subtitle>
                                    </v-alert>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-virtual-scroll>
                          </v-card>
                        </v-menu>
                      </v-badge>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index < page.length - 1"
              :key="index + post.cacheId"
            ></v-divider>
          </template>
        </v-list>
      </v-card>

      <div
        v-if="i < 9"
        :key="i + 'page'"
        class="text-center white--text font-weight-thin mt-6 mb-6 text-h4"
      >
        <v-progress-circular
          v-if="searching && i + 1 === pages.length"
          :width="1"
          color="white"
          indeterminate
        ></v-progress-circular>
        <span v-else-if="pages[i] !== undefined && pages.length !== i + 1"
          >Page {{ i + 2 }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Results",
  methods: {
    scroll() {
      if (
        !this.searching &&
        this.pages.length !== 0 &&
        this.pages.length < 10 &&
        this.nextPage !== undefined
      ) {
        this.search(true);
      }
    },
    openLink(link) {
      window.open(link, "_blank");
    },
    countComments(item) {
      return this.getComments(item).length;
    },
    getComments(item) {
      let posts = item.pagemap.discussionforumposting;
      if (posts === undefined) return 0;

      let ret = [];

      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let invalid = post.articlebody === undefined;

        invalid |= post.mainentityofpage === undefined;
        invalid |= post.datepublished === undefined;
        invalid |= post.position === undefined;

        if (invalid) continue;

        const pos = post.position.replace("#", "");
        ret.push({
          image: post.cse_image,
          body: post.articlebody,
          date: post.datepublished,
          pos: pos,
          link: `${post.mainentityofpage}/${pos}`
        });
      }

      return ret;
    },
    isDevTopic(post) {
      return post.link.startsWith("https://devforum.zoom.us/t/");
    },
    ...mapActions("search", ["search"])
  },
  computed: {
    ...mapGetters("search", ["hasNextPage"]),
    ...mapState({
      searching: state => state.search.searching,
      pages: state => state.search.pages,
      nextPage: state => state.search.nextPage
    })
  },
  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style lang="scss">
a,
.clickable {
  text-decoration: none;

  &:visited {
    color: grey;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.v-icon:hover {
  text-decoration: none;
}

.spaced {
  margin-top: 8vh;
}
</style>
