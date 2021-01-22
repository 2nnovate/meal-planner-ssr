import { useEffect, useState } from 'react';

export default (ref) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref || !ref.current) return;

    setWidth(ref.current.offsetWidth);
  }, [ref]);

  return width;
};
