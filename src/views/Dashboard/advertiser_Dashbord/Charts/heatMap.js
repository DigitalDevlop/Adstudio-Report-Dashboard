import React from "react";
import Heatmap from "react-heatmap-grid";

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
const yLabels = ["Sun", "Mon", "Tue"];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );
const CustomHeatMap = () => {
  return (
    <div className="my-5">
      <Heatmap xLabels={xLabels} yLabels={yLabels} data={data} />
    </div>
  );
};

export default CustomHeatMap;
