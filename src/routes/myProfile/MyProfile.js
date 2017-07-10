
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ProfileAside from './../../components/ProfileAside/ProfileAside';
import cx from 'classnames';
import Link from '../../components/Link';
import Footer from '../../components/Footer';
import  history from './../../history';
import {Button, FormGroup, ControlLabel, Alert, Radio, HelpBlock, Form, FormControl} from 'react-bootstrap';

class MyProfile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isValidData: false,
      activeTab: "Event",
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
			isLoaded: true,
    };
		this.setActiveTabState = this.setActiveTabState.bind(this);
  }
	setActiveTabState = (label) => {
		this.setState({
			activeTab: label
    })
	};
  render() {
    return (
      <div className="row myProfile">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <ProfileAside setActiveTabState={this.setActiveTabState} />
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 ">
								{ this.state.isLoaded && <div className="main-box">
                  <Tabs onSelect={ (index, label) => {
										this.setActiveTabState(label)
									} } selected={this.state.activeTab || "Events" } className="tabs-wrapper">

                    <Tab label="Events">
                      <div className="row">
                        Event here
                      </div>
                    </Tab>
                    <Tab label="Profile">
                      <div className="row">
                        Profile
                      </div>
                    </Tab>
                  </Tabs>
                </div>}

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  counter: state.counter,
  USER_DATA: state.USER
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MyProfile));
