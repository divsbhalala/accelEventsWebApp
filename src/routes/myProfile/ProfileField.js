
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import {connect} from 'react-redux';
import {updateProfile} from './action/signup_action';
import  history from './../../history';
import InlineEdit from 'react-edit-inline';
import {EditableTextField} from 'react-bootstrap-xeditable';

class ProfileField extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isValidData: false,
      error: null,
      data:null,
      fieldValue:null,
      fieldName:null,
      isEdit:false,
    };
    this.updateProfile = this.updateProfile.bind(this);
 	}
  updateProfile = (name, value) =>{
    this.setState({
      fieldValue:value
    });
     if(value!= this.props.fieldValue ) {
     this.props.updateProfile(this.state.fieldName, value).then(resp => {
      }).catch(error => {
        //history.push('/404');
      });
      this.props.updatePProfile(this.state.fieldName, value);
    }
 }
  componentDidMount() {
    this.setState({
      fieldValue:this.props.fieldValue,
      fieldName:this.props.fieldName,
    })
 }
  componentWillUpdate(){}
  componentWillReceiveProps(){}
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-4"><label htmlFor="firstname">{this.props.title}</label></div>
          <div className="col-md-8">
            <div  className="row">
              <div className="editable-input col-sm-5" style={{position: 'relative'}}>
                <EditableTextField name='username' value={this.state.fieldValue} onUpdate={this.updateProfile} placeholder=''/>
            </div>
          </div>
        </div>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = {
  updateProfile: (field,value) => updateProfile(field,value)
};

const mapStateToProps = (state) => ({

 });
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ProfileField));
