<template>
  <panel title="Songs">
    <v-btn
      slot="action"
      color="cyan accent-2"
      fab
      light
      small
      absolute
      right
      middle
      :to="{name: 'songs-create'}"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <div
      v-for="song in songs"
      :key="song.id"
      class="song"
    >
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
            dark
            color="cyan"
            :to="{
              name: 'song',
              params: { songId: song.id }
            }"
          >
            View Song
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image" :src="song.albumImage"/>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  },
  async mounted () {
    // do a request to the backend for all the songs
    this.songs = (await SongsService.index()).data
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
