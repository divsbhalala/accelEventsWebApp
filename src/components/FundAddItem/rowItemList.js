import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {getItemList, addItemList, updateItemList,updateItemListPosition} from './../../routes/admin/fund/addItem/action';
import ToggleSwitch from '../Widget/ToggleSwitch';
import Dropzone from 'react-dropzone';

const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

class RowItemList extends React.Component {
  state: Object = {
    value: 0,
    toggle:false,
    uploadedFileCloudinaryUrl: '',
  };
componentWillReceiveProps() {
    this.setState({
      item: this.props.item
    })
  };
componentWillMount(){
  this.setState({
    item:this.props.item
  })
};
onImageDrop(files) {
  this.setState({
    uploadedFile: files[0],
  });
  this.handleImageUpload(files[0]);
}
handleImageUpload(file) {
  const upload = request.post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('file', file);

  upload.end((err, response) => {
    if (err) {
      console.error(err);
    }

    if (response.body.secure_url !== '') {
      this.setState({
        uploadedFileCloudinaryUrl: response.body.secure_url,
      });
    }
  });
}

  descriptionChangeHandler = (e) =>{
    let item=this.state.item;
    item.description=this.description.value;
      this.setState({item})
    this.autoAddData();
  }
  itemNameHandlerChange = (e) =>{
    let item=this.state.item;
    item.name=this.itemName.value;
      this.setState({item})
    this.autoAddData();
  }
  itemCodeHandlerChange = (e) =>{
    let item=this.state.item;
    item.code=this.itemCode.value;
      this.setState({item})
    this.autoAddData();
  }
  startingBidHandlerChange = (e) =>{
    let item=this.state.item;
    item.startingBid=this.startingBid.value;
      this.setState({item})
    this.autoAddData();
  }
  autoAddData =() => {
  console.log("---><><><",this.state)
  if(this.state.item.name && this.state.item.name &&  this.state.item.startingBid ){
    if (this.state.item.id ) {
      this.props.updateItemList('fundANeed', this.state.item.id, this.state.item).then(resp => {
        console.log("Updated ")
      })
    } else {
      this.props.addItemList('fundANeed', this.state.item).then(resp => {
        let item = this.state.item;
        item.id=100000
        this.setState({item})
        console.log("Insert ")
      })
    }
  }
}
  getDragHeight() { return 60; };
  doToggle = () =>{ this.setState({ toggle:!this.state.toggle }) };
  showPanel = () =>{ this.setState({ toggle:true }) };

render() {
 // const {item, itemSelected, dragHandle} = this.props.item;
  return (
    <div data-id={36} className={ cx("item-row  ui-sortable-handle",this.state.toggle && "open", this.props.item.images && this.props.item.images.length  ? "has-image" : "",this.props.item.images && this.props.item.description ? "has-description" : "")} >
      <div className="flex-row">
        <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" onClick={this.doToggle} /></div>
        <div className="flex-col item-name-column">
          <input type="hidden" name="id" defaultValue={36} />
          <input type="text" className="form-control item-name" name="name" maxLength={255} defaultValue={this.props.item.name} onFocus={this.showPanel}
                 ref={ref=> {this.itemName=ref;}} onKeyUp={this.itemNameHandlerChange} />
        </div>
        <div className="flex-col item-code-column">
          <input type="text" className="form-control item-code alpha-only" name="code" defaultValue={this.props.item.code} maxLength={3} onFocus={this.showPanel}
                 ref={ref=> {this.itemCode=ref;}} onKeyUp={this.itemCodeHandlerChange}/>
        </div>
        <div className="flex-col item-starting-bid-column">
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="text" className="form-control item-bid" name="startingBid" defaultValue={this.props.item.startingBid}  onFocus={this.showPanel}
                   ref={ref=> {this.startingBid=ref;}} onKeyUp={this.startingBidHandlerChange} />
          </div>
        </div>
        <div className="flex-col text-center item-actions-column">
          <ul className="list-inline">
            <li>
              <i className={cx( "fa fa-2x fa-image edit-item")}  onClick={this.doToggle} />
            </li>
            <li>
              <i className="fa fa-2x fa-file-o edit-item" onClick={this.doToggle} />
            </li>
          </ul>
        </div>
      </div>
      <div className="data-wrap">
        <div className="data">
            <div className="item-data">
              <div className="row">
                <div className="col-md-8">
                  <textarea rows={3} className="form-control summernote" placeholder="Item description" name="description" defaultValue={this.props.item.description}
                  ref={ref=> {this.description=ref;}} onKeyUp={this.descriptionChangeHandler}/>
                  <div>
                    <div id className="dropzone dz-clickable" action="/AccelEventsWebApp/host/upload">
                      <div className="dz-default dz-message">
                        <Dropzone
                          multiple
                          accept="image/*"
                          onDrop={this.onImageDrop.bind(this)}>
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  {/*<div className="row">*/}
                    {/*<div className="form-group">*/}
                      {/*<label htmlFor="bidIncrement">Bid Increment</label>*/}
                      {/*<div className="input-group">*/}
                        {/*<span className="input-group-addon">$</span>*/}
                        {/*<input className="form-control" placeholder="Increment (optional)" data-price="true" name="bidIncrement" type="number" defaultValue={this.props.item.code} />*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                      {/*<select className="form-control" name="itemCategory">*/}
                        {/*<option value={0} disabled selected>-- Select Category --</option>*/}
                        {/*<option value={2288}>(final cat)</option>*/}
                      {/*</select>*/}
                    {/*</div>*/}
                  {/*<div className="form-group">*/}
                    {/*<label htmlFor="marketValue">Market Value</label>*/}
                    {/*<div className="input-group">*/}
                      {/*<span className="input-group-addon">$</span>*/}
                      {/*<input className="form-control" placeholder="Market Value (optional)" data-price="true" name="marketValue" type="number" />*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*</div>*/}
                <br />
                <div className="row">
                  <div className="col-md-6">
                    Hide Item
                    <div className="help-text">This is will hide item from display page</div>
                  </div>
                  <div className="col-md-6">
                    <ToggleSwitch name="requireBidderAddress" id="logoEnabled"
                                  defaultValue={ (this.state.item && this.state.item.active)}
                                  className="success activeswitch" onChange={() => {
                      this.state.item.active= ! this.state.item.active
                    }}/>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <input type="hidden" name defaultValue />
            <i className="fa fa-trash delete-item red" />
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  getItemList : (type) => getItemList(type),
  addItemList : (type,data) => addItemList(type,data),
  updateItemList : (type,id,data) => updateItemList(type,id, data),
  updateItemListPosition : (type,itemId,topItem,topBottom) => updateItemListPosition(type,itemId,topItem,topBottom),
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RowItemList);
