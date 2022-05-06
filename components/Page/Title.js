import styles from 'styles/Page.module.scss';

const PageTitle = ({ children }) => (
  <div className={`title ${styles.title}`}>{children}</div>
);
export default PageTitle;
