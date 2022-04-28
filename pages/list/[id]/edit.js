import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/dist/client/router';
import ListLayout from '../../../components/ListLayout';
import { db } from '../../../db';

const ButtonEdit = ({ button }) => {
  const handleChange = (event) => {
    db.buttons.put({ ...button, text: event.target.value });
  };

  return (
    <div className="f fig">
      <input
        className="fgrow fi"
        value={button.text || ''}
        onChange={handleChange}
        placeholder="Button text"
      />
      <button
        className="btn fi btn"
        type="button"
        onClick={async () => db.buttons.delete(button.id)}
      >
        X
      </button>
    </div>
  );
};

const ButtonGroup = ({ group }) => {
  const deleteButton = (buttonID) => db.buttons.delete(buttonID);
  const deleteGroup = async () => {
    if (!confirm('Do you want to delete this group?')) return;
    const buttons = await db.buttons.where('groupID').equals(group.id);
    const buttonIDs = (await buttons.toArray()).map((e) => e.id);
    buttonIDs.forEach(deleteButton);
    db.groups.delete(group.id);
  };
  const buttons = useLiveQuery(
    async () =>
      await db.buttons
        .toArray()
        .then((res) => res.filter((e) => e.groupID == group.id)),
    [group]
  );

  return (
    <div className="mb f fcol bhl">
      <div className="f fcol figcol mb" id={group.id}>
        {buttons &&
          buttons.map((button) => (
            <ButtonEdit key={button.id} button={button} />
          ))}
      </div>
      <div className="f fcol figcol">
        <form
          className="fig"
          onSubmit={(event) => {
            event.preventDefault();
            db.buttons.add({
              groupID: group.id,
              text: event.target.newbuttontext.value,
            });
            event.target.newbuttontext.value = '';
          }}
        >
          <input
            className="fgrow fi"
            id="newbuttontext"
            placeholder="New button text"
          />
          <button type="submit" className="btn fi">
            Add button
          </button>
        </form>

        <div className="f fig">
          <button type="button" className="btn fgrow fi" onClick={deleteGroup}>
            Delete Group
          </button>
        </div>
      </div>
    </div>
  );
};

const ListEdit = () => {
  const router = useRouter();
  const { id: __id } = router.query;
  const id = parseInt(__id);

  const list = useLiveQuery(
    async () => (await db.lists.toArray()).filter((e) => e.id == id).at(0),
    [id]
  );
  const groups = useLiveQuery(
    async () =>
      await db.groups
        .toArray()
        .then((res) => res.filter((e) => e.listID == id)),
    [id]
  );

  const updateListName = (event) => {
    db.lists.put({ id, name: event.target.value });
  };

  return (
    <ListLayout id={id}>
      <div className="container">
        {list && (
          <div id="list" className="mw-50">
            <div className="fig">
              <input
                className="fi mt mb w100"
                value={list.name}
                onChange={updateListName}
              />
            </div>
            {groups &&
              groups.map((group) => (
                <ButtonGroup key={group.id} group={group} />
              ))}
            <div className="fig">
              <button
                type="button"
                className="fgrow fi btn"
                onClick={async () => {
                  const gID = await db.groups.add({ listID: id });
                  db.buttons.put({ groupID: gID });
                }}
              >
                Add Group
              </button>
            </div>
          </div>
        )}
      </div>
    </ListLayout>
  );
};

export default ListEdit;
