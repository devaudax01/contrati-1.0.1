import { X } from 'lucide-react';

const EmployeeModal = ({ employee, onClose, isEditing, onSave, isCreating }) => {
  const roles = ["Manager", "Employee", "Admin", "Supervisor"];
  const statuses = ["active", "disabled", "archived"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedEmployee = {
      ...employee,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      status: formData.get('status'),
    };
    onSave(updatedEmployee);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg w-full max-w-2xl shadow-xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {isCreating ? 'Add New Employee' : isEditing ? 'Edit Employee' : 'Employee Details'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        defaultValue={isCreating ? '' : employee.name}
                        readOnly={!isEditing}
                        required={isCreating}
                        placeholder={isCreating ? "Enter employee name" : ""}
                        className={`w-full rounded-lg border ${
                          isEditing 
                            ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                            : 'border-gray-200 bg-gray-50'
                        } px-3 py-2`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      {isEditing ? (
                        <select
                          name="role"
                          defaultValue={employee.role}
                          className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={employee.role}
                          readOnly
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        defaultValue={employee.email}
                        readOnly={!isEditing}
                        className={`w-full rounded-lg border ${
                          isEditing 
                            ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                            : 'border-gray-200 bg-gray-50'
                        } px-3 py-2`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        defaultValue={employee.phone}
                        readOnly={!isEditing}
                        className={`w-full rounded-lg border ${
                          isEditing 
                            ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                            : 'border-gray-200 bg-gray-50'
                        } px-3 py-2`}
                      />
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Status & Actions</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Status
                      </label>
                      {isEditing ? (
                        <select
                          name="status"
                          defaultValue={employee.status}
                          className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center">
                          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : employee.status === 'disabled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recent Actions
                      </label>
                      <ul className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                        {employee.actions?.map((action, index) => (
                          <li key={index} className="px-4 py-3 text-sm">
                            <div className="font-medium text-gray-900">{action.type}</div>
                            <div className="text-gray-500">{action.date}</div>
                          </li>
                        )) || (
                          <li className="px-4 py-3 text-sm text-gray-500">
                            No recent actions
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 p-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              {(isEditing || isCreating) && (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {isCreating ? 'Create Employee' : 'Save Changes'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal; 