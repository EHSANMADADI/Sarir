import React, { useRef } from "react";
import BgEmam from "../Componnent/BgEmam";
import Container from "../Componnent/Container";

export default function FerstPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      <BgEmam onScrollDown={handleScrollDown} />
      <div ref={containerRef}>
        <Container />
      </div>
    </div>
  );
}
