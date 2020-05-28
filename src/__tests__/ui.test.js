import React from 'react';
import { shallow } from 'enzyme';
import HeaderNoCards from "../components/Headers/HeaderNoCards";

/**
 *Always begin with shallow
 If componentDidMount or componentDidUpdate should be tested, use mount
 If you want to test component lifecycle and children behavior, use mount
 If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render
 */

//shallow for unit testing
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    let wrapper = (<HeaderNoCards />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});



