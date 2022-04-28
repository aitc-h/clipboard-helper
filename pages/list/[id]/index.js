import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import ListLayout from "../../../components/ListLayout";
import { db } from "../../../db";

const copy = (text) => {
  navigator.clipboard.writeText(text);
  console.log(`copied: ${text}`);
  return;
};

const CopyButton = ({ button }) => (
  <div className="f fig">
    <button
      type="button"
      className="fgrow fi btn"
      value={button.text}
      onClick={(event) => copy(event.target.value)}
    >
      {button.text}
    </button>
  </div>
);

const ButtonGroup = ({ group }) => {
  const buttons = useLiveQuery(
    async () =>
      await db.buttons
        .toArray()
        .then((res) => res.filter((e) => e.groupID == group.id)),
    [group]
  );

  return (
    <div className="f fcol fgrow figcol mb" id={group.id}>
      {buttons &&
        buttons.map((button) => <CopyButton key={button.id} button={button} />)}
    </div>
  );
};

const ListView = () => {
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

  return (
    <ListLayout id={id}>
      <div className="container">
        <div id="list" className="f fcol fgrow mw-50">
          <div className="f fjcc mt mb">{list?.name}</div>
          {groups &&
            groups.map((group) => <ButtonGroup key={group.id} group={group} />)}
        </div>
      </div>
    </ListLayout>
  );
};

export default ListView;
