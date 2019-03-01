import { shallowMount, config } from '@vue/test-utils'
import DayCell from '@/components/calendar/DayCell.vue'


const mockDate = new Date(2019, 2, 1)
config.mocks.$store = {
  getters: {
    getReminders () {
      return [
        { id: 1, description: 'test', time: '12:30', color: 'red' },
        { id: 2, description: 'test2', time: '20:00', color: 'blue' },
      ]
    }
  }
}

describe('DayCell component', () => {

  const wrapper = shallowMount(DayCell, {
    propsData: { date: mockDate }
  })

  it('Get the day number', () => {
    expect(wrapper.find('.number').text()).toBe('1')
  })

  it('Get the reminders from the store', () => {
    expect(wrapper.findAll('.reminder').length).toBe(2)
    expect(wrapper.find('.reminder').text()).toContain('12:30' && 'test')
  })

})
