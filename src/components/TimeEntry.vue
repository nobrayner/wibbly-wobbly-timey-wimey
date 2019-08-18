<template>
  <section class="time-entry">
    <button :ref="'time_entry_rm_' + timeEntry.id" class="remove-time-entry" @click="removeTimeEntry">X</button>
    <input type="text" :name="'time_entry_start_' + timeEntry.id" maxlength="8" class="time-start" required
           :value="timeEntry.timeStart" @input="timeEntryUpdate('timeStart', $event)" />
    <input type="text" :name="'time_entry_end_' + timeEntry.id" maxlength="8" class="gray time-end"
           :value="timeEntry.timeEnd" @input="timeEntryUpdate('timeEnd', $event)" />
    <input :id="'time_entry_ticket_id_' + timeEntry.id" type="text" :name="'time_entry_ticket_id_' + timeEntry.id"
           :value="timeEntry.ticketID" @input="timeEntryUpdate('ticketID', $event)" class="uppercase ticket-id" required />
    <textarea :ref="'time_entry_details_' + timeEntry.id" :name="'time_entry_details_' + timeEntry.id" class="details"
              :value="timeEntry.details" @input="expand_textarea(timeEntry.id); timeEntryUpdate('details', $event)" required ></textarea>
  </section>
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
</style>
