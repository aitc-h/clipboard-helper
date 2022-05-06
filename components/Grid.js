import Globals from 'styles/Globals.module.scss';
import columnStyles from 'styles/Column.module.scss';
import rowStyles from 'styles/Row.module.scss';
import classname from 'util/classname';

const Column = ({ children, flexGrow }) => {
  const columnClass = new classname('column', columnStyles.column, [
    flexGrow,
    Globals.grow,
  ]);
  return <div className={columnClass}>{children}</div>;
};

const Row = ({ children }) => (
  <div className={`row ${rowStyles.row}`}>{children}</div>
);

const Grid = ({ children }) => <>{children}</>;
Grid.Row = Row;
Grid.Column = Column;

export default Grid;
