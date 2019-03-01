<template>
  <div class="day_detail" :class="{hidden}">
    <reminder-form ref="reminderForm" />
    <section>
      <div class="controls">
        <button type="button" @click="openForm()" class="add">
          Add reminder
        </button>
        <button type="button" @click="close()" class="close">
          Close
        </button>
      </div>
      <h2 class="selected_day">{{ selectedDay }}</h2>
      <ul v-if="dayReminders.length" class="reminder_list">
        <li v-for="reminder in dayReminders" :key="reminder.id" class="reminder" :class="reminder.color">
          {{ reminder.time }} - {{ reminder.description }}
          <div class="actions">
            <button type="button" @click="deleteReminder(reminder)">
              Delete
            </button>
            <button type="button" @click="openForm(reminder)">
              Edit
            </button>
          </div>
        </li>
      </ul>
      <div v-else class="no_reminders">
        No reminders scheduled for this day
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'DayDetail',
}
</script>
<script>
import ReminderForm from './ReminderForm'

export default {
  name: 'DayDetail',
  components: {
    ReminderForm
  },
  computed: {
    dayReminders () {
      return this.$store.getters.getReminders(this.dateValue)
    },
    selectedDay () {
      return this.$store.state.calendar.selectedDay
    },
    hidden () {
      return !Boolean(this.selectedDay)
    }
  },
  methods: {
    close () {
      this.showForm = false
      this.$store.dispatch('selectDay')
    },
    openForm (reminder) {
      this.$refs.reminderForm.open(reminder)
    },
    deleteReminder (reminder) {
      this.$store.dispatch('deleteReminder', reminder)
    }
  }
}
</script>
