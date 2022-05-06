import styles from 'styles/TextBlock.module.scss';

const TextBlock = ({ children }) => (
  <div className={styles['text-block']}>{children}</div>
);

export default TextBlock;
