import Dexie from 'dexie';

const db = new Dexie('clipboard-helper');
db.version(1).stores({
  lists: '++id, name',
  groups: '++id, listID',
  buttons: '++id, groupID, text',
});

export default db;
