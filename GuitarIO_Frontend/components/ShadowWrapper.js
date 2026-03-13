import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

const ShadowWrapper = ({ children }) => {
  const hostRef = useRef(null);
  const shadowRootRef = useRef(null);

  useEffect(() => {
    if (!shadowRootRef.current) {
      shadowRootRef.current = hostRef.current.attachShadow({ mode: "open" });
      const mountPoint = document.createElement("div");
      shadowRootRef.current.appendChild(mountPoint);
      createRoot(mountPoint).render(children);
    }
  }, [children]);

  return <div ref={hostRef} />;
};

export default ShadowWrapper;