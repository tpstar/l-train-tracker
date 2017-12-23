import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import AppNavigator from "./AppNavigator";

class AppNavigation extends Component {
  render() {
    const { nav, dispatch } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppNavigation);
