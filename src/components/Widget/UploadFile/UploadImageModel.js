import React from 'react';
import Dropzone from 'react-dropzone';
import {uploadImage} from './action';
import {connect} from 'react-redux';
import Button from 'react-bootstrap-button-loader';
import PopupModel from '../../../components/PopupModal'

 class UploadImageModel extends React.Component {

  constructor(props) {
      super(props);
    this.state = {
      showPopup: true,
      loading: false,
      errorMsg: '',
      popupHeader: '',
      popupType: '',
      imageFiles: undefined
    }
  };
   showPopup = () => {
     this.setState({
       showPopup: true,
       isUploaded: false,
     });
   };
   hidePopup = () => {
     this.setState({
       showPopup: false,
     });
   };
   onImageDrop(files) {
    this.setState({
      imageFiles: files,
      isUploaded:true
    });
  };
  imageUpload =()=> {
    if(this.state.imageFiles && this.state.isUploaded){
    for (let file in this.state.imageFiles) {
      this.setState({loading:true,isUploaded:false})
      this.props.uploadImage(this.state.imageFiles[file]).then(resp => {
        this.setState({loading:false});
        if (resp && resp.data && resp.status===200) {
          this.props.imageUploaded(resp.data.message);
        } else {
        }
      }).catch((error, code, status) => error && error.response && error.response.data);
    }
  }
};
   imageRemove = () =>{
     this.setState({
       imageFiles: undefined
     });
   };
  render() {
    return (

      <div >
        <PopupModel
          id="mapPopup"
          showModal={this.props.showPopup}
          headerText= {<p>{this.props.popupHeader}</p>}
          modelBody='<div><h1>Location</h1></div>'
          onCloseFunc={this.props.hidePopup} >
          <div className="ticket-type-container">
            { this.state && this.state.errorMsg }
      <Dropzone multiple={false} className="dropzone dz-clickable" accept="image/*" onDrop={this.onImageDrop.bind(this)}  onClick={e => e.stopPropagation()} >
        <div className="dz-default dz-message">
          <span>Drop files here to upload</span>
        </div>
        { this.state.imageFiles && this.state.imageFiles.length && this.state.imageFiles.map((item,index)=>
          <div key={index} className="dz-preview dz-image-preview" onClick={e => e.stopPropagation()} >
            <div className="dz-details" >
              <div className="dz-filename">
                <span data-dz-name>{item.preview}</span>
              </div>
             <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>
              <img data-dz-thumbnail alt={item.preview} src={item.preview} />
            </div>
             <div className="dz-progress"><span className="dz-upload"  /></div>
             <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>
             <div className="dz-error-message"><span data-dz-errormessage /></div>
            <a className="dz-remove"  onClick={this.imageRemove} >Remove file</a>
          </div>
        )}
      </Dropzone>
        <div className="modal-footer">
          <Button className="btn btn-success" loading={this.state.loading} onClick={this.imageUpload} >UPLOAD</Button>
          <button className="btn btn-primary" onClick={this.props.hidePopup}>CLOSE</button>
        </div>
          </div>
        </PopupModel>
      </div>
      );
    }
}
const mapDispatchToProps = {
  uploadImage: (file) => uploadImage(file),
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageModel);

