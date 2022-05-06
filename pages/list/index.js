import Button from 'components/Button';
import Grid from 'components/Grid';
import Page from 'components/Page';
import { useLiveQuery } from 'dexie-react-hooks';
import useLists from 'hooks/database/useLists';
import { useRouter } from 'next/router';

import onUpload from 'util/upload';

function DataView() {
  const { getAllLists } = useLists();
  const listsData = useLiveQuery(getAllLists, []);

  if (!listsData) return null;
  if (listsData.length == 0)
    return (
      <Grid.Row>
        <Button flexGrow>No lists found</Button>
      </Grid.Row>
    );

  return listsData.map((e) => (
    <Grid.Row key={e.id}>
      <Button flexGrow id={e.id} href={`/list/${e.id}`}>
        {e.name}
      </Button>
    </Grid.Row>
  ));
}

export default function AllLists() {
  // const { addExampleData, addBlank } = useUtil();
  const { addExampleData, addBlankList } = useLists();
  const router = useRouter();

  return (
    <Page>
      <Page.Content>
        <Page.Title>Lists</Page.Title>
        <Grid.Column flexGrow>
          <DataView />
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <Button flexGrow noWrap onClick={addExampleData}>
              Add example data
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Button
              flexGrow
              noWrap
              onClick={() => {
                document.getElementById('fileupload').click();
              }}
            >
              Import list...
            </Button>
            <input
              type="file"
              accept="application/json"
              id="fileupload"
              onChange={(e) => onUpload(e, router)}
            />
          </Grid.Row>
          <Grid.Row>
            <Button flexGrow noWrap onClick={addBlankList}>
              Add new list
            </Button>
          </Grid.Row>
        </Grid.Column>

        <script id="data" type="application/json"></script>
      </Page.Content>
    </Page>
  );
}
