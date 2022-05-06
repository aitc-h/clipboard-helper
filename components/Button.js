import useColor from 'hooks/useColor';
import Link from 'next/link';
import Globals from 'styles/Globals.module.scss';
import styles from 'styles/Button.module.scss';
import filterProps from 'util/filterProps';
import classname from 'util/classname';

const Button = (props) => {
  const { color, newColor, show } = useColor();

  const buttonClass = new classname(
    'button',
    styles.button,
    [props.flexGrow, Globals.grow],
    [props.noWrap, styles['no-wrap']],
    [props.active, styles.active],
    [show, styles[`bg-${'roygbiv'[color]}`]]
  );

  const { type, children, href } = props;
  var { onClick } = props;
  if (!onClick) onClick = () => {};
  const exc = filterProps(props, [
    'flexGrow',
    'noWrap',
    'active',
    'type',
    'children',
    'href',
    'onClick',
  ]);

  if (href) {
    return (
      <Link href={href}>
        <a className={buttonClass} {...exc}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        type={type || 'button'}
        className={buttonClass}
        onClick={(event) => {
          newColor();
          onClick(event);
        }}
        {...exc}
      >
        {children}
      </button>
    );
  }
};

export default Button;
