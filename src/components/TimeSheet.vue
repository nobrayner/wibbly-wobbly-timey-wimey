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

<style scoped>
button {
  background-color: white;
  border: 1px dotted #999999;
  margin: 1em 0;
  width: 100%;
}
button:disabled {
  color: #999999;
  cursor: not-allowed;
}
button:not(:disabled):hover {
  color: #2c3e50;
  cursor: pointer;
  border-color: #2c3e50;
}
.timesheet footer {
  padding: 0 0.5em;
}
.title {
  font-weight: bold;
  display: inline-block;
  font-size: 1.1em;
}
.timesheet section.time-entries {
  margin-left: -2em;
}
p.no_data {
  padding: 0 0.5em;
  line-height: 1.5em;
  color: #999999;
}
button.update-timelogs {
  background-color: hsl(134, 61%, 41%);
  color: white;
  border: 1px solid hsl(134, 61%, 41%);
}
button.update-timelogs:not(:disabled):hover {
  color: white;
  border-color: hsl(134, 61%, 36%);
  background-color: hsl(134, 61%, 36%);
}
button.update-timelogs:disabled {
  color: #999999;
  background-color: hsl(134, 61%, 60%);
  border-color: hsl(134, 61%, 60%);
}
</style>
