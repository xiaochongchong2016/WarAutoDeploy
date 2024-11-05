import { type DeploymentConfig, type ValidationResult } from '../types';

export function validateDbUrl(config: DeploymentConfig): ValidationResult {
  const { dbType, dbUrl } = config;

  if (dbType === 'mysql') {
    const mysqlRegex = /^jdbc:mysql:\/\/[\w.-]+:\d+\/\w+(\?[\w&=]+)?$/;
    if (!mysqlRegex.test(dbUrl)) {
      return {
        isValid: false,
        message: 'MySQL URL格式无效。正确格式: jdbc:mysql://hostname:port/database'
      };
    }
  } else if (dbType === 'oracle') {
    const oracleRegex = /^jdbc:oracle:thin:@\/\/[\w.-]+:\d+\/\w+$/;
    if (!oracleRegex.test(dbUrl)) {
      return {
        isValid: false,
        message: 'Oracle URL格式无效。正确格式: jdbc:oracle:thin:@//hostname:port/service'
      };
    }
  }

  return { isValid: true, message: '数据库URL格式验证通过' };
}