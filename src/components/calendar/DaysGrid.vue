<template>
  <section class="days_grid" :class="{hidden : this.$store.state.calendar.selectedDay}">
    <nav class="month_nav">
      <button type="button" @click="changeMonth(-1)">&lt;</button>
      {{ currentMonth + 1 }} - {{ currentYear }}
      <button type="button" @click="changeMonth(1)">&gt;</button>
    </nav>
    <ul class="days_list">
      <li v-for="day in daysOfTheWeek" :key="day" class="list_header">
        {{ day }}
      </li>
      <li
        v-for="cell in daysGrid"
        :key="cell.key"
        class="day_cell"
        :class="{out_of_month : cell.outOfMonth, today : cell.isToday }"
      >
        <day-cell :date="cell.date" />
      </li>
    </ul>
  </section>
</template>
<script>
import DayCell from './DayCell'

export default {
  name: 'DaysGrid',
  components: {
    DayCell
  },
  data () {
    return {
      todayDate: new Date(),
      targetDate: new Date(),
      daysGrid: [],
      daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
  },
  created () {
    this.setDaysGrid()
  },
  methods: {
    setDaysGrid () {
      this.daysGrid = []
      // First day of this month (mon, thu, wed ...) If it's not 0, we'll need to append some days from the previous month
      const firstDayThisMonth = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth(), 1).getDay()
      // The day grid has 42 cells, so...
      for (let i = 1; i <= 42; i++) {
        const loopDate = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth(), i - firstDayThisMonth)
        const dateObj = {
          date: loopDate,
          key: i,
          outOfMonth: loopDate.getMonth() !== this.currentMonth,
          isToday: loopDate.setHours(0, 0, 0, 0) === this.todayDate.setHours(0, 0, 0, 0)
        }
        this.daysGrid.push(dateObj)
      }
    },
    changeMonth (val) {
      const refDate = this.targetDate
      // A new object, so it keeps it reactivity
      this.targetDate = new Date(refDate.getFullYear(), refDate.getMonth() + val, refDate.getDay())
      this.setDaysGrid()
    },
  },
  computed: {
    currentDay () {
      return this.targetDate.getDate()
    },
    currentMonth () {
      return this.targetDate.getMonth()
    },
    currentYear () {
      return this.targetDate.getFullYear()
    }
  }
}
</script>
