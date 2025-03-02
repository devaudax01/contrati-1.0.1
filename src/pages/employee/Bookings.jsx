import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Search, Filter } from 'lucide-react';
import { BoardView } from '../../components/Bookings/BoardView';
import { CalendarView } from '../../components/Bookings/CalendarView';
import { ContractView } from '../../components/Bookings/ContractView';
import { TimelineView } from '../../components/Bookings/TimelineView';
import { ProgressView } from '../../components/Bookings/ProgressView';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('calendar');
  
  const [bookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      carName: 'Toyota Camry',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      status: 'active',
      color: 'bg-blue-500',
      team: ['JD', 'MS', 'AK']
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      carName: 'Honda Civic',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      status: 'upcoming',
      color: 'bg-green-500',
      team: ['JS', 'RK']
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      carName: 'Tesla Model 3',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      status: 'completed',
      color: 'bg-purple-500',
      team: ['MJ', 'TK', 'AL']
    }
  ]);

  const tabs = [
    { id: 'calendar', name: 'Calendar' },
    { id: 'board', name: 'Board' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'contract', name: 'Contracts' },
    { id: 'progress', name: 'Progress' }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarView bookings={bookings} />;
      case 'board':
        return <BoardView bookings={bookings} />;
      case 'timeline':
        return <TimelineView bookings={bookings} />;
      case 'contract':
        return <ContractView bookings={bookings} />;
      case 'progress':
        return <ProgressView bookings={bookings} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your vehicle bookings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Active View */}
        {renderActiveView()}
      </div>
    </DashboardLayout>
  );
}