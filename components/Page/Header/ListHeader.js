import Header from 'components/Page/Header';
import Link from 'next/link';

const ListHeader = ({ id }) => (
  <Header>
    <Header.Left>
      <Link href={`/list/${id}`}>View</Link>
      <Link href={`/list/${id}/edit`}>Edit</Link>
      <Link href={`/list/${id}/settings`}>Settings</Link>
    </Header.Left>
  </Header>
);

export default ListHeader;
