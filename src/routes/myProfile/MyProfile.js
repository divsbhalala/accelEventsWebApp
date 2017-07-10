
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ProfileAside from './../../components/ProfileAside/ProfileAside';
import {getProfileData} from './action/signup_action';
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
      user:null,
    };
		this.setActiveTabState = this.setActiveTabState.bind(this);
  }
  componentWillMount() {
    this.props.getProfileData().then(resp => {
      this.setState({
        user: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
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
                <ProfileAside setActiveTabState={this.setActiveTabState} user={ this.state.user && this.state.user} />
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 ">
								{ this.state.isLoaded && <div className="main-box">
                  <Tabs onSelect={ (index, label) => {
										this.setActiveTabState(label)
									} } selected={this.state.activeTab || "Events" } className="tabs-wrapper">

                    <Tab label="Events">
                      <div className="row">
                        <table className="table table-striped table-hover table-bordered" cellSpacing={0} id="auctionevents">
                          <thead>
                          <tr>
                            <th><font><font>Event</font></font></th>
                            <th><font><font>END Date</font></font></th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.user && this.state.user.userEventInfo.map((item,index) =>
                              <EventList key={index} item={item}/>
                            )
                          }
                          </tbody>
                        </table>

                      </div>
                    </Tab>
                    <Tab label="Profile">
                      <div className="row">
                        <div className="tab-content">
                          <div className="tab-pane fade" id="tab-events">
                            <div>
                              <form id="newEventForm" method="POST" action="/AccelEventsWebApp/u/create/newevent">
                                <button type="submit" className="btn btn-default btn-block"><font><font>
                                  Create New Event
                                </font></font></button>
                              </form>
                            </div>
                          </div>
                          <div className="tab-pane fade active in" id="tab-profile">
                            <ul className="list-group" id="user">
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="firstname"><font><font>Firstname</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="firstname" data-type="text" data-pk={1} data-title="Enter firstname" className="editable editable-click"><font><font>{this.state.user && this.state.user.firstName}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="lastname"><font><font>lastname</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="lastname" data-type="text" data-pk={2} data-title="Enter lastname" className="editable editable-click"><font><font>{this.state.user && this.state.user.lastName}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="email"><font><font>E-mail</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="email" data-type="text" data-pk={3} data-title="Enter Email" className="readonly editable editable-click"><font><font>{this.state.user && this.state.user.email}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="phone"><font><font>Phone</font></font></label></div>
                                  <div className="col-md-8">
                                    <div className="edit-phone-form" style={{display: 'none'}}>
                                  <span className="editable-container editable-inline" style={{}}>
                                    <div>
                                      <form className="ajax-form form-inline editableform" data-onsuccess="updatePhone" action="/AccelEventsWebApp/u/myprofile/updatefield" method="post"><div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" /></div>
                                        <input type="hidden" name="name" defaultValue="phone" />
                                        <input type="hidden" name="pk" defaultValue={-1} />
                                        <input type="hidden" name="value" defaultValue />
                                        <div className="control-group form-group">
                                          <div>
                                            <div className="editable-input form-group" style={{position: 'relative'}}>
                                              <input data-country="US" type="text" className="form-control input-mini" defaultValue={this.state.user && this.state.user.firstName} />
                                            </div>
                                            <div className="editable-buttons">
                                              <button type="submit" className="btn btn-primary btn-sm editable-submit"><i className="glyphicon glyphicon-ok" /></button>
                                              <button type="button" className="btn btn-default btn-sm editable-cancel"><i className="glyphicon glyphicon-remove" /></button>
                                            </div>
                                          </div>
                                          <div className="editable-error-block help-block" style={{display: 'none'}} />
                                        </div>
                                      </form>
                                    </div>
                                  </span>
                                    </div>
                                    <a href="#" onclick className="readonly edit-phone editable editable-click"><font><font>{this.state.user && this.state.user.phoneNumber}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="address-line-1"><font><font>Address Line 1</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="address-line-1" data-type="text" data-pk={5} data-title="Enter Address Line 1" className="editable editable-click"><font><font className>{this.state.user && this.state.user.address1}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="address-line-2"><font><font>Address Line 2</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="address-line-2" data-type="text" data-pk={6} data-title="Enter Address Line 2" className="editable editable-click"><font><font className>{this.state.user && this.state.user.address2}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="state"><font><font>State</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="state" data-type="text" data-pk={7} data-title="Select State" className="editable editable-click"><font><font>{this.state.user && this.state.user.state}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="city"><font><font>City</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="city" data-type="text" data-pk={8} data-title="Select City" className="editable editable-click"><font><font className>{this.state.user && this.state.user.cityOrProvidence}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="country"><font><font>Country</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="country" data-type="text" data-pk={9} data-title="Select Country" className="editable editable-click"><font><font>{this.state.user && this.state.user.country}</font></font></a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-md-4"><label htmlFor="zipcode"><font><font>Zip</font></font></label></div>
                                  <div className="col-md-8">
                                    <a href="#" id="zipcode" data-type="number" data-pk={9} data-title="Enter Zipcode" className="editable editable-click"><font><font className>{this.state.user && this.state.user.zipcode}</font></font></a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

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
class EventList extends React.Component {
  render() {
    let eventUrl = '';
    return (
    <tr>
      <td>
        <a href={"/AccelEventsWebApp/u/display/hostevent/" + this.props.item.eventURL}><font><font>{this.props.item.name}</font></font></a>
      </td>
      <td>
        <font><font>{this.props.item.eventEndDate}
        </font></font></td>
    </tr>
    );
  }
}
const mapDispatchToProps = {
  getProfileData: () => getProfileData()
};

const mapStateToProps = (state) => ({
 // counter: state.counter,
 // user: state.session.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MyProfile));
