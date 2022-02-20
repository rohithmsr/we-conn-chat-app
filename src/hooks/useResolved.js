import { useEffect, useState } from 'react';

export const useResolved = (...vals) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(vals.every(v => v !== undefined));
  }, [vals]);

  // return true if resolved otherwise false
  return resolved;
};
