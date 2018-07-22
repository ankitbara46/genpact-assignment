import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { changeSelectedDepartment, changeSelectedEmployeeId, getEmployeeDetails, clear } from '../actions/department.actions';
import './Layout.css';

class Layout extends Component {
  render() {
    const { departmentAndEmployeeIds, selectedDepartment, selectedEmployeeId, selectedEmployee, loading} = this.props;

    const departmentsOptions = departmentAndEmployeeIds.map((deptEmpIdsObj, index) => {
      return { key: deptEmpIdsObj.departmentName, text: deptEmpIdsObj.departmentName }
    });

    const selectedDeptWithEmpIds = departmentAndEmployeeIds
      .filter((deptObj) => deptObj.departmentName === selectedDepartment);

    let employeeIdsOptions = [];

    if(selectedDeptWithEmpIds && selectedDeptWithEmpIds.length > 0) {
      employeeIdsOptions = selectedDeptWithEmpIds[0].employeeIds.map((empId, index) => {
        return {
          key: empId,
          text: empId
        }
      });
    }

    return (
      <div>
      <div className="input-container">
        <div className="input-control">
        <Dropdown
          label="Department"
          id="departmentsList"
          allowFreeform={false}
          options={ departmentsOptions }
          onChanged={ this.changeSelectedDepartment }
        />
      </div>
      <div className="input-control">
        <Dropdown
          label="Employee Id"
          id="employeeIdsList"
          allowFreeform={false}
          options={ employeeIdsOptions }
          onChanged={ this.changeSelectedEmployeeId }
        />
      </div>

<div className="app-button">
        <DefaultButton
          primary={ true }
          text="Get Details"
          allowDisabledFocus={true}
          onClick={ this.getEmployeeDetails.bind(this) } />
</div>
<div className="app-button">
        <DefaultButton
          primary={ false }
          text="Clear"
          allowDisabledFocus={true}
          onClick={ this.clear.bind(this) } />
</div>
</div>
        <div>
          {
            function() {
              if(selectedEmployee) {
                return <div className="employee-info-container">
                  <img src={selectedEmployee.avatar}/>
                  <div className="employee-info">
                    <div>Id: {selectedEmployee.id}</div>
                    <div>Name: { `${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</div>
                  </div>
                </div>
              }

              else if(loading) {
                return <div className="employee-info-container"> Loading.. </div>
              }
              return null;
            }()
          }
        </div>
      </div>
    );
  }

  changeSelectedDepartment(department) {
    changeSelectedDepartment(department.text);
  }

  changeSelectedEmployeeId(employee) {
    changeSelectedEmployeeId(employee.text);
  }

  getEmployeeDetails() {
    const { selectedEmployeeId } = this.props;
    getEmployeeDetails(selectedEmployeeId);
  }

  clear() {
    clear();
  }
}

export default connect((store) => {
  return {
    departmentAndEmployeeIds: store.department.departmentAndEmployeeIds,
    selectedDepartment: store.department.selectedDepartment,
    selectedEmployeeId: store.department.selectedEmployeeId,
    selectedEmployee: store.department.selectedEmployee,
    loading: store.department.loading,
  };
})(Layout);
