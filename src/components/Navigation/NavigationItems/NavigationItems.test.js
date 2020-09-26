import React from "react";
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let warper;
  beforeEach(() => {
    warper = shallow(<NavigationItems />);
  });

  it("Should render two <NavigationItems /> elements if not authenticated", () => {
    expect(warper.find(NavigationItem)).toHaveLength(2);
  });
  it("Should render three <NavigationItems /> elements if authenticated", () => {
    // warper = shallow(<NavigationItems isAuthenticated />);
    warper.setProps({ isAuthenticated: true });
    expect(warper.find(NavigationItem)).toHaveLength(3);
  });

  it("Should render two <NavigationItems /> elements if authenticated", () => {
    warper.setProps({ isAuthenticated: true });
    expect(
      warper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
