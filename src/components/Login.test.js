import React from 'react';
import { Route } from 'react-router';
import { mount } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<Login />);
  });
  
  it('has email, password and submit button', () => {
    const email = wrapper.find('input[name="email"]');
    const password = wrapper.find('input[name="password"][type="password"]');
    const submit = wrapper.find('button[type="submit"]');

    expect(email && password && submit).toBeTruthy();
  });

  describe('field validations', () => {
    const invalidRegex = /is invalid/i;
    const requiredRegex = /is required/i;
    const match = regex => wrapper.html().match(regex);
    let email = null;
    let password = null;

    beforeEach(() => {
      email = wrapper.find('input[name="email"]');
      password = wrapper.find('input[name="password"][type="password"]');
    });

    it('should output error message for invalid email', () => {
      email.simulate('change', { target: { value: 'not-an-email' }});
      expect(match(invalidRegex)).toBeTruthy();
    });

    it('should not output error message for valid email', () => {
      email.simulate('change', { target: { value: 'pedropb@i2x.ai' }});
      expect(match(invalidRegex)).toBeFalsy();
    });

    it('should output required message for empty email', () => {
      email.simulate('change', { target: { value: '' }});
      expect(match(requiredRegex)).toBeTruthy();
    });

    it('should not output required message for any email', () => {
      email.simulate('change', { target: { value: 'aaaaaa' }});
      expect(match(requiredRegex)).toBeFalsy();
    });

    it('should output required message for empty password', () => {
      password.simulate('change', { target: { value: '' }});
      expect(match(requiredRegex)).toBeTruthy();
    });

    it('should not output required message for any password', () => {
      password.simulate('change', { target: { value: 'aaaaaa' }});
      expect(match(requiredRegex)).toBeFalsy();
    });
  });

  describe('form submission', () => {
    let email, password, submit;
    beforeEach(() => {
      email = wrapper.find('input[name="email"]');
      password = wrapper.find('input[name="password"][type="password"]');
      submit = wrapper.find('button[type="submit"]');
      
      // Spying on handleSubmit
      wrapper.instance().handleSubmit = jest.fn(() => true);
      wrapper.update();
    });

    it('should call handleSubmit when a valid form submits', () => {
      // Simulating a valid submit
      email.simulate('change', { target: { value: 'pedropb@i2x.ai' }});
      password.simulate('change', { target: { value: 'aaaaaa' }});
      submit.simulate('submit');

      expect(wrapper.instance().handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call handleSubmit when an invalid form submits', () => {
      // Simulating an valid submit
      email.simulate('change', { target: { value: 'not-an-email' }});
      password.simulate('change', { target: { value: '' }});
      submit.simulate('submit');

      expect(wrapper.instance().handleSubmit).toHaveBeenCalledTimes(0);
    });
  });

});