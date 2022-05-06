const onUpload = async (event, router) => {
  const data = await event.target.files[0]
    .text()
    .then((res) => JSON.parse(res));

  event.target.value = null;

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

export default onUpload;
