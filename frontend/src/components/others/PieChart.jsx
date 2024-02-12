import React, { useEffect } from "react";
import * as echarts from "echarts";

const PieChart = ({ data, color, id, pieChartClass, wrapperClass }) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id));
    const options = {
      legend: {
        orient: window.innerWidth > 740 ? "vertical" : "horizontal",
        x: window.innerWidth > 740 ? "left" : "center",
        data: data,
        top: window.innerWidth > 740 ? 40 : 0,
        // left: 0,
        textStyle: {
          color: "black",
          fontSize: 12,
          fontWeight: "bold",
        },
        itemGap: 10,
      },
      series: [
        {
          type: "pie",
          color: color,
          radius: ["40%", "80%"],
          avoidLabelOverlap: false,

          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          itemStyle: {
            borderWidth: 4,
            borderColor: "#fff",
            borderRadius: 6,
          },
          data: data,
        },
      ],
    };
    myChart.setOption(options);

    return () => {
      myChart.dispose();
    };
  }, [data, color, id]);

  return (
    <div className={wrapperClass}>
      <div
        style={{ display: "flex", justifyContent: "space-between !important" }}
        id={id}
        className={` ${pieChartClass} flex flex-wrap justify-between`}
      ></div>
    </div>
  );
};

export default PieChart;
