import { useState } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/router';
import ListLayout from '../../../components/ListLayout';
import { db } from '../../../db';

const downloadJSON = (object, filename) => {
  const blob = new Blob([JSON.stringify(object)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  a.parentElement.removeChild(a);
};

const ListSettings = () => {
  const router = useRouter();
  const { id: __id } = router.query;
  const id = parseInt(__id);

  const list = useLiveQuery(
    async () => (await db.lists.toArray()).filter((e) => e.id == id).at(0),
    [id]
  );

  const exportList = async () => {
    const exportGroup = async (groupID) =>
      db.buttons
        .where('groupID')
        .equals(groupID)
        .toArray()
        .then((res) => {
          return res.map((e) => e.text);
        });

    const groups = await db.groups.where('listID').equals(list.id).toArray();
    const ngroups = await Promise.all(groups.map((e) => exportGroup(e.id)));
    const data = { name: list.name, groups: ngroups };

    downloadJSON(JSON.stringify(data), data.name);
  };

  const deleteButton = async (buttonID) => db.buttons.delete(buttonID);

  const deleteGroup = async (groupID) => {
    const buttons = await db.buttons.where('groupID').equals(groupID);
    const buttonIDs = (await buttons.toArray()).map((e) => e.id);
    buttonIDs.forEach(deleteButton);
    db.groups.delete(groupID);
  };

  const deleteList = async () => {
    if (!confirm('Do you want to delete this list?')) return;
    console.log(`DELETE LIST ${list.id}`);
    const groups = await db.groups.where('listID').equals(list.id);
    const groupIDs = (await groups.toArray()).map((e) => e.id);
    groupIDs.forEach(deleteGroup);
    db.lists.delete(list.id);
    router.push('/list');
  };

  return (
    <ListLayout id={id}>
      <div className="container">
        {list && (
          <div className="f fcol fgrow mw-50">
            <div className="f fjcc mt mb">{list.name}</div>
            <div className="f fcol fgrow figcol mb">
              <div className="f fig">
                <button
                  type="button"
                  className="fgrow fi btn"
                  onClick={exportList}
                >
                  Export
                </button>
              </div>
              <div className="f fig">
                <button
                  type="button"
                  className="fgrow fi btn"
                  onClick={deleteList}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ListLayout>
  );
};

export default ListSettings;
