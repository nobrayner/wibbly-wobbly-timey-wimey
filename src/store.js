import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistance from 'vuex-persist'

Vue.use(Vuex)

function currentTime () {
  var timeNow = new Date()

  var hours = timeNow.getHours()
  var minutes = timeNow.getMinutes()
  var ampm = hours >= 12 ? 'PM' : 'AM'

  var m = (((minutes + 7.5) / 15 | 0) * 15) % 60
  var h = ((((minutes / 105) + 0.5) | 0) + hours) % 24

  h = h % 12
  h = h !== 0 ? h : 12 // the hour '0' should be '12'
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m

  var strTime = h + ':' + m + ' ' + ampm

  return strTime
}
// function getMinutesFromTextTime (time) {
//   let amPm = time.substring(5, 7)
//   let hours = parseInt(time.substring(0, 2))
//   hours = amPm.toLowerCase() === 'am' ? hours : hours + 12
//   let minutes = parseInt(time.substring(3, 5))

//   return (hours * 60) + minutes
// }
// function getDuration (start, end) {
//   if (start === undefined || end === undefined) {
//     return 0
//   }
//   let startMinutes = getMinutesFromTextTime(start)
//   let endMinutes = getMinutesFromTextTime(end)
//   return endMinutes - startMinutes
// }

const vuexLocal = new VuexPersistance({
  key: 'accent_web_timelogger',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    apiEndpoints: {
      jira: ''
    },
    timeSheets: {
      0: {
        id: 0,
        finalised: false,
        completed: false,
        timeEntries: []
      }
    },
    timeSheetIDs: [0],
    timeEntries: {},
    timeEntryIDs: []
  },
  getters: {
    timeSheets: (state) => state.timeSheetIDs.map(id => state.timeSheets[id]),
    timeSheetByID: (state) => (timeSheetID) => {
      return state.timeSheets[timeSheetID]
    },
    timeEntries: (state) => state.timeEntryIDs.map(id => state.timeEntries[id]),
    timeEntriesForTimeSheet: (state) => (timeSheetID) => {
      return state.timeSheets[timeSheetID].timeEntries.map(timeEntryID => state.timeEntries[timeEntryID])
    },
    canAddNewEntry: (state, getters) => (timeSheetID) => {
      var timeEntries = getters.timeEntriesForTimeSheet(timeSheetID)

      if (timeEntries.length === 0) {
        return true
      }

      var previousEntry = timeEntries[timeEntries.length - 1]

      if (previousEntry.ticketID !== '' && previousEntry.details !== '') {
        return true
      }

      return false
    }
  },
  mutations: {
    NEW_TIME_ENTRY (state, { timeSheetID, newEntry }) {
      state.timeSheets[timeSheetID].timeEntries = [
        ...state.timeSheets[timeSheetID].timeEntries,
        newEntry.id
      ]
      state.timeEntryIDs = [
        ...state.timeEntryIDs,
        newEntry.id
      ]
      state.timeEntries = {
        ...state.timeEntries,
        [newEntry.id]: newEntry
      }
    },
    UPDATE_TIME_ENTRY (state, { timeEntryID, property, newValue }) {
      state.timeEntries[timeEntryID][property] = newValue
    },
    REMOVE_TIME_ENTRY (state, timeEntryID) {
      let timeEntry = { ...state.timeEntries[timeEntryID] }
      let timeSheetTimeEntries = state.timeSheets[timeEntry.timeSheetID].timeEntries
      let timeEntryIDs = state.timeEntryIDs
      let timeEntries = state.timeEntries

      timeSheetTimeEntries.splice(timeSheetTimeEntries.indexOf(timeEntry.id), 1)
      timeEntryIDs.splice(timeEntryIDs.indexOf(timeEntry.id), 1)
      delete timeEntries[timeEntry.id]

      state.timeSheets[timeEntry.timeSheetID].timeEntries = [...timeSheetTimeEntries]
      state.timeEntryIDs = [...timeEntryIDs]
      state.timeEntries = { ...timeEntries }
    }
  },
  actions: {
    newEntry ({ commit, getters }, timeSheetID) {
      var timeEntries = getters.timeEntries

      var newEntry = {
        id: timeEntries.length === 0 ? 0 : timeEntries[timeEntries.length - 1].id + 1,
        timeSheetID: timeSheetID,
        timeStart: currentTime(),
        timeEnd: '',
        ticketID: '',
        details: ''
      }

      commit('NEW_TIME_ENTRY', {
        timeSheetID: timeSheetID,
        newEntry: newEntry
      })

      timeEntries = getters.timeEntriesForTimeSheet(timeSheetID)
      if (timeEntries.length >= 2) {
        let lastEntry = timeEntries[timeEntries.length - 2]
        // if (!lastEntry.timeEnd) { // May need this...
        commit('UPDATE_TIME_ENTRY', {
          timeEntryID: lastEntry.id,
          property: 'timeEnd',
          newValue: newEntry.timeStart
        })
        // }
      }
    },
    updateTimeEntry ({ commit }, payload) {
      commit('UPDATE_TIME_ENTRY', payload)
    },
    removeTimeEntry ({ commit }, timeEntryID) {
      commit('REMOVE_TIME_ENTRY', timeEntryID)
    }
  },
  plugins: [vuexLocal.plugin]
})
