<template>
  <panel title="Songs Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{ song.title }}
        </div>
        <div class="song-artist">
          {{ song.artist }}
        </div>
        <div class="song-genre">
          {{ song.genre }}
        </div>
        <v-btn
          color="cyan"
          elevation="2"
          dark
          :to="{
            name: 'song-edit',
            params () {
              return{
                songId: song.id
              }
            }
          }"
        >
        Edit
        </v-btn>

        <v-btn
          v-if="$store.state.isUserLoggedIn && !bookmark"
          color="cyan"
          elevation="2"
          dark
          @click="setAsBookmark"
        >
        Set As Bookmark
        </v-btn>

        <v-btn
          v-if="$store.state.isUserLoggedIn && bookmark"
          color="cyan"
          elevation="2"
          dark
          @click="unsetAsBookmark"
        >
        Unset Bookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImage"/><br>
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
        })).data
        console.log('bookmark', bookmarks)
        if (bookmarks.length) {
          console.log('this.bookmark', this.bookmark)
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log('mounted', err)
      }
    }
  },

  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
        console.log('setAsBookmark', this.bookmark)
      } catch (err) {
        console.log('setAsBookmark', err)
      }
    },
    async unsetAsBookmark () {
      try {
        console.log('this.bookmark.id', this.bookmark.id)
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log('unsetAsBookmark', err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding:20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width:70%;
  margin: 0 auto;
}
</style>
