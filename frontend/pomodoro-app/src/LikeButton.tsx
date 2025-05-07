// LikeButton.tsx
import React from "react";

interface LikeButtonProps {
  message: string;
}


function LikeButton({ message }: LikeButtonProps) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px" }}>
      <p>자식 컴포넌트에서 받은 메시지:</p>
      <strong>{message}</strong>
    </div>
  );
}

export default LikeButton;
