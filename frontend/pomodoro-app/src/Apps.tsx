import React, { useState } from "react";
import LikeButton from "./LikeButton";

function Apps() {
  const message = "안녕하세요! 이것은 부모에서 보낸 메시지입니다.";

  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <LikeButton message={message} />
    </div>
  );
}

export default Apps
