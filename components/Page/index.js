import styles from 'styles/Page.module.scss';

import PageTitle from 'components/Page/Title';
import Header from 'components/Page/Header';
import Footer from 'components/Page/Footer';

const Page = ({ children, id, addListHeader }) => {
  return (
    <div className={`page ${styles.page}`}>
      <Header.Main />
      {addListHeader ? <Header.List id={id} /> : null}
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

const Content = ({ children }) => (
  <div className={`content ${styles.content}`}>{children}</div>
);

Page.Title = PageTitle;
Page.Content = Content;
Page.Header = Header;
Page.Footer = Footer;

export default Page;
