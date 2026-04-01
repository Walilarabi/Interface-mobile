import Dexie, { type Table } from 'dexie';
import { Pointage, RHRequest } from '../types';

export class FlowtymDatabase extends Dexie {
  pointages!: Table<Pointage>;
  rhRequests!: Table<RHRequest>;
  syncQueue!: Table<{ id?: number; action: string; data: any; timestamp: number }>;

  constructor() {
    super('FlowtymDB');
    this.version(1).stores({
      pointages: 'id, user_id, date, status',
      rhRequests: 'id, user_id, type, status',
      syncQueue: '++id, timestamp'
    });
  }
}

export const db = new FlowtymDatabase();
