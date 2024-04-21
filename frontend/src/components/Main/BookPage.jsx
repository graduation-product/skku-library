import React from "react";
import { useLocation } from "react-router-dom";

function BookPage() {
  const location = useLocation();
  const url = location.state.url;
  return (
    <div className="w-100">
      <iframe src={url} style={{ width: "100%", height: "520px" }} />
    </div>
  );
}

export default BookPage;
