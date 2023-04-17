import React from 'react';
import './record-list.component.scss';

interface Props {
  day: string;
  time: string;
}

export const RecordList: React.FC<Props> = ({ day, time }) => {
  return (
    <li className="record">
      <div className="day">{day}</div>
      <div className="time">{time}</div>
    </li>
  );
};
