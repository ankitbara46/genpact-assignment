import EVENTS from '../events';

export default function reducer(state = {
  departmentAndEmployeeIds: [{
    departmentName: 'HR',
    employeeIds: [1, 2, 3, 4, 5]
  }, {
    departmentName: 'ENGINEERING',
    employeeIds: [6, 7, 8, 9, 10]
  }],
  selectedDepartment: undefined,
  selectedEmployeeId: undefined,
  selectedEmployee: null,
  loading: false
}, action) {
  let newState;
  switch (action.type) {
    case EVENTS.CHANGE_SELECTED_DEPARTMENT:
      newState = Object.assign({}, state, {
        selectedDepartment: action.payload
      });
      break;

    case EVENTS.CHANGE_SELECTED_EMPLOYEEID:
      newState = Object.assign({}, state, {
        selectedEmployeeId: action.payload,
        selectedEmployee: null
      });
      break;

    case EVENTS.GET_EMPLOYEE_DETAILS:
      newState = Object.assign({}, state, {
        selectedEmployee: action.payload,
        loading: false
      });
      break;

    case EVENTS.CLEAR:
      newState = Object.assign({}, state, {
        selectedEmployee: null
      });
      break;

    case EVENTS.START_LOADING:
      newState = Object.assign({}, state, {
        loading: true
      });
      break;

    default:
      newState = state;
  }
  return newState;
}
