import { useEffect, useRef } from 'react';
import { Edit3, Archive, Trash, CheckCircle, XCircle, Eye } from 'lucide-react';

export default function ActionMenu({ position, onClose, item, onAction }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        className="absolute z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        <button
          onClick={() => {
            onAction('preview', item);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>

        <button
          onClick={() => {
            onAction('edit', item);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>

        <button
          onClick={() => {
            onAction(item.status === 'active' ? 'disable' : 'activate', item);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100"
        >
          {item.status === 'active' ? (
            <XCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          {item.status === 'active' ? 'Disable' : 'Activate'}
        </button>

        <button
          onClick={() => {
            onAction('block', item);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100"
        >
          <Archive className="h-4 w-4" />
          Block
        </button>

        <button
          onClick={() => {
            onAction('delete', item);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
          Delete
        </button>
      </div>
    </>
  );
} 