import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import ThreeDotsButton from '../../components/ThreeDotsButton';
import ActionMenu from '../../components/ActionMenu';
import EmployeeModal from '../../components/EmployeeModal';
import { Plus } from 'lucide-react';

export const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      role: "Manager",
      status: "active",
      actions: [
        { type: "Status changed to active", date: "2024-03-15" },
        { type: "Role updated to Manager", date: "2024-03-10" },
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      role: "Employee",
      status: "active",
      actions: [
        { type: "Account created", date: "2024-03-01" },
      ]
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [modalEmployee, setModalEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleThreeDotsClick = (e, employee) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 180
    });
    setSelectedEmployee(prev => prev?.id === employee.id ? null : employee);
  };

  const handleAddEmployee = () => {
    setModalEmployee({
      id: Date.now(), // temporary ID
      name: "",
      email: "",
      phone: "",
      role: "Employee",
      status: "active",
      actions: [
        { type: "Account created", date: new Date().toISOString().split('T')[0] }
      ]
    });
    setIsEditing(true);
    setIsCreating(true);
  };

  const handleAction = (actionType, employee) => {
    switch (actionType) {
      case 'preview':
        setModalEmployee(employee);
        setIsEditing(false);
        break;
      
      case 'edit':
        setModalEmployee(employee);
        setIsEditing(true);
        break;
      
      case 'disable':
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === employee.id ? { ...emp, status: 'disabled' } : emp
          )
        );
        break;
      
      case 'activate':
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === employee.id ? { ...emp, status: 'active' } : emp
          )
        );
        break;
      
      case 'archive':
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === employee.id ? { ...emp, status: 'archived' } : emp
          )
        );
        break;
      
      case 'delete':
        setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
        break;
      
      default:
        break;
    }
  };

  const handleSaveEmployee = (updatedEmployee) => {
    if (isCreating) {
      setEmployees(prev => [...prev, updatedEmployee]);
      setIsCreating(false);
    } else {
      setEmployees(prev => 
        prev.map(emp => 
          emp.id === updatedEmployee.id 
            ? {
                ...updatedEmployee,
                actions: [
                  {
                    type: `Employee details updated`,
                    date: new Date().toISOString().split('T')[0]
                  },
                  ...(emp.actions || [])
                ]
              }
            : emp
        )
      );
    }
    setModalEmployee(null);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Employees</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all employees in your company
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={handleAddEmployee}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {employee.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {employee.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {employee.role}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : employee.status === 'disabled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <ThreeDotsButton onClick={(e) => handleThreeDotsClick(e, employee)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {selectedEmployee && (
          <div className="fixed inset-0 z-40">
            <div className="fixed inset-0" onClick={() => setSelectedEmployee(null)} />
            <ActionMenu
              position={menuPosition}
              onClose={() => setSelectedEmployee(null)}
              item={selectedEmployee}
              onAction={handleAction}
            />
          </div>
        )}

        {modalEmployee && (
          <EmployeeModal
            employee={modalEmployee}
            onClose={() => {
              setModalEmployee(null);
              setIsEditing(false);
              setIsCreating(false);
            }}
            isEditing={isEditing}
            isCreating={isCreating}
            onSave={handleSaveEmployee}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Employees;