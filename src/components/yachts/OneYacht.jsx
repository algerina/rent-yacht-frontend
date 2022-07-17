import React from "react";

function OneYacht(props) {
  console.log(props);
  return <div>{props.yacht.name}</div>;
}

export default OneYacht;
