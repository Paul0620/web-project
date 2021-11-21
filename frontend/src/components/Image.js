import React from "react";

function Image({ image }) {
  return (
    <div>
      <img src={image.image} alt={image.post} style={{ width: "100%" }} />
    </div>
  );
}

export default Image;
