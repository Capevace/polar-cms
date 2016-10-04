// TODO: Cli
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import console from 'better-console';

const dbPath = path.resolve('database/polar.db');

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
} else {
  console.log('Database already exists. To setup please remove old file.');
}

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbPath);
