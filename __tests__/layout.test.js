import {changeSelectedDepartment} from '../src/js/actions/department.action';
import {EVENTS} from '../src/js/events';
​

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: EVENTS.CHANGE_SELECTED_DEPARTMENT,
      '1'
    }
    expect(changeSelectedDepartment('1')).toEqual(expectedAction)
  })
})
