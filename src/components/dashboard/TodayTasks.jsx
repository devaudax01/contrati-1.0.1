import { useTasks } from '../../hooks/useTasks';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AlertCircleIcon,
  CalendarIcon,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TodayTasks = () => {
  const { columns } = useTasks();

  // Get today's tasks from all columns
  const todayTasks = Object.values(columns).flatMap(column => 
    column.tasks.filter(task => {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate === today;
    })
  );

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500"
    };
    return colors[priority];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
          <Link 
            to="/employee/tasks" 
            className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {todayTasks.length > 0 ? (
            todayTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`mt-1 ${getPriorityColor(task.priority)}`}>
                  {task.priority === "high" && <AlertCircleIcon className="h-5 w-5" />}
                  {task.priority === "medium" && <ClockIcon className="h-5 w-5" />}
                  {task.priority === "low" && <CheckCircleIcon className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Due today
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No tasks due today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 