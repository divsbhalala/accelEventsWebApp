import React from 'react';
import Dropzone from 'react-dropzone';
import {uploadImage} from './action';
import {connect} from 'react-redux';

 class UploadImage extends React.Component {

  constructor(props) {
      super(props);
    this.state = {
    }

  };
  componentWillMount(){
    this.setState({
      imageFiles: undefined
    })
  }
  onImageDrop(files) {
    for (let file in files) {
      this.props.uploadImage(files[file]).then(resp => {
        if (resp && resp.data && resp.status===200) {
          this.props.imageUploaded(resp.data.message);
        } else {
          console.log(resp);
        }
      }).catch((error, code, status) => error && error.response && error.response.data);
    }
  };
  render() {
    return (
      <Dropzone multiple={this.props.multiple} className="dropzone dz-clickable" accept="image/*" onDrop={this.onImageDrop.bind(this)}  onClick={e => e.stopPropagation()} >
        <div className="dz-default dz-message">
          <span>Drop files here to upload</span>
        </div>
        { this.props.item && this.props.item.images.map((item,index)=>
          <div key={index} className="dz-preview dz-image-preview" onClick={e => e.stopPropagation()} >
            <div className="dz-details" >
              <div className="dz-filename">
                <span data-dz-name>{item.imageUrl}</span>
              </div>
             <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>
              <img data-dz-thumbnail alt={item.imageUrl} src={"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/"+item.imageUrl} />
            </div>
             <div className="dz-progress"><span className="dz-upload"  /></div>
             <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>
             <div className="dz-error-message"><span data-dz-errormessage /></div>
            <a className="dz-remove"  onClick={()=>this.props.imageRemove(index)} >Remove file</a>
          </div>
        )}
      </Dropzone>
      );
    }
}
const mapDispatchToProps = {
  uploadImage: (file) => uploadImage(file),
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

