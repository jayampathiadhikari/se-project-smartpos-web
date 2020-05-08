import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import React from "react";


class CustomDropdown extends React.Component{
  state ={
    dropdownOpen: false,
    selected: this.props.initial
  };

  toggle = ()=> {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleCountrySelection(selectedCountry) {
    console.log(selectedCountry);
    this.setState({
      selected: selectedCountry.name
    });
    this.props.onSelect(selectedCountry);
    // this.props.onSetCountry(selectedCountry);
  }

  render(){
    let countryNames = this.props.data.map((country, index) => {
      return (
        <DropdownItem
          key={index.toString()}
          onClick={() => {this.handleCountrySelection(country)}}
        >
          {country.name}
        </DropdownItem>
      );
    });
    return(
      <Dropdown size="md"  isOpen={this.state.dropdownOpen} toggle={this.toggle} disabled={this.props.disabled}>
        <DropdownToggle caret>{this.state.selected}</DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 130,
                  },
                };
              },
            },
          }}
        >
          {countryNames}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default CustomDropdown;
