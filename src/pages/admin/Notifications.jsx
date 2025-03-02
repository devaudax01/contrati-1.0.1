import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockNotifications = [
          {
            id: 1,
            type: 'success',
            title: 'New Business Registration',
            message: 'Business "Auto Rental Pro" has completed registration',
            date: '2024-03-07T10:30:00',
            read: false
          },
          {
            id: 2,
            type: 'warning',
            title: 'Subscription Expiring',
            message: 'Premium subscription for "Car Rental Plus" expires in 7 days',
            date: '2024-03-07T09:15:00',
            read: false
          },
          {
            id: 3,
            type: 'info',
            title: 'System Update',
            message: 'New features will be deployed on March 15th',
            date: '2024-03-06T16:45:00',
            read: true
          },
          {
            id: 4,
            type: 'error',
            title: 'Failed Payment',
            message: 'Payment failed for invoice #12345',
            date: '2024-03-06T14:20:00',
            read: true
          }
        ];
        setNotifications(mockNotifications);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        toast.error('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const markAsRead = async (id) => {
    try {
      // TODO: Replace with actual API call
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
      toast.success('Marked as read');
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      toast.error('Failed to update notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Replace with actual API call
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
      toast.error('Failed to update notifications');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
            <p className="mt-2 text-sm text-gray-700">
              System notifications and important updates
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {notifications.map((notification, index) => (
                <li key={notification.id}>
                  <div className="relative pb-8">
                    {index !== notifications.length - 1 && (
                      <span
                        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="min-w-0 flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex justify-between items-center mb-1">
                          <p className={`text-sm font-medium ${notification.read ? 'text-gray-500' : 'text-gray-900'}`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                              {new Date(notification.date).toLocaleString()}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}; 