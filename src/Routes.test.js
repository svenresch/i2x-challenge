import React from 'react';
import { Route } from 'react-router';
import { shallow } from 'enzyme';
import Routes from './Routes';
import Login from './components/Login';
import Logout from './components/Logout';
import Recordings from './components/Recordings';


describe('<Routes />', () => {
  const wrapper = shallow(<Routes />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});

  it('has /login route', () => {
    expect(pathMap['/login']).toBe(Login);
  });

  it('has /logout route', () => {
    expect(pathMap['/logout']).toBe(Logout);
  });

  it('has /recordings route', () => {
    expect(pathMap['/recordings']).toBe(Recordings);
  });
});