/* @flow */
/* eslint-disable no-console, react/prop-types */

import React from 'react';
import cx from 'classnames';
import DraggableList from './draggableList';
import {connect} from 'react-redux';
import {getAuctionItems, addAuctionItem, updateAuctionItem,updateAuctionItemsPosition} from './../action';

class PlanetItem extends React.Component {
  state: Object = {
    value: 0,
    toggle:false
  };


  getDragHeight() {return 50;
  }
  doToggle = () =>{
    console.log(this.state.toggle)
    this.setState({
      toggle:!this.state.toggle
    })
  }

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const {value} = this.state;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={cx('item', {dragged})}
        style={{
          transform: `scale(${scale})`,
         // boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}>
        {dragHandle(<div className="dragHandle" />)}

          <div data-id={36} className={ cx("item-row  has-description ui-sortable-handle",this.state.toggle && "open")} >
            <div className="flex-row">
              <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" onClick={this.doToggle} /></div>
              <div className="flex-col item-name-column">
                <input type="hidden" name="id" defaultValue={36} />
                <input type="text" className="form-control item-name" name="name" maxLength={255} defaultValue={this.props.item.name} />
              </div>
              <div className="flex-col item-code-column">
                <input type="text" className="form-control item-code alpha-only" name="code" defaultValue={this.props.item.code} maxLength={3} />
              </div>
              <div className="flex-col item-starting-bid-column">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="text" className="form-control item-bid" name="startingBid" defaultValue={300} />
                </div>
              </div>
              <div className="flex-col text-center item-actions-column">
                <ul className="list-inline">
                  <li>
                    <i className="fa fa-2x fa-image edit-item" onClick={this.doToggle} />
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
                      <textarea rows={3} className="form-control summernote" placeholder="Item description" name="description" defaultValue={"<p><b><i>fhg h&nbsp;</i></b></p>"} />
                      <div>
                        <div id className="dropzone dz-clickable" action="/AccelEventsWebApp/host/upload">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-6">
                          Hide Item
                          <div className="help-text">This is will hide item from display page</div>
                        </div>
                        <div className="col-md-6">
                          <div className="onoffswitch onoffswitch-success activeswitch">
                            <input type="checkbox" name="activeEnabled" className="onoffswitch-checkbox" id="active36" />
                            <label className="onoffswitch-label" htmlFor="active36">
                              <div className="onoffswitch-inner" />
                              <div className="onoffswitch-switch" />
                            </label>
                            <input type="hidden" name="activeEnabled" defaultValue="off" />
                          </div>
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

      </div>
    );
  }
}

 class Drag extends React.Component {
  _container: HTMLElement;

  state: Object = {
    useContainer: false,
    list: []
  };
  componentWillMount(){
    this.props.getAuctionItems().then(resp => {
      if(resp && resp.data && resp.data.items.length){
        this.setState({list:resp.data.items});
        console.log(this.state.items);
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  _onListChange(newList: Array<Object>,movedItem: Array<Object>, oldIndex: number, newIndex: number) {
    this.setState({list: newList});
    console.log(this.state.list,movedItem, oldIndex, newIndex)

    // console.log("--->",newList[newIndex].id, newList[newIndex-1].id, newList[newIndex+1].id)
    // this.props.updateAuctionItemsPosition(movedItem.id,oldIndex,newIndex).then(resp => {
    //   if(resp && resp.data && resp.data.items.length){
    //     this.setState({list:resp.data.items});
    //     console.log(this.state.items);
    //   }
    //   else{
    //     console.log(resp);
    //   }
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  render() {
    const {useContainer} = this.state;

    return (
      <div className="main">
        <div
          className="" ref={el => this._container = el}
          style={{
            overflow: useContainer ? 'auto' : '',
            height: useContainer ? '200px' : '',
            border: useContainer ? '1px solid gray' : ''
          }}>
          <DraggableList
            itemKey="id"
            template={PlanetItem}
            list={this.state.list}
            onMoveEnd={(newList,movedItem,oldIndex,newIndex) => this._onListChange(newList,movedItem,oldIndex,newIndex)}
            container={()=>useContainer ? this._container : document.body}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAuctionItems : () => getAuctionItems(),
//  addAuctionItem : (auctionDTO) => getAuctionItems(auctionDTO),
 // updateAuctionItem : (id, auctionDTO) => updateAuctionItem(id, auctionDTO)
  updateAuctionItemsPosition : (itemId,topItem,topBottom) => updateAuctionItemsPosition(itemId,topItem,topBottom)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Drag);
