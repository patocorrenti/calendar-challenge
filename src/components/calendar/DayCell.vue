<template>
  <div tabindex="1" @click="selectDay" class="day_cell_info">
    <div class="number">{{ dayNumber }}</div>
    <ul v-if="reminders.length">
      <li
        v-for="reminder in reminders"
        :key="reminder.id"
        class="reminder"
        :class="reminder.color"
      >
        {{ reminder.time }} -
        {{ reminder.description }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DayCell',
  props: ['date'],
  computed: {
    dateValue () {
      return this.date.toISOString().substring(0, 10)
    },
    dayNumber () {
      return this.date.getDate()
    },
    reminders () {
      return this.$store.getters.getReminders(this.dateValue)
    },
  },
  methods: {
    selectDay (value) {
      this.$store.dispatch('selectDay', this.dateValue)
    }
  }
}
</script>
