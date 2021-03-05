import React from "react";
import { allPosts } from "./posts";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";

const CompOne = () => {
  //   const [posts, setPosts] = useState([]);

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
  console.log(postObjM);
  console.log(allPosts);

  let dataArr = [];
  Object.keys(postObjM).forEach((key) =>
    dataArr.push({ month: key, times: postObjM[key] })
  );
  console.log(dataArr);

  const data = dataArr;
  //   const data = postObj;

  // Define the graph dimensions and margins
  const width = 500;
  const height = 500;
  const margin = { top: 220, bottom: 20, left: 20, right: 20 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = (d) => d.month;
  const y = (d) => d.times * 1000;

  // And then scale the graph by our data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.5,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  return (
    <div>
      {Object.keys(postObjM).map((key) => {
        return (
          <div key={key}>
            <p>
              {key} : {postObjM[key]}
            </p>
          </div>
        );
      })}

      <div>
        <svg width={width} height={height}>
          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#black"
                />
              </Group>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CompOne;
