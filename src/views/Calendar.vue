<template>
  <div class="calendar">
    <day-detail/>
    <days-grid/>
  </div>
</template>

<script>
import DaysGrid from '@/components/calendar/DaysGrid'
import DayDetail from '@/components/calendar/DayDetail'

export default {
  name: 'Calendar',
  components: {
    DaysGrid,
    DayDetail
  }
}
</script>
