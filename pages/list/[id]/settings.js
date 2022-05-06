import Button from 'components/Button';
import Grid from 'components/Grid';
import Page from 'components/Page';
import { useLiveQuery } from 'dexie-react-hooks';
import useLists from 'hooks/database/useLists';
import useQueryID from 'hooks/useQueryID';
import exportList from 'util/exportList';

const ListSettings = () => {
  const id = useQueryID();

  const { getList, confirmDeleteList } = useLists();

  const list = useLiveQuery(async () => getList(id), [id]);

  return (
    <Page id={id} addListHeader>
      <Page.Title>{list?.name}</Page.Title>
      <Grid.Column>
        {list && (
          <>
            <Grid.Row>
              <Button flexGrow onClick={() => exportList(id)}>
                Export
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button data-list-id={id} flexGrow onClick={confirmDeleteList}>
                Delete
              </Button>
            </Grid.Row>
          </>
        )}
      </Grid.Column>
    </Page>
  );
};

export default ListSettings;
