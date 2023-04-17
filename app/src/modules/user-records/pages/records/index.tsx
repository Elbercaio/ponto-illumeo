import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IDayTime, IUserRecord, UserRecordType } from '../../../../shared';
import { RecordList, SubmitButton } from '../../components';
import { UserRecordService } from '../../services/user-record.service';
import './index.scss';

import 'react-toastify/dist/ReactToastify.css';

export function Records() {
  const [data, setData] = useState<IDayTime[]>();
  const [todayTime, setTodayTime] = useState<string>('00h 00m');
  const [incompleteShift, setIncompleteShift] = useState<boolean>(false);

  const { search } = useLocation();
  const code = useMemo(() => {
    const query = new URLSearchParams(search).toString();

    return query.replace('code=', '');
  }, [search]);
  const service = useMemo(() => {
    return new UserRecordService();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await service.getDailyUserRecord(code).then((res) => {
        const data = res?.data;
        setData(res.data);

        if (data[0].incompleteShift) {
          const today = data.shift();
          setTodayTime(today?.time || '00h 00m');
          setIncompleteShift(true);
        }
        setData(data);
      });
    };
    getData();
  }, [code]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: IUserRecord = {
      userCode: code,
      recordType: incompleteShift ? UserRecordType.end : UserRecordType.start,
      timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
    };
    await service
      .postUserRecord(body)
      .then(() => {
        setIncompleteShift(!incompleteShift);
        toast.success('Registro feito com sucesso');
      })
      .catch((error) => {
        toast.error(`${error.response.status} - ${error.response.data}`);
      });
  };

  return (
    <div className="records">
      <div className="header">
        <div className="top">
          <h3>Relógio de ponto</h3>
          <h3 className="code">#{code}</h3>
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
          {data?.map((record: IDayTime, index: number) => (
            <RecordList day={record?.day} time={record?.time} key={index} />
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}
