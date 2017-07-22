
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './event.css';
import {SplitButton, MenuItem} from 'react-bootstrap';
import {whitLableEeventsList,whiteLabelUrl,setWhiteLabelUrlEvents} from './action/index';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';
import Link from "../../../components/Link/Link";
class WhiteLabelEventList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      whiteLabelUrl: null,
      showPopup: false,
      loading:false,
      message:null,
    }
  }
  getWhiteLabelUrl = () => {
    this.props.whitLableEeventsList(this.props.params && this.props.params.params).then((resp) => {
      this.setState({
        event:resp
      })

    });
  }
  setActiveEvents = (row) => {
    this.props.setWhiteLabelUrlEvents(row.eventId,this.props.params && this.props.params.params).then((resp) => {
      {/*<Link to="/admin/settings-account" >*/}
      {/*</Link>*/}
    });
  }
  componentDidMount(){
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
      }], // you can change the dropdown list for size per page
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
    function dateFormatter(cell, row){
      return new Date(1*cell).toUTCString();
    }
    function urlFormate(cell, row){
      return (<a onClick={()=>activeEvent(row)} > {cell} </a>)
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
              <Link className="btn btn-block btn-default mrg-b-md" to={"wl-settings"}> <span className="hidden-xs">Create New Event</span> </Link>
            </div>
            <div className="col-md-2" role="group">
                <Link className="btn btn-block btn-default mrg-b-md" to={"wl-settings"}> <span className="hidden-xs">Users</span> </Link>
            </div>
            <div className="col-md-2" role="group">
              <Link className="btn btn-block btn-default mrg-b-md" to={"wl-settings"}>
                <span className="hidden-xs">Settings</span>
              </Link>
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              {this.state.event &&
              <BootstrapTable data={this.state.event} striped hover   options={ options }>
                <TableHeaderColumn  isKey={true} dataField='eventName'>EVENT NAME</TableHeaderColumn>
                <TableHeaderColumn  dataField='eventEndDate' width="15%" dataFormat={dateFormatter}>END DATE</TableHeaderColumn>
                <TableHeaderColumn columnClassName='theme-turquoise' dataFormat={urlFormate}  dataField='eventURL' >URL</TableHeaderColumn>
               </BootstrapTable>
               }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  whitLableEeventsList: (label) => whitLableEeventsList(label),
  setWhiteLabelUrlEvents: (eventId,whiteLabelURL) => setWhiteLabelUrlEvents(eventId,whiteLabelURL),
  };
const mapStateToProps = (state) => ({
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(WhiteLabelEventList));

