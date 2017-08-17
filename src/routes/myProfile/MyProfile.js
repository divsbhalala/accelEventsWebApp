
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import ProfileAside from './../../components/ProfileAside/ProfileAside';
import { getProfileData } from './action/signup_action';
import ProfileField from './ProfileField';
import cx from 'classnames';
import Link from '../../components/Link';
import Footer from '../../components/Footer';
import history from './../../history';
import { Button, FormGroup, ControlLabel, Alert, Radio, HelpBlock, Form, FormControl } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import {setEventsByUrl} from './../../routes/admin/event/action/index';
class MyProfile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isValidData: false,
      activeTab: "Events",
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      isLoaded: true,
      user: null,
      data: null,
    };
    this.setActiveTabState = this.setActiveTabState.bind(this);
    this.updateAllProfile = this.updateAllProfile.bind(this);
  }
  componentDidMount() {
    this.props.getProfileData().then((resp) => {
      this.setState({
        user: resp && resp.data,
        message: resp.data.firstName,
      });
    }).catch((error) => {
      history.push('/404');
    });
 }
	setActiveTabState = (label) => {
		if(label){this.setState({
			activeTab: label,
    });
	}};

  updateAllProfile = (fieldName,value) => {
    if(this.state && this.state.user && this.state.user[fieldName] && value){
      if(this.state.user[fieldName] !== value){
        let newUser = this.state.user;
        newUser[fieldName] = value;
        this.setState({
          user: newUser
        });
      }
    }
  };
  setEventsByUrl = (eventUrl) => {
    this.props.setEventsByUrl(eventUrl).then((resp) => {
      if(resp.message){
        window.location.replace('/host/dashboard/home');
      }
    });
  };
  render() {
    return (
      <div className="my-profile-wrap">
        {this.state.user ?
        <div id="content-wrapper">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4">
              <ProfileAside setActiveTabState={this.setActiveTabState} user={this.state.user && this.state.user} />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-8 ">
              { this.state.isLoaded && <div className="main-box">
                <Tabs
                  onSelect={(index, label) => {
                    this.setActiveTabState(label);
                  }} selected={this.state.activeTab || 'Events'} className="tabs-wrapper"
                >

                  <Tab label="Events">
                    <div className="row">
                      <div className="tab-content">
                        <div>
                          <form id="newEventForm" method="POST" action="/AccelEventsWebApp/u/create/newevent">
                            <button style={{ "backgroundColor": "orange","marginBottom": "10px"}} type="submit" className="btn btn-default btn-block">
                              Create New Event
                            </button>
                          </form>
                        </div>
                        <table className="table table-striped table-hover table-bordered" cellSpacing={0} id="auctionevents">
                          <thead>
                            <tr>
                              <th>Event</th>
                              <th>END Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.user && this.state.user.userEventInfo && this.state.user.userEventInfo.map((item, index) =>
                                <EventList key={index} item={item} setEventsByUrl={this.setEventsByUrl}/>,
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Profile">
                    <div className="row">
                      <div className="tab-content">
                        <div className="tab-pane fade" id="tab-events">
                          <div>
                            <form id="newEventForm" method="POST" action="/AccelEventsWebApp/u/create/newevent">
                              <button type="submit" className="btn btn-default btn-block">
                                Create New Event
                              </button>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade active in" id="tab-profile">
                          <ProfileField title="Firstname" fieldName="firstName" fieldValue={this.state.user && this.state.user.firstName ? this.state.user.firstName : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="LastName" fieldName="lastName" fieldValue={this.state.user && this.state.user.lastName ? this.state.user.lastName : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Email" fieldName="email" fieldValue={this.state.user && this.state.user.email ? this.state.user.email : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Phone" fieldName="phoneNumber" fieldValue={this.state.user && this.state.user.phoneNumber ? this.state.user.phoneNumber : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Address Line 1" fieldName="address1" fieldValue={this.state.user && this.state.user.address1 ? this.state.user.address1 : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Address Line 2" fieldName="address2" fieldValue={this.state.user && this.state.user.address2 ? this.state.user.address2 : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="State" fieldName="state" fieldValue={this.state.user && this.state.user.state ? this.state.user.state : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="City" fieldName="cityOrProvidence" fieldValue={this.state.user && this.state.user.cityOrProvidence ? this.state.user.cityOrProvidence : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Country" fieldName="country" fieldValue={this.state.user && this.state.user.country ? this.state.user.country : 'Empty' } updatePProfile={this.updateAllProfile}/>
                          <ProfileField title="Zip" fieldName="zipcode" fieldValue={this.state.user && this.state.user.zipcode ? this.state.user.zipcode : 'Empty' } updatePProfile={this.updateAllProfile}/>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>}
            </div>
          </div>
        </div>
        : <div id="app" className="loader" /> }
      </div>
    );
  }
}
class EventList extends React.Component {

  render() {
    return (
        <tr>
          <td>
            <a onClick={()=>this.props.setEventsByUrl(this.props.item.eventURL)}>{this.props.item.name}</a>
          </td>
          <td>
            {new Date(1 * this.props.item.eventEndDate).toUTCString()}
          </td>
      </tr>
  );
  }
}
const mapDispatchToProps = {
  getProfileData: () => getProfileData(),
  setEventsByUrl: (eventUrl) => setEventsByUrl(eventUrl),
};

const mapStateToProps = state => ({
 // counter: state.counter,
 // user: state.session.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MyProfile));
