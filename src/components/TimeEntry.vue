<template>
  <section class="time-entry">
    <button :ref="'time_entry_rm_' + timeEntry.id" class="remove-time-entry" @click="removeTimeEntry">X</button>

    <label :for="'time_entry_start_' + timeEntry.id" class="title time-start-label">Start</label>
    <input type="text" :name="'time_entry_start_' + timeEntry.id" maxlength="8" class="time-start" required
           :value="timeEntry.timeStart" @input="timeEntryUpdate('timeStart', $event)" />

    <label :for="'time_entry_end_' + timeEntry.id" class="title time-end-label">End</label>
    <input type="text" :name="'time_entry_end_' + timeEntry.id" maxlength="8" class="gray time-end"
           :value="timeEntry.timeEnd" @input="timeEntryUpdate('timeEnd', $event)" />

    <label :for="'time_entry_ticket_id_' + timeEntry.id" class="title ticket-id-label">Ticket ID</label>
    <input :id="'time_entry_ticket_id_' + timeEntry.id" type="text" :name="'time_entry_ticket_id_' + timeEntry.id"
           :value="timeEntry.ticketID" @input="timeEntryUpdate('ticketID', $event)" class="uppercase ticket-id" required />

    <label :for="'time_entry_details_' + timeEntry.id" class="title details-label">Details</label>
    <e-textarea :refkey="'time_entry_details_' + timeEntry.id" :name="'time_entry_details_' + timeEntry.id" :value="timeEntry.details"
                @input="timeEntryUpdate('details', $event)" :required="true" />
  </section>
</template>

<script>
import ETextArea from './ExpandingTextArea.vue'

export default {
  name: 'TimeEntry',
  components: {
    'e-textarea': ETextArea
  },
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
  }
}
</script>

<style scoped>
label {
  padding: 0.5em;
  color: #777777;
}
input, textarea {
  vertical-align: top;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}
input:hover, input:focus, textarea:hover, textarea:focus {
  border-color: #999999;
}
input:not(:valid), textarea:not(:valid) {
  border-color: red;
}
.gray {
  color: #999999;
}
.uppercase {
  text-transform: uppercase;
}
button.remove-time-entry {
  grid-area: x;
  margin: 0;
  width: 2em;
  height: 100%;
  background-color: red;
  color: white;
  border: 1px solid red;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}
.time-entry:hover > button.remove-time-entry, .time-entry:focus > button.remove-time-entry {
  color: white;
  opacity: 1;
  border-color: red;
  pointer-events: auto;
}
.time-start {
  grid-area: s;
}
.time-end {
  grid-area: e;
}
.ticket-id {
  grid-area: t;
}
.details {
  grid-area: d;
}

.time-entry {
  display: grid;
  grid-template-columns: 2em minmax(5.5em, 2.25fr) minmax(6.5em, 3.25fr) minmax(10em, 5fr);
  grid-template-areas:
    "x sl el tl"
    "x s  e  t "
    "x dl .  . "
    "x d  d  d ";
  margin-bottom: 1em;
}
.time-start-label {
  grid-area: sl;
}
.time-end-label {
  grid-area: el;
}
.ticket-id-label {
  grid-area: tl;
}
.details-label {
  grid-area: dl;
}

@media screen and (min-width: 754px) {
  .time-entry {
    grid-template-columns: 2em 5.5em 6.5em 10em 1fr;
    grid-template-areas:
      "x s e t d"
  }
  .time-entry > input:nth-child(n+4), .time-entry > textarea {
    margin-left: 1em;
  }
  .time-start-label, .time-end-label, .ticket-id-label, .details-label {
    visibility: hidden;
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
}
</style>
