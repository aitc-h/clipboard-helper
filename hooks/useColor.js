import { useState } from 'react';

const useColor = () => {
  const [color, setColor] = useState(Math.floor(Math.random() * 6));
  const newColor = () => setColor(Math.floor(Math.random() * 6));
  const show =
    Math.floor(Math.log2(new Date().getUTCMonth() + 2) * 3) == Math.pow(2, 3);

  return {
    color,
    newColor,
    show,
  };
};

export default useColor;
