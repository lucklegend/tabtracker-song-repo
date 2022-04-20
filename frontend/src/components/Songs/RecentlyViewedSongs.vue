<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :option="pagination"
      :items="histories"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        {{props.item.title}}
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
import SongHistoryService from '@/services/SongHistoryService'

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
      histories: []
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
      this.histories = (await SongHistoryService.index()).data
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
