<template>
  <div class="reminder_form" :class="{hidden}">
    <section>
      <header class="form_header">
        <h2 v-if="this.reminderData.id">Edit reminder</h2>
        <h2 v-else>Add new reminder</h2>
      </header>
      <form @submit.prevent="submitReminder">
        <fieldset class="date">
          <label class="row">
            <div class="box_label">Date</div>
            <input v-model="reminderData.date" type="date" class="box" required>
          </label>
          <label class="row">
            <div class="box_label">Hour</div>
            <input v-model="reminderData.time" type="time" class="box" required>
          </label>
        </fieldset>
        <label class="row">
          <div class="box_label">Description ({{ reminderData.description.length }} / 30)</div>
          <input v-model="reminderData.description" type="text" maxlength="30" class="box" required>
        </label>
        <fieldset class="color_selector">
          <legend class="box_label">Color</legend>
          <label v-for="color in availableColors" :key="color.value" class="reminder" :class="color.value">
            <input type="radio" :value="color.value" v-model="reminderData.color">
            {{ color.name }}
          </label>
        </fieldset>
        <div class="controls">
          <button type="button" @click="close">
            Cancel
          </button>
          <button type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
    <div class="black_background" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'ReminderForm',
  data () {
    return {
      hidden: true,
      reminderData: {
        id: null,
        description: '',
        date: '',
        time: '',
        color: '',
      },
      availableColors: [
        { name: 'Red', value: 'red' },
        { name: 'Purple', value: 'purple' },
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' },
      ]
    }
  },
  computed: {
    defaultColor () {
      return this.availableColors[0].value
    }
  },
  methods: {
    open (reminder) {
      this.resetData()
      if (!reminder) {
        // default values for new reminders
        this.reminderData.date = this.$store.state.calendar.selectedDay
        this.reminderData.color = this.defaultColor
      } else {
        // edit existent reminder (clone data)
        this.reminderData = Object.assign({}, reminder)
      }
      this.hidden = false
    },
    close () {
      this.hidden = true
    },
    resetData () {
      // Reset data
      this.reminderData.id = null
      this.reminderData.description = ''
      this.reminderData.date = ''
      this.reminderData.time = ''
      this.reminderData.color = this.defaultColor
    },
    submitReminder () {
      if (!this.reminderData.id) {
        this.$store.dispatch('addReminder', this.reminderData)
      } else {
        this.$store.dispatch('editReminder', this.reminderData)
      }
      this.close()
    },
  }
}
</script>
