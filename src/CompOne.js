import React, { useState } from "react";
import { allPosts } from "./posts";

// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { letterFrequency } from "@visx/mock-data";
// import { Group } from "@visx/group";
// import { Bar } from "@visx/shape";
// import { scaleLinear, scaleBand } from "@visx/scale";
// import { gql } from "@apollo/client";

const CompOne = () => {
  //   const [posts, setPosts] = useState([]);

  const postObj = {};

  allPosts.forEach((post) => {
    var date = new Date(parseInt(post.createdAt));
    var year = date.getFullYear();
    var month = date.getMonth();
    if (year == 2019) {
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
    </div>
  );
};

export default CompOne;
