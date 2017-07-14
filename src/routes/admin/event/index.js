
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './event.css';
import {SplitButton, MenuItem} from 'react-bootstrap';
import {eventsList,whiteLabelUrl,setEvents} from './action/index';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';

class EventList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      whiteLabelUrl: null,
    }
  }
  getEventsList = () => {
    this.props.eventsList("search").then((resp) => {
      this.setState({
        event:resp.data
      })

    });
  }
  setActiveEvents = (row) => {
    this.props.setEvents(row.eventId).then((resp) => {
    });
  }
  getWhiteLabelUrl = () => {
    this.props.whiteLabelUrl().then((resp) => {
      this.setState({
        whiteLabelUrl:resp
      })
    });
  }
  componentDidMount(){
    this.getEventsList();
    this.getWhiteLabelUrl();
  }
  render() {
    var self = this;
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.event && this.event.recordsTotal
      } ], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      // firstPage: 'First', // First page button text
      // lastPage: 'Last', // Last page button text
      // paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };
    function buttonFormatter(cell, row){
      return '<ul class="readonly-actions list-inline"><li><a href="edit/7" ><i class="fa fa-cog blue" aria-hidden="true"></i></a></li><li><a href="/AccelEventsWebApp/auctions/admin/events/delete/" ><i class="fa fa-trash red" aria-hidden="true"></i></a></li></ul>';
    }
    function dateFormatter(cell, row){
      return new Date(1*cell).toUTCString();
    }
    function urlFormate(cell, row){
      return (<a onClick={()=>activeEvent(row)} > {cell} </a>)
    }
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>)
    }
    function activeEvent(row) {
      self.setActiveEvents(row);
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className="text-center">All Events</h1>
          <div className="row">
            <div className="col-md-2" role="group">
              <a href="#addwhitelabel" role="button" data-toggle="modal" className="btn btn-block btn-default mrg-b-md">
                <span className="hidden-xs">Add White Label</span>
              </a>
            </div>
            <div className="col-md-2" role="group">
              <SplitButton title="Access White Label" pullRight id="split-button-pull-right">
                {this.state.whiteLabelUrl && this.state.whiteLabelUrl.map((value,index)=>
                  <WhiteLabelUrlList key={index} item={value} />
                )}
              </SplitButton>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BootstrapTable data={this.state.event} striped hover search  pagination={ true }  options={ options }>
                <TableHeaderColumn dataSort isKey dataField='eventName' dataFormat={indexN}>No</TableHeaderColumn>
                <TableHeaderColumn dataSort  dataField='eventName'>EVENT NAME</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='eventEndDate' width="15%" dataFormat={dateFormatter}>END DATE</TableHeaderColumn>
                <TableHeaderColumn columnClassName='theme-turquoise' dataFormat={urlFormate} dataSort dataField='eventURL' >URL</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='twilioNumber'>Twilio Number</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='price'>Archive Number</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='price'># Particaipants</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='price'>Last Login</TableHeaderColumn>
                <TableHeaderColumn dataField='price' dataFormat={buttonFormatter}>Action</TableHeaderColumn>
             </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class WhiteLabelUrlList extends React.Component {
  render() {
    return (
      <MenuItem eventKey={this.props.key}>{this.props.item}</MenuItem>
    );
  }
}
const mapDispatchToProps = {
  eventsList: (search) => eventsList(search),
  setEvents: (eventId) => setEvents(eventId),
  whiteLabelUrl: () => whiteLabelUrl()
};
const mapStateToProps = (state) => ({
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(EventList));

