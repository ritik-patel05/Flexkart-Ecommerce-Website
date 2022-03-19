import { useEffect, useRef } from "react";

const useDocumentTitle = (title) => {
  const currentTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = currentTitle;
    };
  }, []);
};

export default useDocumentTitle;
