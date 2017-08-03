import React from 'react';
import Dropzone from 'react-dropzone';

export default class UploadImage extends React.Component {

  constructor(props) {
      super(props);
    this.state = {
      isActive: false,
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
          this.props.item.images.push({ "imageUrl": resp.data.message });
          this.props.imageUploaded();
        } else {
          console.log(resp);
        }
      }).catch((error, code, status) => error && error.response && error.response.data);
    }
  };
  imageRemove = (imageUrl) =>{
    //e.preventDefault();
    // this.setState({isActive:false})
    console.log("------>>>>",imageUrl)

  }
  render() {
    return (
      <Dropzone multiple className="dropzone dz-clickable" accept="image/*" onDrop={this.onImageDrop.bind(this)} disableClick={false}  >
        <div className="dz-default dz-message">
          <span>Drop files here to upload</span>
        </div>
        { this.props.item && this.props.item.images.map((item,index)=>
          <div key={index} className="dz-preview dz-image-preview" onClick={()=>this.imageRemove(item.imageUrl)}>
            {/*<ImagePreview key={index} imageUrl={"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/"+item.imageUrl} />*/}
            <div className="dz-details">
              <div className="dz-filename">
                <span data-dz-name>{item.imageUrl}</span>
              </div>
             <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>
              <img data-dz-thumbnail alt={item.imageUrl} src={"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/"+item.imageUrl} /></div>
             <div className="dz-progress"><span className="dz-upload"  /></div>
             <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>
             <div className="dz-error-message"><span data-dz-errormessage /></div>
            <a className="dz-remove" onClick={this.imageRemove} >Remove file</a>
          </div>
        )}
      </Dropzone>
      );
    }
}
class ImagePreview extends React.Component {
    render(){
      return(
      <div className="dz-preview dz-image-preview">
        <div className="dz-details">
          <div className="dz-filename">
            <span data-dz-name>{this.props.imageUrl}</span>
          </div>
          <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>
          <img data-dz-thumbnail alt={this.props.imageUrl} src={this.props.imageUrl} /></div>
        <div className="dz-progress"><span className="dz-upload"  /></div>
        <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>
        <div className="dz-error-message"><span data-dz-errormessage /></div>
        <a className="dz-remove" href="#" >Remove file</a>
      </div>
      );
    }
}

