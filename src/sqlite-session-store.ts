import type { SessionStore } from "@telegraf/session/types";
import { DB } from "sqlite";

interface Options {
  dbPath?: string;
  tableName?: string;
}

export const SqliteSessionStore = <Session>(
  options: Options = { dbPath: "./data/sessions.db", tableName: "telegraf_sessions" }
): SessionStore<Session> => {
  const { dbPath, tableName } = options;
  const db = new DB(dbPath);

  db.execute(
    `CREATE TABLE IF NOT EXISTS ${tableName} (key TEXT PRIMARY KEY, session TEXT)`
  );

  return {
    get(key: string) {
      const rows = db.query(`SELECT session FROM ${tableName} WHERE key = ?`, [
        key,
      ]);

      if (!rows[0]?.[0]) {
        return undefined;
      }

      return JSON.parse(rows[0][0] as string);
    },
    set(key: string, value: Session) {
      const session = JSON.stringify(value);

      db.query(
        `INSERT INTO ${tableName} (key, session) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET session = ?`,
        [key, session, session]
      );
    },
    delete(key: string) {
      db.query(`DELETE FROM ${tableName} WHERE key = ?`, [key]);
    },
  };
};
