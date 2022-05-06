import Globals from 'styles/Globals.module.scss';
import styles from 'styles/Input.module.scss';
import filterProps from 'util/filterProps';
import classname from 'util/classname';

const Input = (props) => {
  const inputClass = new classname('input', styles.input, [
    props.flexGrow,
    Globals.grow,
  ]);

  const { id, onChange, value, placeholder } = props;
  const exc = filterProps(props, ['flexGrow', 'id']);

  return (
    <input
      type="text"
      className={inputClass}
      {...{ id, onChange, value, placeholder }}
      {...exc}
    />
  );
};

export default Input;
