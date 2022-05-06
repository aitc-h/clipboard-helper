import { useState } from 'react';

const defaultValue = [null, null];

const useActive = () => {
  const [active, _setActive] = useState(defaultValue);

  const setActive = (...args) => {
    _setActive(...args);
    setTimeout(() => {
      _setActive(defaultValue);
    }, 5000);
  };

  return { active, setActive };
};

export default useActive;
