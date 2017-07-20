
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './event.css';
import {SplitButton, MenuItem} from 'react-bootstrap';
import {eventsList,whiteLabelUrl,setEvents,createWhiteLabelUrl} from './action/index';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';
import PopupModel from './../../../components/PopupModal';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';
import {browserHistory} from 'react-router';
import Link from "../../../components/Link/Link";

class EventList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      showPopup:false,
      message:null,
      loading:false,
      popupHeader:false,
      isError:false,
      whiteLabelUrlFeedBack: false,
      whiteLabelUrlValue:null,
      whiteLabelUrl:false,
      whiteLabelUrlList:null,
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

      window.location = "/admin";
       // this.props.router.push('/some/location');
      {/*<Link to="/admin" >*/}
      {/*</Link>*/}
     //this.context.router.push('/admin');
     // browserHistory.push('/login');

    });
  }
  getWhiteLabelUrl = () => {
    this.props.whiteLabelUrl().then((resp) => {
      this.setState({
        whiteLabelUrlList:resp
      })
    });
  }
  componentDidMount(){
    this.getEventsList();
    this.getWhiteLabelUrl();
  }
  whiteLabelUrlValidateHandler = (e) => {
    this.setState({
      whiteLabelUrlFeedBack: true,
      whiteLabelUrlValue:this.whiteLabelUrl.value.trim()
    });
    if (this.whiteLabelUrl.value.trim() == '') {
      this.setState({
        whiteLabelUrl: false
      });
    } else {
      this.setState({
        whiteLabelUrl: true
      });
    }

  };
  submiteForm = (e) => {
    e.preventDefault();
    if(this.state.whiteLabelUrl){
      this.setState({loading:true})
      this.props.createWhiteLabelUrl(this.state.whiteLabelUrlValue)
        .then(resp => {
          if (resp && resp.message) {
            this.setState({
              loading:false,
              message:resp.message,
              isError:false,
            });
          }else{
            this.setState({
              loading:false,
              message:"Something went wrong",
              isError:true
            });
          }
          this.setState({
            loading:false,
          })
        });
    }
  }
  showPopup = () => {
    this.setState({
      showPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
      loading:false,
      message:null,
    });
  };
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
              <a onClick={this.showPopup} className="btn btn-block btn-default mrg-b-md">
                <span className="hidden-xs">Add White Label</span>
              </a>
            </div>
            <div className="col-md-2" role="group">
              <SplitButton title="Access White Label" pullRight id="split-button-pull-right">
                {this.state.whiteLabelUrlList && this.state.whiteLabelUrlList.map((value,index)=>
                  <WhiteLabelUrlList key={index} item={value} />
                )}
              </SplitButton>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.state.event &&
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
             </BootstrapTable> }
            </div>
          </div>
          <PopupModel
            id="bookingPopup"
            showModal={this.state.showPopup}
            headerText={<span>Add White Label</span>}
            modelBody=''
            onCloseFunc={this.hidePopup}>
            <div className="ticket-type-container">
              <form id="contactform">
                <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                  { this.state.message }</div>
                <div    className={cx("form-group", this.state.whiteLabelUrlFeedBack && 'has-feedback', this.state.whiteLabelUrlFeedBack && this.state.whiteLabelUrl && 'has-success', this.state.whiteLabelUrlFeedBack && (!this.state.whiteLabelUrl) && 'has-error')}>
                  <label className="control-label">Enter White Label Url</label><br />
                  <label id="alert-modal-whitelabelurl" className="modal-title alert-danger" />
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-arrow-right" aria-hidden="true" />
                    </div>
                    <input type="text" className="form-control" name="whitelabelurl" id="whitelabelurl"
                           ref={ref => {
                             this.whiteLabelUrl = ref;
                           }}
                           onKeyUp={this.whiteLabelUrlValidateHandler}/>
                    { this.state.whiteLabelUrlFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.whiteLabelUrlFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  <small className="help-block" data-fv-result="NOT_VALIDATED">White Label Url.</small>
                </div>

                <input type="hidden" name defaultValue />
                <Button type="button" className="btn btn-primary m-r-5" onClick={this.submiteForm} loading={this.state.loading}>Create White Label</Button>
                <button type="button" className="btn btn-danger"  onClick={this.hidePopup}>Cancel</button>
              </form>
            </div>
          </PopupModel>

        </div>
      </div>
    );
  }
}
class WhiteLabelUrlList extends React.Component {
  render() {
    return (
      <MenuItem eventKey={this.props.key}><Link to={"u/"+this.props.item+"/home"} >{this.props.item}</Link></MenuItem>
    );
  }
}
const mapDispatchToProps = {
  eventsList: (search) => eventsList(search),
  setEvents: (eventId) => setEvents(eventId),
  whiteLabelUrl: () => whiteLabelUrl(),
  createWhiteLabelUrl: (label) => createWhiteLabelUrl(label)
};
const mapStateToProps = (state) => ({
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(EventList));

