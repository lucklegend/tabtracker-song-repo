<template>
  <panel title="Youtube Video" class="ml-2" >
    <v-layout>
      <v-flex>
        <youtube
          :video-id="youtubeId"
          :player-width="700"
          :player-height="340">
        </youtube>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>

export default {
  props: [
    'youtubeId'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
