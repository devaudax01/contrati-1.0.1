import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AlertCircleIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  PlusIcon
} from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export const Tasks = () => {
  const { columns } = useTasks();

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700"
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[priority]}`;
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all p-4 mb-3">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
        <span className={getPriorityBadge(task.priority)}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500">
          <CalendarIcon className="h-3 w-3 mr-1" />
          Due: {task.dueDate}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <UserIcon className="h-3 w-3 mr-1" />
          {task.assignedBy}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <TagIcon className="h-3 w-3 mr-1" />
          {task.category}
        </div>
      </div>
    </div>
  );

  const Column = ({ column }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <column.icon className={`h-5 w-5 ${column.color}`} />
          <h2 className="font-semibold text-gray-700">{column.title}</h2>
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {column.tasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <PlusIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 p-4 rounded-lg bg-gray-50">
        {column.tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="h-full max-w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Task Board</h1>
              <p className="text-gray-500 mt-1">Manage your tasks</p>
            </div>
            <div className="flex gap-4">
              <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm w-full sm:w-auto">
                <option>All Categories</option>
                <option>Maintenance</option>
                <option>Customer Service</option>
                <option>Administrative</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {Object.values(columns).map(column => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks; 