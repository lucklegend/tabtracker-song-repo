<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :option="pagination"
      :items="bookmarks"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        {{props.item.song.title}}
      </td>
      <td class="text-xs-right">
        {{props.item.artist}}
      </td>
    </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'Song.title'
        },
        {
          text: 'Artist',
          value: 'Song.artist'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
