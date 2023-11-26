import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  var listener = false;
  useEffect(() => {
   
  })
  useEffect(() => {
    const handleResize = () => {
      console.log("add lister");
      setIsMobile(window.innerWidth < 768);
    };
    if (!listener) {
      window.addEventListener("resize", handleResize);
      listener = true;
    }

    return function () {
      window.removeEventListener("resize", handleResize);
      listener = false;
      console.log("remove lister");
    };
  }, []);
  return { isMobile };
};
