
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AuctionPerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import AuctionItemTable from '../../../../components/Auction/AuctionItemTable';

class AuctionPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (

      <div className="container-fluid">
          <div className="row">
            <div className="col-lg-offset-2 col-sm-10">
              <div className="row form-group flexrow">
                <div id="content-wrapper">
                  <div className="row" style={{opacity: 1}}>
                    <div className="col-lg-12">
                      <div id className="clearfix">
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{opacity: 1}}>
                    <div className="col-lg-12">
                      <div className="main-box no-header">
                        <div className="main-box-body clearfix">
                          <div id="alertmessage" />
                           {/* Action Row */}
                          <AuctionItemTable />
                          <div className="form-group operations-row mrg-t-lg">
                            <div className="row">
                              <div className="col-md-3" role="group">
                                <a href="/AccelEventsWebApp/host/item-performance/download/auction/bidder/CSV" className="btn btn-block btn-default mrg-b-md">Download all bidder data</a>
                              </div>
                              <div className="col-md-3" role="group">
                                <a href="/AccelEventsWebApp/host/item-performance/download/auction/winner/CSV" className="btn btn-block btn-default mrg-b-md">Download Winner Data</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> {/* /.col-lg-12 */}
                  </div> {/* /.row */}
                </div>

              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AuctionPerformance);
