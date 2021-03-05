import React, { useRef, useEffect, useState } from "react";
import { allPosts } from "./posts";
import {
  select,
  curveLinear,
  axisBottom,
  axisLeft,
  line,
  scaleLinear,
} from "d3";

const CompTwo = () => {
  const postObj = {};

  allPosts.forEach((post) => {
    var date = new Date(parseInt(post.createdAt));
    var year = date.getFullYear();
    var month = date.getMonth();
    if (year === 2019) {
      month in postObj ? postObj[month]++ : (postObj[month] = 1);
    }
  });
  const postObjM = {};
  postObjM["ian"] = postObj[0];
  postObjM["feb"] = postObj[1];
  postObjM["mar"] = postObj[2];
  postObjM["apr"] = postObj[3];
  postObjM["mai"] = postObj[4];
  postObjM["iun"] = postObj[5];
  postObjM["iul"] = postObj[6];
  postObjM["aug"] = postObj[7];
  postObjM["sep"] = postObj[8];
  postObjM["oct"] = postObj[9];
  postObjM["nov"] = postObj[10];
  postObjM["dec"] = postObj[11];

  let dataTimes = [];
  Object.keys(postObjM).forEach((key) => {
    // dataArr.push({ month: key, times: postObjM[key] }),
    dataTimes.push(postObjM[key]);
  });

  const [data, setData] = useState(dataTimes);

  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 600]);
    const yScale = scaleLinear()
      .domain([Math.min(...data) - 15, Math.max(...data) + 15])
      .range([300, 0]);

    const xAxis = axisBottom(xScale).tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", "translateY(300px)").call(xAxis);
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveLinear);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef} className="svgg">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
};

export default CompTwo;
