
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './table.css';
import {getScrollData, doGetSettings} from './../event/action/index';
import  EventAside from './../../components/EventAside/EventAside';
import ItemList from '../../components/Widget/FundANeed/ItemList';
// import  history from './../../../history';
class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
			eventSettings: null,
      itemList: null,
    }

  }

  componentWillMount() {
    this.props.doGetSettings(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
      this.setState({
				eventSettings: resp && resp.data
      });
    });
		this.props.getScrollData(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
			this.setState({
				settings: resp,
			});
		});
  }

  render() {
    return (

      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">

                <EventAside activeTab={'Auction'} eventData={this.props.eventData} settings={this.state.eventSettings}
                            eventTicketData={this.props.eventTicketData} isBidInstructionHidden={true}
                            showMapPopup={this.showMapPopup} activeCategory={false}/>
              </div>

              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box no-header clearfix">
                  <div className="main-box-body">
                    <div className="table white-bg ">
											{ this.state.settings && this.state.settings.displayText && <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center")}>
												{this.state.settings.displayText}
                      </p>}
                      <div id="scroller">
                        <table className={("table datatables" )}>
                          <thead className="turquoise-bg white">
                          <tr>
                            <th>Item</th>
                            <th>Item Code</th>
                            <th>MINIMUM PLEDGE</th>
                            <th>TOTAL AMOUNT PLEDGED</th>
                          </tr>
                          </thead>
                          <tbody>
													{this.state.settings && this.state.settings.items &&
													this.state.settings.items.map((item, index) =>
                            <ItemList key={index} item={item} moduleEnded={this.state.settings && this.state.settings.moduleEnded}/>
													)
													}
                          </tbody>
                        </table>
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
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
	getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
};
const mapStateToProps = (state) => ({
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data
});

export default  connect(mapStateToProps, mapDispatchToProps)(Fund);