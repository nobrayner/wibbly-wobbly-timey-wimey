<template>
  <main class="timesheet">
    <header>
      <h2 class="title">Start</h2>
      <h2 class="title">End</h2>
      <h2 class="title">Ticket</h2>
      <h2 class="title">Details</h2>
    </header>
    <section v-if="hasEntries" class="time-entries">
      <time-entry v-for="timeEntry in timeSheet.timeEntries" :key="timeEntry" :timeEntryID="timeEntry" />
    </section>
    <section v-else>
      <p class="no_data">Please click the "+ New Entry" button to add a time entry</p>
    </section>
    <footer>
      <button @click="newEntry" :disabled="!canAddNewEntry(this.timeSheetID)">+ New Entry</button>
      <button class="update-timelogs" @click="finaliseTimesheet()" :disabled="!canAddNewEntry(this.timeSheetID)">Finalise Timesheet</button>
    </footer>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeEntry from '@/components/TimeEntry'

export default {
  name: 'TimeSheet',
  components: {
    TimeEntry
  },
  props: {
    timeSheetID: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['canAddNewEntry']),
    timeSheet () {
      return this.$store.state.timeSheets[this.timeSheetID]
    },
    hasEntries: function () {
      return this.timeSheet.timeEntries.length > 0
    }
  },
  methods: {
    newEntry () {
      this.$store.dispatch('newEntry', this.timeSheetID)
      setTimeout(() => {
        document.getElementById('time_entry_ticket_id_' + this.timeSheet.timeEntries[this.timeSheet.timeEntries.length - 1]).focus()
      }, 1)
    },
    finaliseTimesheet () {
      this.$router.push('finalise')
    }
  }
}
</script>

<style>
</style>
