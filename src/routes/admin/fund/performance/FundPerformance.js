
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FundPerformance.css';
import cx from 'classnames';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import { getPerformancefundANeedItem, getPerformancefundANeedItemCSV } from './action';
import { connect } from 'react-redux';
import FundItemTable from '../../../../components/FundPerformance/FundItemTable';
class FundPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      showPopup: false,
      loading: false,
      message: null,
    };
  }
  getPerformancefundANeedItemCSV = () => {
    this.props.getPerformancefundANeedItemCSV().then((resp) => {
    });
  }
  componentWillMount() {
    this.props.getPerformancefundANeedItem().then((resp) => {
      console.log('resp', resp);
      this.setState({
        items: resp,
      });
    }).catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row form-group flexrow">
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-lg-12">
                  <div id className="clearfix" />
                </div>
              </div>
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-lg-12">
                  <div className="main-box no-header">
                    <div className="main-box-body clearfix">
                      <div id="alertmessage" />
                      {this.state.items ? <FundItemTable items={this.state.items} /> : <div id="app" className="loader" /> }

                      <div className="form-group operations-row">
                        <div className="row">
                          <div className="col-md-4" role="group">
                            <a onClick={this.getPerformancefundANeedItemCSV} className="btn btn-block btn-default mrg-b-md">Download All Fund a Need Data</a>
                          </div>
                          {/* <div class="col-md-4" role="group">
                             <button class="btn btn-block btn-default">Download
                             Fund a Need Winner Data</button>
                             </div> */}
                        </div>
                      </div>
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


const mapDispatchToProps = {
  getPerformancefundANeedItem: () => getPerformancefundANeedItem(),
  getPerformancefundANeedItemCSV: () => getPerformancefundANeedItemCSV(),
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(FundPerformance));

