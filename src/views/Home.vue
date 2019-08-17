<template>
  <div class="home">
    <time-sheet :timeSheetID="0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeSheet from '@/components/TimeSheet'

export default {
  name: 'Home',
  components: {
    TimeSheet
  },
  computed: {
    ...mapGetters([
      'timeSheets'
    ])
  }
}
</script>

<style>
.home {
  padding-top: 1rem;
}
</style>
