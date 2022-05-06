import Button from 'components/Button';
import Input from 'components/Input';
import Page from 'components/Page';
import Grid from 'components/Grid';
import { useLiveQuery } from 'dexie-react-hooks';
import useButtons from 'hooks/database/useButtons';
import useGroups from 'hooks/database/useGroups';
import useLists from 'hooks/database/useLists';
import useQueryID from 'hooks/useQueryID';

const ButtonEdit = ({ button }) => {
  const { deleteButton, handleUpdateButton } = useButtons();

  return (
    <Grid.Row>
      <Input
        value={button.text}
        data-button-id={button.id}
        data-group-id={button.groupID}
        onChange={handleUpdateButton}
        placeholder="Button text"
        flexGrow
      />
      <Button data-button-id={button.id} onClick={deleteButton}>
        X
      </Button>
    </Grid.Row>
  );
};

const ButtonGroup = ({ group }) => {
  const { getButtonsFor, handleAddButton } = useButtons();
  const { confirmDeleteGroup } = useGroups();
  const buttonsData = useLiveQuery(() => getButtonsFor(group.id), [group]);

  return (
    <Grid.Column>
      <Grid.Column id={group.id}>
        {buttonsData?.map((button) => (
          <ButtonEdit key={button.id} button={button} />
        ))}
      </Grid.Column>
      <Grid.Column>
        <Grid.Row>
          <form onSubmit={handleAddButton} data-group-id={group.id}>
            <Input id="newbuttontext" placeholder="New button text" flexGrow />
            <Button type="submit">Add button</Button>
          </form>
        </Grid.Row>

        <Grid.Row>
          <Button
            flexGrow
            onClick={confirmDeleteGroup}
            data-group-id={group.id}
          >
            Delete Group
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid.Column>
  );
};

const ListEdit = () => {
  const id = useQueryID();

  const { getList, updateListName } = useLists();
  const { getGroupsFor, addGroup } = useGroups();

  const list = useLiveQuery(() => getList(id), [id]);
  const groupsData = useLiveQuery(() => getGroupsFor(id), [id]);

  return (
    <Page id={id} addListHeader>
      <Page.Title>{list?.name}</Page.Title>

      {list && (
        <>
          <Grid.Column>
            <Grid.Row>
              <Input
                data-list-id={id}
                value={list.name}
                onChange={updateListName}
                flexGrow
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            {groupsData &&
              groupsData.map((group) => (
                <ButtonGroup key={group.id} group={group} />
              ))}
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Button flexGrow onClick={() => addGroup(id)}>
                Add Group
              </Button>
            </Grid.Row>
          </Grid.Column>
        </>
      )}
    </Page>
  );
};

export default ListEdit;
