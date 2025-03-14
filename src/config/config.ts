interface DatabaseConfig {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
  }
  
  interface Config {
    database: DatabaseConfig;
  }
  
  const config: Config = {
    database: {
      database: 'node-mysql-crud-api',
      user: 'root',
      password: 'Mlinc1234',
      host: 'localhost',
      port: 3306 
    }
  };
  
  export default config;