import * as mysql from 'mysql2/promise';
import { tablesSchemas } from './tables.schemas';
import { hashUnRecoveable } from 'src/utils/encryption';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}
  private connectionConfig: any = {
    host: this.configService.get<string>('DATABASE_HOST'),
    port: this.configService.get<number>('DATABASE_PORT'),
    user: this.configService.get<string>('DATABASE_USER'),
    password: this.configService.get<string>('DATABASE_PASSWORD'),
  };
  private connection: mysql.Connection;
  private databaseName = this.configService.get<string>('DATABASE_NAME');

  async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await this.createConnection(this.databaseName);
    }
    return this.connection;
  }

  async createConnection(database?: string) {
    const createConnectionConfig = {
      ...this.connectionConfig,
    };
    if (database) {
      createConnectionConfig['database'] = database;
    }
    return await mysql.createConnection(createConnectionConfig);
  }

  async onModuleInit() {
    try {
      await this.createDatabaseIfNotExists();
      this.connection = await this.createConnection(this.databaseName);
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }

  async createTablesIfNotExists() {
    for (const tableSchema of tablesSchemas) {
      try {
        const connection = await this.getConnection();
        await connection.query(tableSchema.query);
        console.log(`Database ${tableSchema.tableName} table checked/created`);
      } catch (error) {
        console.error('Error creating table:', error);
      }
    }
  }

  async createDatabaseIfNotExists() {
    try {
      const connection = await this.createConnection();
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${this.databaseName}`,
      );
    } catch (error) {
      console.error('Error creating database:', error);
    }
  }

  async insertDummyData() {
    for (const tableSchema of tablesSchemas) {
      try {
        const promises = [];
        const salt = this.configService.get<string>('SALT_ROUNDS');
        // you can also insert many instead of these but for this example we are inserting one by one because we don't know all columns are same
        for (const dummyData of tableSchema.dummyData) {
          const keys = Object.keys(dummyData);
          const hashColumns = tableSchema.unRecoveableHashColumns;

          for (const column of hashColumns) {
            dummyData[column] = await hashUnRecoveable(
              dummyData[column],
              parseInt(salt),
            );
          }

          const values = Object.values(dummyData);
          // INSERT IGNORE INTO is used to ignore the duplicate data
          const query = `INSERT IGNORE INTO ${tableSchema.tableName} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`;
          promises.push(this.query(query, values));
        }

        await Promise.all(promises);
        console.log(
          `Inserted dummy data into '${tableSchema.tableName}' table if not exists`,
        );
      } catch (error) {
        console.error('Error inserting dummy data:', error);
      }
    }
  }

  async query(sql: string, values?: any[]) {
    const connection = this.connection;
    const [rows] = await connection.execute(sql, values);
    return rows;
  }
}
