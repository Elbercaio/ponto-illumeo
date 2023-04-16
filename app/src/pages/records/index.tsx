import { RecordList } from "../../components";

export function Records() {
  const times = [
    new Date(),
    new Date(Date.now() - 3600000), // one hour ago
    new Date(Date.now() + 3600000), // one hour from now
  ];
  return (
    <div>
      <h1>this is the clock</h1>
      <ol>
        {times.map((time) => (
          <RecordList time={time} />
        ))}
      </ol>
    </div>
  );
}
