// A JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js
import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chaiJquery from 'chai-jquery';

import reducers from './../src/reducers';

// Setup testing environment to run like a browser in the command line
  // we use global vs. window because we are in a node environment inside the terminal
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// Build 'renderComponent' helper that should render a given React class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)} >
      <ComponentClass {...props} />
    </Provider>);

  // when renderComponent is called, it returns our mock HTML element
  // we wrap it in a jquery element, so we have access to the jquery methods/magic
  return $(ReactDOM.findDOMNode(componentInstance)); // This is what produces or is our reference to our mock HTML
}

// Build the helper for simulating events 
  // places the 'simulate' method on the jquery object '$'
  // allows us to do something like $('div').simulate()
$.fn.simulate = function(eventName, value) {
  // if a value is passed in as an argument
  // this.val(from jquery) will equal the value
  if(value){
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

// Setup Chai-jquery
chaiJquery(chai, chai.util, $);

export { expect, renderComponent };