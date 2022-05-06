import Button from 'components/Button';
import Page from 'components/Page';
import Grid from 'components/Grid';

import { useLiveQuery } from 'dexie-react-hooks';
import useButtons from 'hooks/database/useButtons';
import useGroups from 'hooks/database/useGroups';
import useLists from 'hooks/database/useLists';
import useActive from 'hooks/useActive';
import useQueryID from 'hooks/useQueryID';
import copy from 'util/copy';

const ButtonGroup = ({ group, active, setActive }) => {
  const { getButtonsFor } = useButtons();
  const buttonsData = useLiveQuery(() => getButtonsFor(group.id), [group]);

  return (
    <Grid.Column id={group.id}>
      {buttonsData &&
        buttonsData?.map((button) => (
          <Grid.Row key={button.id}>
            <Button
              flexGrow
              onClick={(e) => {
                setActive([group.id, button.id]);
                copy(e);
              }}
              active={group.id == active[0] && button.id == active[1]}
              data-value={button.text}
            >
              {button.text}
            </Button>
          </Grid.Row>
        ))}
    </Grid.Column>
  );
};

const ListView = () => {
  const id = useQueryID();

  const { active, setActive } = useActive();
  const { getList } = useLists();
  const { getGroupsFor } = useGroups();

  const listData = useLiveQuery(async () => await getList(id), [id]);
  const groupsData = useLiveQuery(async () => await getGroupsFor(id), [id]);

  return (
    <Page id={id} addListHeader>
      <Page.Title>{listData?.name}</Page.Title>
      <Grid.Column>
        {groupsData?.map((group) => (
          <ButtonGroup
            key={group.id}
            group={group}
            active={active}
            setActive={setActive}
          />
        ))}
      </Grid.Column>
    </Page>
  );
};

export default ListView;
