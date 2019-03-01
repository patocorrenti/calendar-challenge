import Vue from 'vue'

export default {
  state: {
    mockId: 1, // mock ID for this prototipe
    reminders: [],
    selectedDay: null,
  },
  getters: {
    getReminders: state => dateValue => {
      // For selectedDay if none is specified
      const dateFilter = dateValue || state.selectedDay
      const reminders = state.reminders.filter(reminder => reminder.date === dateFilter)
      // I know we could use Undescore or Loadash for this...
      function sort (a, b) {
        if (a.time < b.time) return -1
        if (a.time > b.time) return 1
        return 0
      }
      return reminders.sort(sort)
    },
  },
  mutations: {
    increaseMockId (state) {
      state.mockId++
    },
    addReminder (state, reminderData) {
      state.reminders.push(reminderData)
    },
    editReminder (state, reminderData) {
      if (!reminderData.id) return false
      const reminderEdit = state.reminders.find(reminder => reminder.id === reminderData.id)
      // I know we could use Undescore or Loadash for this...
      for (var key in reminderEdit) {
        reminderEdit[key] = reminderData[key]
      }
    },
    deleteReminder (state, reminder) {
      state.reminders.splice(state.reminders.indexOf(reminder), 1)
    },
    selectDay (state, value) {
      state.selectedDay = value || null
    }
  },
  actions: {
    addReminder (context, reminderData) {
      const cloneData = Object.assign({}, reminderData)
      // Add and increase a mock ID
      Vue.set(cloneData, 'id', context.state.mockId)
      context.commit('increaseMockId')
      context.commit('addReminder', cloneData)
    },
    editReminder ({ commit }, reminderData) {
      commit('editReminder', reminderData)
    },
    deleteReminder ({ commit }, reminder) {
      commit('deleteReminder', reminder)
    },
    selectDay ({ commit }, value) {
      commit('selectDay', value)
    }
  }
}
