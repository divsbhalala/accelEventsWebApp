import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {getItemList, addItemList, updateItemList,updateItemListPosition,deleteItemList} from './../../routes/admin/action';
import ToggleSwitch from '../Widget/ToggleSwitch';
import Dropzone from 'react-dropzone';
import CKEditor from 'react-ckeditor-wrapper';
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

class RowItemList extends React.Component {
  state: Object = {
    value: 0,
    toggle:false,
    uploadedFileCloudinaryUrl: '',
    isDataUpdate:false,

    itemNameFeedBack:false,
    itemName:false,
    itemCodeFeedBack:false,
    itemCode:false,
    startingBidFeedBack:false,
    startingBid:false,
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

  descriptionChangeHandler = (value) =>{
    let item=this.state.item;
    item.description=value;
      this.setState({item,isDataUpdate:true})
  }
  itemNameHandlerChange = (e) =>{
    this.setState({ itemNameFeedBack: true,});
    if (this.itemName.value.trim() == '') {
      this.setState({ itemName: false });
    } else { this.setState({itemName: true}); }

    let item=this.state.item;
    item.name=this.itemName.value;
      this.setState({item,isDataUpdate:true})
  }
  itemCodeHandlerChange = (e) =>{
    this.setState({ itemCodeFeedBack: true,});
    if (this.itemCode.value.trim() == '') {
      this.setState({ itemCode: false });
    } else { this.setState({itemCode: true}); }

    let item=this.state.item;
    item.code=this.itemCode.value;
      this.setState({item,isDataUpdate:true})
  }
  startingBidHandlerChange = (e) =>{
    this.setState({ startingBidFeedBack: true,});
    if (this.startingBid.value.trim() == '') {
      this.setState({ startingBid: false });
    } else { this.setState({startingBid: true}); }

    let item=this.state.item;
    item.startingBid=this.startingBid.value;
      this.setState({item,isDataUpdate:true})
  }
  buyItNowPriceHandlerChange = (e) =>{
    let item=this.state.item;
    item.buyItNowPrice=this.buyItNowPrice.value;
      this.setState({item,isDataUpdate:true})
  }
  bidIncrementHandlerChange = (e) =>{
    let item=this.state.item;
    item.bidIncrement=this.bidIncrement.value;
      this.setState({item,isDataUpdate:true})
  }
  marketValueHandlerChange = (e) =>{
    let item=this.state.item;
    item.marketValue=this.marketValue.value;
      this.setState({item,isDataUpdate:true})
  }
  categoryHandlerChange = (e) =>{
    let item=this.state.item;
    item.category=this.category.value;
      this.setState({item,isDataUpdate:true})
  }

  autoAddData =() => {
  console.log("---><><><",this.state)
    setTimeout(()=>{
    if(this.state.item.name && this.state.item.code &&  this.state.item.startingBid && this.state.isDataUpdate ){
      if (this.state.item.id ) {
        this.props.updateItemList('auction', this.state.item.id, this.state.item).then(resp => {
          console.log("Updated ",this.props.isItemAdded)
        })
      } else {
        this.props.addItemList('auction', this.state.item).then(resp => {
          console.log("Insert ",this.props.isItemAdded)
        })
      }
      this.setState({isDataUpdate:false})
  }},100)
}
deleteItemList =() => {
    this.state.item && this.state.item.id &&
      this.props.deleteItemList('auction', this.state.item.id ).then(resp => {
        console.log("Detete")
      })

}
  hideItemChangeHandler =()=>{
    let item=this.state.item;
    item.active=!item.active;
    this.setState({item,isDataUpdate:true},function stateChange() {
      this.autoAddData();
    })
  }

  getDragHeight() { return 60; };
  doToggle = () =>{ this.setState({ toggle:!this.state.toggle }) };
  showPanel = () =>{ this.setState({ toggle:true }) };

render() {
 // const {item, itemSelected, dragHandle} = this.props.item;
  return (
    <div data-id={36} className={ cx("item-row  ui-sortable-handle",this.state.toggle && "open", this.props.item.images && this.props.item.images[0] && this.props.item.images[0].imageUrl  ? "has-image" : "",this.props.item && this.props.item.description ? "has-description" : "")} >
      <div className="flex-row">
        <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" onClick={this.doToggle} /></div>
        <div className="flex-col item-name-column">
          <input type="hidden" name="id" defaultValue={36} />
          <input type="text" className="form-control item-name" name="name" maxLength={255} defaultValue={this.props.item.name} onFocus={this.showPanel}
                 ref={ref=> {this.itemName=ref;}} onKeyUp={this.itemNameHandlerChange} onBlur={this.autoAddData} />
          { this.state.itemNameFeedBack && !this.state.itemName && <small className="error red"> Name is Required.</small>}
        </div>
        <div className="flex-col item-code-column">

          <input type="text" className="form-control item-code alpha-only" name="code" defaultValue={this.props.item.code} maxLength={3} onFocus={this.showPanel}
                 ref={ref=> {this.itemCode=ref;}} onKeyUp={this.itemCodeHandlerChange} onBlur={this.autoAddData}/>
          { this.state.itemCodeFeedBack && !this.state.itemCode && <small className="error red"> Item Code is Required.</small>}
        </div>
        <div className="flex-col item-starting-bid-column">
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="text" className="form-control item-bid" name="startingBid" defaultValue={this.props.item.startingBid}  onFocus={this.showPanel}
                   ref={ref=> {this.startingBid=ref;}} onKeyUp={this.startingBidHandlerChange} onBlur={this.autoAddData}/>
            { this.state.startingBidFeedBack && !this.state.startingBid && <small className="error red"> Starting Bid is Required.</small>}
          </div>
        </div>
        <div className="flex-col item-starting-bid-column">
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="text" className="form-control item-bid" name="startingBid" defaultValue={this.props.item.buyItNowPrice}  onFocus={this.showPanel}
                   ref={ref=> {this.buyItNowPrice=ref;}} onKeyUp={this.buyItNowPriceHandlerChange} onBlur={this.autoAddData}/>
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
                  <CKEditor
                    value={this.props.item.description}
                    onChange={this.descriptionChangeHandler.bind(this)}
                    config={{toolbarGroups:[
                      { name: 'links', groups: [ 'links' ] },
                      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                      { name: 'styles', groups: [ 'styles' ] },
                      { name: 'colors', groups: [ 'colors' ] },
                    ]}} onBlur={this.autoAddData}/>
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
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="bidIncrement">Bid Increment</label>
                      <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <input className="form-control" placeholder="Increment (optional)" data-price="true" name="bidIncrement" type="number" defaultValue={this.props.item.bidIncrement}
                               ref={ref=> {this.bidIncrement=ref;}} onKeyUp={this.bidIncrementHandlerChange} onBlur={this.autoAddData}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <select className="form-control" name="itemCategory" defaultValue={this.props.item.category == "Uncategorized" ? 0 : this.props.item.category}
                              ref={ref=> {this.category=ref;}} onChange={this.categoryHandlerChange} onBlur={this.autoAddData}>
                        <option value={0} disabled selected>-- Select Category --</option>
                        {this.props.item.categories && this.props.item.categories.map((value,index)=>
                          <option value={value} key={index}>{value}</option>
                        )}
                      </select>
                    </div>
                  <div className="form-group">
                    <label htmlFor="marketValue">Market Value</label>
                    <div className="input-group">
                      <span className="input-group-addon">$</span>
                      <input className="form-control" placeholder="Market Value (optional)" data-price="true" name="marketValue" type="number"
                             defaultValue={this.props.item.marketValue}
                             ref={ref=> {this.marketValue=ref;}} onKeyUp={this.marketValueHandlerChange} onBlur={this.autoAddData}/>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    Hide Item
                    <div className="help-text">This is will hide item from display page</div>
                  </div>
                  <div className="col-md-6">
                    <ToggleSwitch name="requireBidderAddress" id={this.state.item.id + "logoEnabled"}
                                  defaultValue={ (this.state.item && this.state.item.active)}
                                  className="success activeswitch" onChange={this.hideItemChangeHandler}/>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <input type="hidden" name defaultValue  />
            <i className="fa fa-trash delete-item red"  onClick={this.deleteItemList}/>
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
  deleteItemList : (type,id) => deleteItemList(type,id),
};

const mapStateToProps = (state) => ({
  isItemAdded:state.isItemAdded && state.isItemAdded.isItemAdded
});

export default connect(mapStateToProps, mapDispatchToProps)(RowItemList);
