import db from 'db';
import log from 'util/log';

const useButtons = () => {
  // CREATE
  const addButton = async (button) => await db.buttons.add(button);
  const handleAddButton = (event) => {
    event.preventDefault();
    db.buttons
      .add({
        groupID: parseInt(event.target.dataset.groupId),
        text: event.target.newbuttontext.value,
      })
      .then((res) => log(`Added button[id:${res}]`));
    event.target.newbuttontext.value = '';
  };

  // READ
  const buttonPrimaryKeys = async () => await db.buttons.primaryKeys();
  const getButtonsFor = async (groupID) =>
    await db.buttons.where('groupID').equals(groupID).toArray();

  // UPDATE
  const putButton = async (button) => await db.buttons.put(button);
  const handleUpdateButton = (event) =>
    db.buttons.put({
      id: parseInt(event.target.dataset.buttonId),
      groupID: parseInt(event.target.dataset.groupId),
      text: event.target.value,
    });

  // DELETE
  const deleteButton = async (event) => {
    log(`Deleting button[id:${event.target.dataset.buttonId}]`);
    return await db.buttons.delete(parseInt(event.target.dataset.buttonId));
  };
  const handleDeleteButton = (event) => {
    const id = parseInt(event.target.dataset.buttonId);
    log(`Deleting button[id:${id}]`);
    db.buttons.delete(id);
  };

  return {
    addButton,
    buttonPrimaryKeys,
    deleteButton,
    getButtonsFor,
    handleAddButton,
    handleDeleteButton,
    handleUpdateButton,
    putButton,
  };
};

export default useButtons;
