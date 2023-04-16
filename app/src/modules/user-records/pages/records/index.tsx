import { useState } from "react";
import { useLocation } from "react-router-dom";
import { RecordList } from "../../components";
import { UserRecordService } from "../../services/user-record.service";

export function Records() {
  const service = new UserRecordService();
  const [data, setData] = useState([{}]);
  const params = new URLSearchParams(useLocation().search);
  console.log("\n \n file: index.tsx:10 \n Records \n params:", params);

  // useEffect(() => {
  // service.getDailyUserRecord(params?.code)
  //   .then((res) => {
  //     setData(res.data)
  //   })
  // })
  return (
    <div>
      <h1>this is the clock</h1>
      <ol>
        {data.map((time: any) => (
          <RecordList time={time} />
        ))}
      </ol>
    </div>
  );
}
