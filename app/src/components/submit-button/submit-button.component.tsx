import React from "react";
import "./submit-button.component.scss";

interface Props {
  children?: React.ReactNode;
  height: string;
  width: string;
  onClick: () => void;
}

export const SubmitButton: React.FC<Props> = ({
  children,
  height,
  onClick,
  width,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

// export default SubmitButton;
