import { create } from 'zustand';

export const useTasks = create((set) => ({
  columns: {
    pending: {
      id: 'pending',
      title: 'To Do',
      icon: 'AlertCircle',
      color: 'text-red-500',
      tasks: [
        {
          id: '1',
          title: "Vehicle Inspection",
          description: "Complete daily inspection for Toyota Camry (ABC123)",
          priority: "high",
          dueDate: "2024-03-20",
          assignedBy: "John Manager",
          category: "Maintenance"
        },
        {
          id: '4',
          title: "Inventory Check",
          description: "Verify vehicle parts inventory",
          priority: "medium",
          dueDate: "2024-03-21",
          assignedBy: "John Manager",
          category: "Maintenance"
        }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      icon: 'Clock',
      color: 'text-yellow-500',
      tasks: [
        {
          id: '2',
          title: "Customer Follow-up",
          description: "Call customer regarding rental extension request",
          priority: "medium",
          dueDate: "2024-03-19",
          assignedBy: "Sarah Lead",
          category: "Customer Service"
        }
      ]
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      icon: 'CheckCircle',
      color: 'text-green-500',
      tasks: [
        {
          id: '3',
          title: "Documentation Update",
          description: "Update vehicle maintenance records",
          priority: "low",
          dueDate: "2024-03-18",
          assignedBy: "John Manager",
          category: "Administrative"
        }
      ]
    }
  },
  updateTaskStatus: (taskId, newStatus) =>
    set((state) => {
      const newColumns = { ...state.columns };
      let taskToMove;
      let sourceColumn;

      // Find the task and its source column
      Object.values(newColumns).forEach((column) => {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          taskToMove = task;
          sourceColumn = column.id;
        }
      });

      if (taskToMove && sourceColumn) {
        // Remove from source column
        newColumns[sourceColumn].tasks = newColumns[sourceColumn].tasks.filter(
          (t) => t.id !== taskId
        );
        // Add to destination column
        newColumns[newStatus].tasks.push(taskToMove);
      }

      return { columns: newColumns };
    }),
})); 