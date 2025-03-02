import { MoreVertical } from 'lucide-react';

export default function ThreeDotsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full p-1 hover:bg-gray-100"
    >
      <MoreVertical className="h-5 w-5 text-gray-400" />
    </button>
  );
} 