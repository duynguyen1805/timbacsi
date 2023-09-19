import { useState } from "react";

type Data = {
  name: string;
  time: string;
};

const data: Data[] = [
  { name: "Nguyễn Văn A", time: "SA_001" },
  { name: "Nguyễn Văn B", time: "TR_001" },
  { name: "Nguyễn Văn C", time: "CH_001" },
];

const MyComponent = () => {
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const filteredData =
    selectedInputs.length === 0
      ? data
      : data.filter((item) =>
          selectedInputs.some((input) => item.time.includes(input))
        );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedInputs((prevInputs) => [...prevInputs, name]);
    } else {
      setSelectedInputs((prevInputs) =>
        prevInputs.filter((input) => input !== name)
      );
    }
  };

  const areAllInputsSelected = selectedInputs.length === 3;

  return (
    <div>
      <input
        type="checkbox"
        className="h-5 w-5"
        name="SA"
        checked={selectedInputs.includes("SA")}
        onChange={handleCheckboxChange}
      />
      <input
        type="checkbox"
        className="h-5 w-5"
        name="TR"
        checked={selectedInputs.includes("TR")}
        onChange={handleCheckboxChange}
      />
      <input
        type="checkbox"
        className="h-5 w-5"
        name="CH"
        checked={selectedInputs.includes("CH")}
        onChange={handleCheckboxChange}
      />
      <div>
        Filtered data:
        {filteredData.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
      <button onClick={() => setSelectedInputs([])}>Clear Selection</button>
    </div>
  );
};

export default MyComponent;
