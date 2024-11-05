export type DbType = 'mysql' | 'oracle';

export interface DeploymentConfig {
  warFile: File | null;
  contextPath: string;
  dbType: DbType;
  dbUrl: string;
  dbUsername: string;
  dbPassword: string;
  javaOpts: string;
  port: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}