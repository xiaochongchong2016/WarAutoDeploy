import React, { useState } from 'react';
import { Upload, Database, Loader, Save } from 'lucide-react';
import { type DeploymentConfig, type DbType } from '../types';
import { validateDbUrl } from '../utils/validation';
import ConfigPresets from './ConfigPresets';

interface Props {
  onDeploy: (config: DeploymentConfig) => void;
  isDeploying: boolean;
}

export default function DeploymentForm({ onDeploy, isDeploying }: Props) {
  const [config, setConfig] = useState<DeploymentConfig>({
    warFile: null,
    contextPath: '',
    dbType: 'mysql',
    dbUrl: '',
    dbUsername: '',
    dbPassword: '',
    javaOpts: '-Xmx512m',
    port: '8080'
  });

  const [validationError, setValidationError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const contextPath = '/' + file.name.replace('.war', '');
      setConfig(prev => ({ ...prev, warFile: file, contextPath }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDbUrl(config);
    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }
    setValidationError('');
    onDeploy(config);
  };

  const handlePresetSelect = (preset: Partial<DeploymentConfig>) => {
    setConfig(prev => ({ ...prev, ...preset }));
    setValidationError('');
  };

  const handleDbUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setConfig(prev => ({ ...prev, dbUrl: newUrl }));
    const validation = validateDbUrl({ ...config, dbUrl: newUrl });
    if (!validation.isValid) {
      setValidationError(validation.message);
    } else {
      setValidationError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ConfigPresets onSelect={handlePresetSelect} />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">WAR文件</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">点击上传</span> 或拖拽文件
              </p>
              <p className="text-xs text-gray-500">WAR文件 (最大100MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".war"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">上下文路径</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="/myapp"
            value={config.contextPath}
            onChange={e => setConfig(prev => ({ ...prev, contextPath: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">端口</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="8080"
            value={config.port}
            onChange={e => setConfig(prev => ({ ...prev, port: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 flex items-center gap-2">
          <Database className="h-4 w-4" />
          数据库配置
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">数据库类型</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={config.dbType}
              onChange={e => setConfig(prev => ({ ...prev, dbType: e.target.value as DbType }))}
            >
              <option value="mysql">MySQL</option>
              <option value="oracle">Oracle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">数据库URL</label>
            <input
              type="text"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm ${
                validationError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
              }`}
              placeholder={config.dbType === 'mysql' ? 
                'jdbc:mysql://localhost:3306/dbname' : 
                'jdbc:oracle:thin:@//hostname:1521/service'
              }
              value={config.dbUrl}
              onChange={handleDbUrlChange}
              required
            />
            {validationError && (
              <p className="mt-1 text-xs text-red-600">{validationError}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={config.dbUsername}
              onChange={e => setConfig(prev => ({ ...prev, dbUsername: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">密码</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={config.dbPassword}
              onChange={e => setConfig(prev => ({ ...prev, dbPassword: e.target.value }))}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Java 运行参数</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="-Xmx512m"
          value={config.javaOpts}
          onChange={e => setConfig(prev => ({ ...prev, javaOpts: e.target.value }))}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isDeploying || !!validationError}
          className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeploying ? (
            <>
              <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
              部署中...
            </>
          ) : (
            <>
              <Upload className="-ml-1 mr-2 h-4 w-4" />
              部署应用
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => {/* 保存配置到本地 */}}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}