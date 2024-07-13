import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export function MYSQL_CONFIG(
  db_key: string = 'MYSQL_DB',
  host_key: string = 'MYSQL_HOST',
  user_key: string = 'MYSQL_USER',
  password_key: string = 'MYSQL_PASS',
  port_key: string = 'MYSQL_PORT',
  query_key: string = 'MYSQL_QUERY',
): string {
  const username = process.env[user_key] || null;
  const password = process.env[password_key] || null;
  const database = process.env[db_key] || 'interview';
  const port = process.env[port_key] || '3306';
  const host = process.env[host_key] || 'localhost';
  const query = process.env[query_key];

  let uri = null;
  if (!username && !password) {
    uri = `mysql://${host}:${port}/${database}?${query}`;
  } else {
    uri = `mysql://${username}:${password}@${host}:${port}/${database}?${query}`;
  }

  return uri;
}

export function MYSQL_LOGGING_CONFIG(key: string = 'MYSQL_LOGGING'): boolean {
  const value = process?.env[key];
  return value === 'true' || value === '1';
}
