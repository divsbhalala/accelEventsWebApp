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
import cx from 'classnames';
import {connect} from 'react-redux';

class Fund extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: 'The Event',
            showBookingTicketPopup: false,
            showMapPopup: false,
            isValidData:false,
            error:null,
            isLogin:false,
        }

    }
    render() {

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div id="content-wrapper">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4">
                                Fund
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default Fund;
