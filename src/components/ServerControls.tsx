import React from 'react';
import { Play, Square } from 'lucide-react';

interface Props {
  status: 'running' | 'stopped';
  onToggle: () => void;
}

export default function ServerControls({ status, onToggle }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'running' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status === 'running' ? '服务器运行中' : '服务器已停止'}
      </span>
      <button
        onClick={onToggle}
        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${
          status === 'running'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {status === 'running' ? (
          <>
            <Square className="h-4 w-4 mr-1" />
            停止服务器
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-1" />
            启动服务器
          </>
        )}
      </button>
    </div>
  );
}