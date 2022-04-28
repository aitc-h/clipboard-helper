import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../db";

const addExampleData = async (router) => {
  const id = await db.lists.put({ name: "Example List" });
  const gID = await db.groups.put({ listID: id });
  db.buttons.bulkPut([
    {
      groupID: gID,
      text: "First button",
    },
    {
      groupID: gID,
      text: "Second button",
    },
    {
      groupID: gID,
      text: "Third button",
    },
    {
      groupID: gID,
      text: "Fourth button",
    },
  ]);
  router.push(`/list/${id}`);
};

const addList = async (router) => {
  const id = await db.lists.put({ name: "New list" });
  router.push(`/list/${id}`);
};

function ListLink({ name, id }) {
  return (
    <div className="f fig">
      <Link href={`/list/${id}`}>
        <a className="fgrow fi f fjcc btn">{name}</a>
      </Link>
    </div>
  );
}

function DataView() {
  const lists = useLiveQuery(async () => await db.lists.toArray(), []);

  if (!lists) return <span className="fgrow fi f fjcc">Loading</span>;
  if (lists.length == 0)
    return <span className="fgrow fi f fjcc">No lists found</span>;

  return lists.map((e) => <ListLink {...e} key={e.id} />);
}

export default function AllLists() {
  const router = useRouter();

  const onUpload = async (event) => {
    const data = await event.target.files[0]
      .text()
      .then((res) => JSON.parse(res));

    const listID = await db.lists.add({ name: data.name });
    data.groups.map(async (group) => {
      const groupID = await db.groups.add({ listID });
      group.map(
        async (button) => await db.buttons.add({ groupID, text: button })
      );
    });
    event.target.value = null;
    router.push(`/list/${listID}`);
  };

  return (
    <div className="container">
      <div className="f fcol fgrow mw-50 mt">
        <div className="f fcol fgrow figcol mb">
          <DataView />
        </div>
        <div className="f fcol fgrow figcol mb">
          <div className="f fig">
            <button
              onClick={() => addExampleData(router)}
              type="button"
              className="fgrow fi btn"
            >
              Add example data
            </button>
          </div>
          <div className="f fig">
            <button
              onClick={() => {
                document.getElementById("fileupload").click();
              }}
              className="fgrow fi btn"
            >
              Import list...
            </button>
            <input
              type="file"
              accept="application/json"
              id="fileupload"
              onChange={onUpload}
            />
          </div>
          <div className="f fig">
            <button
              onClick={() => addList(router)}
              type="button"
              className="fi fgrow btn"
            >
              Add new list
            </button>
          </div>
        </div>
      </div>
      <script id="data" type="application/json"></script>
    </div>
  );
}
