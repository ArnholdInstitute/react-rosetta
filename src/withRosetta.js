import React, { Component } from 'react';
import Rosetta from './Rosetta';

const withRosetta = (WrappedComponent, translations, isDictionary) => (
  class WithRosetta extends Component {
      render() {
          return (
              <Rosetta translations={translations} dictionary={isDictionary}>
                  <WrappedComponent {...this.props} />
              </Rosetta>
          );
      }
  }
);
export default withRosetta;
