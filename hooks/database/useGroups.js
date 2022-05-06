import db from 'db';
import log from 'util/log';

const useGroups = () => {
  // CREATE
  const addGroup = async (listID) => {
    const groupID = await db.groups.add({ listID });
    log(`Added group[id:${groupID}]`);
    return groupID;
  };

  // READ
  const getGroupsFor = async (listID) =>
    await db.groups.where('listID').equals(listID).toArray();

  // UPDATE
  // no functions

  // DELETE
  const confirmDeleteGroup = async (event) => {
    const groupID = parseInt(event.target.dataset.groupId);
    if (!confirm(`Do you want to delete this group? (id: ${groupID})`)) return;
    await deleteGroup(groupID);
  };
  const deleteGroup = async (groupID) => {
    await db.buttons.where('groupID').equals(groupID).delete();
    await db.groups.delete(groupID);
    log(`Deleted group[id:${groupID}]`);
  };

  return {
    addGroup,
    confirmDeleteGroup,
    deleteGroup,
    getGroupsFor,
  };
};

export default useGroups;
