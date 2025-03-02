import { useState, useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

export const DocumentViewer = ({ document, label, onClose }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md p-4 flex items-center justify-between z-10">
          <h3 className="text-white font-medium">{label}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <button
                onClick={() => setScale(prev => Math.max(0.5, prev - 0.25))}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom out"
              >
                <ZoomOut size={20} className="text-white" />
              </button>
              <span className="text-white text-sm w-16 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(prev => Math.min(3, prev + 0.25))}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom in"
              >
                <ZoomIn size={20} className="text-white" />
              </button>
            </div>
            <button
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Rotate"
            >
              <RotateCw size={20} className="text-white" />
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = document;
                link.download = `${label.toLowerCase().replace(/\s+/g, '-')}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Download"
            >
              <Download size={20} className="text-white" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="h-full w-full flex items-center justify-center p-20">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            src={document}
            alt={label}
            className="max-h-full max-w-full object-contain transition-all duration-200 ease-out"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}; 