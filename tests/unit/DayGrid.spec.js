import { shallowMount, config } from '@vue/test-utils'
import DaysGrid from '@/components/calendar/DaysGrid.vue'

const mockDate = new Date(2018, 7, 25)
const todayDate = new Date()
// config.mocks.$store = {}
config.mocks.$store = {
  state: {
    calendar: {
      selectedDay: ''
    }
  }
}

describe('DaysGrid component', () => {

  const wrapper = shallowMount(DaysGrid)

  wrapper.setData({ todayDate: todayDate })
  wrapper.setData({ targetDate: mockDate })

  // Month navigation
  const montNav = wrapper.find('.month_nav')
  it('Display the target month and year', () => {
    expect(montNav.text()).toContain('8 - 2018')
  })
  it('Change month with the nav bar', () => {
    wrapper.find('button').trigger('click')
    expect(montNav.text()).toContain('7 - 2018')
  })

  // Grid
  it('Display the grid of 42 days', () => {
    expect(wrapper.findAll('.day_cell').length).toBe(42)
  })

})
