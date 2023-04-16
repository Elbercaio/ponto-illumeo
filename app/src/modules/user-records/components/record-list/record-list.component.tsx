import React from "react";

interface Props {
  day: string;
  hours: number;
}

export const RecordList: React.FC<Props> = ({ day, hours }) => {
  return <li className="record">{`${day}:${hours}`}</li>;
};
