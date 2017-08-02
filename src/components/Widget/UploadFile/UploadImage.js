import React from 'react';
import Dropzone from 'react-dropzone';

export default class UploadImage extends React.Component {

  constructor(props) {
      super(props);
      console.log(props);
  };

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

  render() {
    return (<div className="dropzone dz-clickable">
        <div className="dz-default dz-message">
          <Dropzone multiple accept="image/*" onDrop={this.onImageDrop.bind(this)}>
              <div className="dz-default dz-message">
                  <span>Drop files here to upload</span>
              </div>
          </Dropzone>
        </div>
      </div>);
    }
}
