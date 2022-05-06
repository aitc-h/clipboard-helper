import ListHeader from 'components/Page/Header/ListHeader';
import MainHeader from 'components/Page/Header/MainHeader';
import styles from 'styles/Header.module.scss';

const Header = ({ children }) => (
  <div className={`header ${styles.header}`}>{children}</div>
);

const Left = ({ children }) => (
  <div className={`header-left ${styles.left}`}>{children}</div>
);

const Right = ({ children }) => (
  <div className={`header-right ${styles.right}`}>{children}</div>
);

const Brand = ({ children }) => (
  <div className={`brand ${styles.brand}`}>{children}</div>
);

Header.Brand = Brand;
Header.Left = Left;
Header.List = ListHeader;
Header.Main = MainHeader;
Header.Right = Right;

export default Header;
