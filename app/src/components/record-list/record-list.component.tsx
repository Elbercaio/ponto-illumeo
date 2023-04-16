import React from "react";

interface Props {
  time: Date;
}

export const RecordList: React.FC<Props> = ({ time }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return <li className="record">{`${hours}:${minutes}:${seconds}`}</li>;
};

