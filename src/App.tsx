import React, { useState, useCallback } from 'react';
import { Upload, Server, Database, Play, Square, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import DeploymentForm from './components/DeploymentForm';
import DeploymentStatus from './components/DeploymentStatus';
import ServerControls from './components/ServerControls';
import { type DeploymentConfig } from './types';

function App() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverStatus, setServerStatus] = useState<'stopped' | 'running'>('stopped');

  const handleDeploy = useCallback((config: DeploymentConfig) => {
    setIsDeploying(true);
    // 模拟部署过程
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentStatus('success');
    }, 2000);
  }, []);

  const toggleServer = useCallback(() => {
    setServerStatus(prev => prev === 'running' ? 'stopped' : 'running');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">WAR包部署工具</h1>
            </div>
            <ServerControls 
              status={serverStatus}
              onToggle={toggleServer}
            />
          </div>
          <p className="mt-2 text-gray-600">简化您的Java Web应用部署流程</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5 text-indigo-600" />
              部署配置
            </h2>
            <DeploymentForm 
              onDeploy={handleDeploy}
              isDeploying={isDeploying}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" />
              部署状态
            </h2>
            <DeploymentStatus 
              status={deploymentStatus}
              isDeploying={isDeploying}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;