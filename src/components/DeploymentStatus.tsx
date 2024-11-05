import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface Props {
  status: 'idle' | 'success' | 'error';
  isDeploying: boolean;
}

export default function DeploymentStatus({ status, isDeploying }: Props) {
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-lg divide-y">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">部署状态</span>
            {isDeploying ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Loader className="animate-spin mr-1 h-3 w-3" />
                部署中
              </span>
            ) : status === 'success' ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                部署成功
              </span>
            ) : status === 'error' ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <XCircle className="mr-1 h-3 w-3" />
                部署失败
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                等待部署
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">部署日志</h4>
          <div className="bg-gray-50 rounded-md p-3 font-mono text-xs text-gray-600 h-48 overflow-y-auto">
            {isDeploying ? (
              <>
                [信息] 开始部署流程...
                <br />
                [信息] 验证WAR文件...
                <br />
                [信息] 配置数据库连接...
              </>
            ) : status === 'success' ? (
              <>
                [信息] 开始部署流程...
                <br />
                [信息] 验证WAR文件... 完成
                <br />
                [信息] 配置数据库连接... 完成
                <br />
                [信息] 部署WAR文件... 完成
                <br />
                [成功] 部署已成功完成
                <br />
                [信息] 应用访问地址: http://localhost:8080/myapp
              </>
            ) : status === 'error' ? (
              <>
                [信息] 开始部署流程...
                <br />
                [错误] WAR文件部署失败
                <br />
                [错误] 原因: 数据库配置无效
              </>
            ) : (
              '[信息] 等待部署...'
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">系统信息</h4>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-gray-500">Java版本</dt>
            <dd className="text-sm font-medium text-gray-900">OpenJDK 17.0.2</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">服务器</dt>
            <dd className="text-sm font-medium text-gray-900">Apache Tomcat 10.0.27</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">内存使用</dt>
            <dd className="text-sm font-medium text-gray-900">1.2GB / 4GB</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">运行时间</dt>
            <dd className="text-sm font-medium text-gray-900">2小时34分钟</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}