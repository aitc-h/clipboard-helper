import Header from 'components/Page/Header';
import Link from 'next/link';

const MainHeader = () => (
  <Header>
    <Header.Left>
      <Header.Brand>
        <Link href="/">
          <a>Clipboard Helper</a>
        </Link>
      </Header.Brand>
      <Link href="/list">Lists</Link>
      <Link href="/settings">Settings</Link>
    </Header.Left>
    <Header.Right>
      <Link href="/about">About</Link>
    </Header.Right>
  </Header>
);

export default MainHeader;
