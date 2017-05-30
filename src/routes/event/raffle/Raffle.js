/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import s from './Raffle.css';
import cx from 'classNames';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import  EventAside from './../../../components/EventAside/EventAside';

class Raffle extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: 'The Event',
            showBookingTicketPopup: false,
            showMapPopup: true,
        }
        this.showSlider = this.showSlider.bind(this);
        this.hideSlider = this.hideSlider.bind(this);
    }

    showSlider = (e) => {
        e.preventDefault();
        this.setState({
            showBookingTicketPopup: true
        })
    }

    hideSlider = () => {
        this.setState({
            showBookingTicketPopup: true
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">

                    <div id="content-wrapper">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4">
                                <EventAside activeTab={'Raffle'} showSlider={this.showSlider}
                                            showMapPopup={this.showMapPopup}/>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8">
                                <div className="main-box clearfix">
                                    <h1 className="text-center mrg-t-lg" id="item-name">My First Raffle Item</h1>
                                    <div className="row mrg-t-lg">
                                        <div className="col-md-6">
                                            <div className="pad-l-md pad-r-md">
                                                <div className="item-image">
                                                    <div className="item-image-inner" style={{backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg")', width: '', transform: 'rotate(0deg)'}} />
                                                </div>
                                            </div>
                                            <div className="mrg-t-lg pad-l-md pad-r-md">
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{paddingRight: 16}}>
                                            <div className="text-danger text-center bold"> Please activate this module to start accepting tickets. </div>
                                            <a role="button" className="btn btn-success btn-block" href="#login-user" data-toggle="modal" data-form="login">Login</a>
                                            <a role="button" className="btn btn-primary btn-block" data-toggle="modal" href="#info-modal" data-title="Raffle Drawn" data-message="This raffle has already been drawn. No further tickets are being accepted">Get Tickets</a>
                                            <a role="button" className="btn btn-success btn-block" href="/AccelEventsWebApp/events/jkazarian8#raffle">Go back to All Items</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default (withStyles(s)(Raffle));
