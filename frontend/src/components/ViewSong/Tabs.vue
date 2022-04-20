<template>
  <panel title="Tab" class="ml-2">
    <textarea
      readonly
      v-model="song.tab"
      rows="5"
    ></textarea>
  </panel>
</template>

<script>

export default {
  props: [
    'song'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

textarea {
  width:100%;
  font-family: monospace;
  font-size: medium;
  border:none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding:20px;
}
</style>
