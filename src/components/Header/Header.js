
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';
import _ from 'lodash';
class Header extends React.Component {

  render() {
    if (!_.isEmpty(this.props.user) && !_.isEmpty(this.props.user.token)) {
    }
    return (
      <div>
        <div>
          <Navigation user={this.props.user}/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
