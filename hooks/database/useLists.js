import db from 'db';
import { useRouter } from 'next/router';
import log from 'util/log';
import useGroups from './useGroups';

const useLists = () => {
  const router = useRouter();
  const { deleteGroup } = useGroups();

  // CREATE
  const addList = async (list) => await db.lists.add(list);
  const addBlankList = async () => {
    log(`Adding blank list`);
    const id = await db.lists.add({ name: 'New list' });
    log(`Redirecting to list[id:${id}]`);
    router.push(`/list/${id}`);
  };
  const addExampleData = async () => {
    log(`Adding example data`);
    const id = await db.lists.add({ name: 'Example List' });
    const gID = await db.groups.add({ listID: id });
    db.buttons.bulkPut([
      {
        groupID: gID,
        text: 'First button',
      },
      {
        groupID: gID,
        text: 'Second button',
      },
      {
        groupID: gID,
        text: 'Third button',
      },
      {
        groupID: gID,
        text: 'Fourth button',
      },
    ]);
    log(`Redirecting to list[id:${id}]`);
    router.push(`/list/${id}`);
  };

  // READ
  const getList = async (id) => await db.lists.get(id);
  const getAllLists = async () => await db.lists.toArray();

  // UPDATE
  const updateListName = (event) => {
    db.lists.put({
      id: parseInt(event.target.dataset.listId),
      name: event.target.value,
    });
  };

  // DELETE
  const confirmDeleteList = async (event) => {
    const listID = parseInt(event.target.dataset.listId);
    if (!confirm(`Do you want to delete this list? (id: ${listID})`)) return;
    deleteList(listID);
  };
  const deleteList = async (listID) => {
    log(`Deleting list[id:${listID}]`);
    const keys = await db.groups.where('listID').equals(listID).primaryKeys();
    await Promise.all(keys.map((k) => deleteGroup(k)));
    db.lists.delete(listID);
    router.push('/list');
  };

  return {
    addList,
    addBlankList,
    addExampleData,
    confirmDeleteList,
    getList,
    getAllLists,
    updateListName,
  };
};

export default useLists;
