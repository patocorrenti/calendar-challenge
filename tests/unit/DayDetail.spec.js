import { shallowMount, config } from '@vue/test-utils'
import DayDetail from '@/components/calendar/DayDetail.vue'

// config.mocks.$store = {}
config.mocks.$store = {
  state: {
    calendar: {
      selectedDay: '2019-01-25'
    }
  },
  getters: {
    getReminders () {
      return [
        { id: 1, description: 'test', time: '12:30', color: 'red' },
        { id: 2, description: 'test2', time: '20:00', color: 'blue' },
      ]
    }
  }
}

describe('DayDetail component', () => {

  const wrapper = shallowMount(DayDetail)

  it('Get selected day from the store', () => {
    expect(wrapper.find('.selected_day').text()).toBe('2019-01-25')
  })

  it('Get reminders from the store', () => {
    expect(wrapper.findAll('.reminder').length).toBe(2)
    expect(wrapper.find('.reminder').text()).toContain('12:30' && 'test')
  })

})
