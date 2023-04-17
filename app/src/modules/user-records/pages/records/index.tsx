/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IDayTime } from '../../../../shared';
import { RecordList, SubmitButton } from '../../components';
import './index.scss';

export function Records() {
  const [data, setData] = useState<IDayTime[]>();
  const [todayTime, setTodayTime] = useState<string>();
  const [incompleteShift, setIncompleteShift] = useState<boolean>();

  const { search } = useLocation();
  const params = useMemo(() => {
    const query = new URLSearchParams(search).toString();

    return query.replace('code=', '');
  }, [search]);
  useEffect(() => {
    // const service = new UserRecordService();
    const getData = () => {
      const response = [
        { day: '2023-04-15', time: '04h 00m', incompleteShift: true },
        { day: '2023-04-14', time: '04h 00m' },
        { day: '2023-04-13', time: '04h 00m' },
        { day: '2023-04-12', time: '04h 00m' },
        { day: '2023-04-11', time: '04h 00m' },
        { day: '2023-04-10', time: '04h 00m' },
        { day: '2023-04-09', time: '04h 00m' },
        { day: '2023-04-08', time: '04h 00m' },
        { day: '2023-04-07', time: '04h 00m' },
      ];
      if (response[0].incompleteShift) {
        const today = response.shift();
        setTodayTime(today?.time);
        setIncompleteShift(true);
      } else {
        setTodayTime('00h 00m');
      }
      setData(response);
      console.log(new Date('2023-04-15'));
    };
    getData();
  }, []);

  // useEffect(() => {
  // service.getDailyUserRecord(params?.code)
  //   .then((res) => {
  //     setData(res.data)
  //   })
  // })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(incompleteShift ? 'end' : 'start');
  };
  return (
    <div className="records">
      <div className="header">
        <div className="top">
          <h3>Relógio de ponto</h3>
          <h3 className="code">#{params}</h3>
        </div>
        <div className="bot">
          <span>Usuário</span>
        </div>
      </div>
      <div className="today">
        <h1>{todayTime}</h1>
        <h3>Horas de hoje</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <SubmitButton>Hora de {incompleteShift ? 'saída' : 'entrada'}</SubmitButton>
      </form>
      <h3>Dias anteriores</h3>
      <div className="day-time">
        <ul className="list">
          {data?.map((record) => (
            <RecordList day={record?.day} time={record?.time} />
          ))}
        </ul>
      </div>
    </div>
  );
}
