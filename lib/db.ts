import Dexie, { Table } from 'dexie';

export interface Project {
  id?: string;
  name: string;
  code: string;
  lastModified: Date;
  userId: string;
}

export class SwiftyDatabase extends Dexie {
  projects!: Table<Project>;

  constructor() {
    super('swifty');
    this.version(1).stores({
      projects: '++id, name, userId, lastModified',
    });
  }
}

export const db = new SwiftyDatabase();