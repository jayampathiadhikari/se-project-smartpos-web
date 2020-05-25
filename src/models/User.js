import React from 'react';

export default class User extends React.Component{
  constructor(json){
    super(null);
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.userID = json.userID;
    this.userType = json.userType;
    this.region = json.region;
  }
};