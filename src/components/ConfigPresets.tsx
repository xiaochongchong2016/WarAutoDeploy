import React from 'react';
import { Bookmark } from 'lucide-react';
import { type DeploymentConfig } from '../types';

interface Props {
  onSelect: (preset: Partial<DeploymentConfig>) => void;
}

const presets = [
  {
    name: '开发环境',
    config: {
      dbType: 'mysql',
      dbUrl: 'jdbc:mysql://localhost:3306/dev_db',
      dbUsername: 'dev',
      port: '8080',
      javaOpts: '-Xmx512m -Dspring.profiles.active=dev'
    }
  },
  {
    name: '测试环境',
    config: {
      dbType: 'mysql',
      dbUrl: 'jdbc:mysql://test-db:3306/test_db',
      dbUsername: 'test',
      port: '8081',
      javaOpts: '-Xmx1024m -Dspring.profiles.active=test'
    }
  },
  {
    name: '生产环境',
    config: {
      dbType: 'oracle',
      dbUrl: 'jdbc:oracle:thin:@//prod-db:1521/PROD',
      dbUsername: 'prod',
      port: '8082',
      javaOpts: '-Xmx2048m -XX:+UseG1GC -Dspring.profiles.active=prod'
    }
  }
];

export default function ConfigPresets({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset.name}
          type="button"
          onClick={() => onSelect(preset.config)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Bookmark className="h-4 w-4 mr-2" />
          {preset.name}
        </button>
      ))}
    </div>
  );
}