import { useEffect, useState } from 'react';


// useful to set parent's width to absolute children
// And make the children able to resize along with window resizing
//
export const useElementSize = (element: any) => {
  const [ elementSize, setElementSize ] = useState<Partial<HTMLElement>>({
    offsetHeight: undefined,
    offsetWidth: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setElementSize({
        ...element,
      })
    }
    element.addEventListener("resize", handleResize);

    return () => element.removeEventListener("resize", handleResize);
  },[element]);

  return elementSize;
}
