import { useEffect, useState } from "react";
import { useQuery } from "../../../../shared";
import { RecordList } from "../../components";

export function Records() {
  const [data, setData] = useState({});
  const params = useQuery();
  useEffect(() => {
    // const service = new UserRecordService();
    const getData = () => {
      console.log("\n \n file: index.tsx:10 \n Records \n params:", params);
      setData({
        "2023-04-14": 8.00,
        "2023-04-15": 13.98,
      });
      console.log("loaded");
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {Object.entries(data).map((record: any) => (
          <RecordList day={record[0]} hours={record[1]} />
        ))}
      </ol>
    </div>
  );
}
