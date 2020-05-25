import React from "react";
import AddRoute from "../../components/AddRoute";
import UserHeader from "../../components/Headers/UserHeader";

export default class TestComponent extends React.Component{
  render() {
    return(
    <>
      <UserHeader />
      <AddRoute modalOpen={true} />
    </>

    )
  }
}