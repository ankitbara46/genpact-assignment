import store from '../store';
import EVENTS from '../events';

const dispatch = store.dispatch;

const USER_API_PREFIX = 'https://reqres.in/api/users/';

export function changeSelectedDepartment(department) {
  const data = {
    type: EVENTS.CHANGE_SELECTED_DEPARTMENT,
    payload: department
  }

  dispatch(data);
}

export function changeSelectedEmployeeId(employeeId) {
  const data = {
    type: EVENTS.CHANGE_SELECTED_EMPLOYEEID,
    payload: employeeId
  }

  dispatch(data);
}

function getEmpDetails(employeeId) {
  return function (dispatch) {
    return fetch(`${USER_API_PREFIX}${employeeId}`).then(response => response.json()).then(
      employeeData => dispatch({
          type: EVENTS.GET_EMPLOYEE_DETAILS,
          payload: employeeData.data
        })
    );
  };
}

export function getEmployeeDetails(employeeId) {
  if(employeeId) {
    dispatch({
      type: EVENTS.START_LOADING,
      payload: null
    });

    dispatch(getEmpDetails(employeeId));
  }
}

export function clear() {
  const data = {
    type: EVENTS.CLEAR,
    payload: null
  }

  dispatch(data);
}
