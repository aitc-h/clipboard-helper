const filterProps = (props, keysToRemove) =>
  Object.keys(props)
    .filter((key) => !keysToRemove.find((k) => k == key))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: props[key] });
    }, {});

export default filterProps;
