<template>
  <fieldset class="time-entry">
    <button class="remove-time-entry" @click="removeTimeEntry">X</button>
    <input type="text" :name="'time_entry_start_' + timeEntry.id" maxlength="8" required
           :value="timeEntry.timeStart" @input="timeEntryUpdate('timeStart', $event)" />
    <input type="text" :name="'time_entry_end_' + timeEntry.id" maxlength="8" class="gray"
           :value="timeEntry.timeEnd" @input="timeEntryUpdate('timeEnd', $event)" />
    <input :id="'time_entry_ticket_id_' + timeEntry.id" type="text" :name="'time_entry_ticket_id_' + timeEntry.id"
           :value="timeEntry.ticketID" @input="timeEntryUpdate('ticketID', $event)" class="uppercase" required />
    <textarea :ref="'time_entry_details_' + timeEntry.id" :name="'time_entry_details_' + timeEntry.id"
              :value="timeEntry.details" @input="expand_textarea(timeEntry.id); timeEntryUpdate('details', $event)" required ></textarea>
  </fieldset>
</template>

<script>
export default {
  name: 'TimeEntry',
  props: {
    timeEntryID: {
      required: true
    }
  },
  computed: {
    timeEntry () {
      return this.$store.state.timeEntries[this.timeEntryID]
    }
  },
  methods: {
    expand_textarea (id) {
      var textarea = this.$refs['time_entry_details_' + id]
      textarea.style.height = '' /* Reset the height */
      textarea.style.height = (textarea.scrollHeight + 2) + 'px'
    },
    timeEntryUpdate (property, e) {
      this.$store.dispatch('updateTimeEntry', {
        timeEntryID: this.timeEntry.id,
        property: property,
        newValue: e.target.value
      })
    },
    removeTimeEntry () {
      this.$store.dispatch('removeTimeEntry', this.timeEntryID)
    }
  },
  mounted () {
    this.expand_textarea(this.timeEntryID)
  }
}
</script>

<style>
.time-entry {
  display: grid;
  grid-template-columns: 2em 5.5em 6.5em 10em 1fr;
}
button.remove-time-entry {
  margin: 0;
  width: 2em;
  background-color: red;
  color: white;
  border: 1px solid red;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
fieldset.time-entry:hover > button.remove-time-entry, fieldset.time-entry:focus > button.remove-time-entry {
  opacity: 1;
}
fieldset.time-entry > *:nth-child(n+3) {
  margin-left: 1em;
}
</style>
