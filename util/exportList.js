import db from "db";

const downloadJSON = (object, filename) => {
  const blob = new Blob([JSON.stringify(object)], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  a.parentElement.removeChild(a);
};

const exportList = async (listID) => {
  const list = await db.lists.get(listID);
  const exportGroup = async (groupID) =>
    db.buttons
      .where("groupID")
      .equals(groupID)
      .toArray()
      .then((res) => {
        return res.map((e) => e.text);
      });

  const groups = await db.groups.where("listID").equals(listID).toArray();
  const ngroups = await Promise.all(groups.map((e) => exportGroup(e.id)));
  const data = { name: list.name, groups: ngroups };

  downloadJSON(data, data.name);
};

export default exportList;
