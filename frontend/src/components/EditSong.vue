<template>
  <v-layout mt-16>
    <v-flex xs4>
      <panel title="Songs Metadata">
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Title"
                  placeholder="Title"
                  required
                  :rules="[required]"
                  v-model="song.title"
                />
                <v-text-field
                  label="Artist"
                  placeholder="Artist"
                  required
                  :rules="[required]"
                  v-model="song.artist"
                />
                <v-text-field
                  label="Genre"
                  placeholder="Genre"
                  required
                  :rules="[required]"
                  v-model="song.genre"
                />
                <v-text-field
                  label="Album"
                  placeholder="Album"
                  required
                  :rules="[required]"
                  v-model="song.album"
                />
                <v-text-field
                  label="Album Image URL"
                  placeholder="Album Image"
                  required
                  :rules="[required]"
                  v-model="song.albumImage"
                />
                <v-text-field
                  label="Youtube ID"
                  placeholder="Youtube ID"
                  required
                  :rules="[required]"
                  v-model="song.youtubeId"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-textarea
          label="Tab"
          placeholder="Tab"
          required
          :rules="[required]"
          v-model="song.tab"
          rows="5"
        />
        <v-textarea
          label="Lyrics"
          placeholder="Lyrics"
          required
          :rules="[required]"
          v-model="song.lyrics"
          rows="5"
        />
      </panel>
      <v-layout class="ml-4 mt-11">
        <v-alert
          dense
          text
          v-if="error"
          type="error"
          v-html="error"
        />
        <v-btn
          color="cyan"
          elevation="2"
          dark
          @click="save"
        >
        Save Song
        </v-btn>
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || 'Required.',
      error: null
    }
  },
  methods: {
    async save () {
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      // call api.post
      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
      console.log(this.song)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
