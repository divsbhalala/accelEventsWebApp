import React from 'react';
import cx from 'classnames';
import DraggableList from './../draggableList';
import {connect} from 'react-redux';
import RowItemList from './rowItemList';
import {getItemList, addItemList, updateItemList,updateItemListPosition} from './../../routes/admin/fund/addItem/action';


class PlanetItem extends React.Component {
  state: Object = {
    value: 0,
    toggle:false
  };

  getDragHeight() { return 60; }
  doToggle = () =>{ this.setState({ toggle:!this.state.toggle }) }

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const {value} = this.state;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div className={cx('item', {dragged})} >
        {dragHandle(<div className="dragHandle"  />)}
        <RowItemList item={this.props.item} />
      </div>
    );
  }
}

 class FundNeedAddItem extends React.Component {
  _container: HTMLElement;

  state: Object = {
    useContainer: false,
    list: []
  };
  componentWillMount(){
    this.props.getItemList("fundANeed").then(resp => {
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
  onListChange(newList: Array<Object>,movedItem: Array<Object>, oldIndex: number, newIndex: number) {
    this.setState({list: newList});
    console.log(this.state.list,movedItem, oldIndex, newIndex)

    let topItem= newIndex ==  0  ? 0 : newIndex-1
    let bottomItem =  newIndex ==  newList.length-1  ? newIndex : newIndex + 1
    if(newList[newIndex].id && newList[newIndex].id && newList[topItem].id && newList[bottomItem].id ){
      console.log("--->",newList[newIndex].id, newList[topItem].id, newList[bottomItem].id)
      this.props.updateItemListPosition('fundANeed',newList[newIndex].id, newList[topItem].id, newList[bottomItem].id).then(resp => {
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
    }
  }
   addNewRow = () =>{
    if(this.state.list[0].id){
       const list = this.state.list;
       list.unshift({});
       this.setState({list})
    }
   }
  render() {
    const {useContainer} = this.state;

    return (
      <div>
        <p>In Fund a Need, any number of people can submit a 'bid' for a fund a need item. The price
          of the item does not increase with each subsequent bid.</p>
        <div className="text-left mrg-t-md">
          <button className="btn btn-info add-new-item mrg-t-lg" onClick={this.addNewRow}> &nbsp; Add Item &nbsp; </button>
        </div>
        <div className="table-header">
          <div className="flex-row">
            <div className="flex-col plus-sign-column" />
            <div className="flex-col item-name-column"><span>Item name</span></div>
            <div className="flex-col item-code-column"><span>Item code</span></div>
            <div className="flex-col item-starting-bid-column"><span>Amount ($)</span></div>
            <div className="flex-col item-actions-column"><span>Actions</span></div>
          </div>
        </div>
      <div className="main">
        <div className="" ref={el => this._container = el}>
          <DraggableList
            itemKey="id"
            template={PlanetItem}
            list={this.state.list}
            onMoveEnd={(newList,movedItem,oldIndex,newIndex) => this.onListChange(newList,movedItem,oldIndex,newIndex)}
            container={()=>useContainer ? this._container : document.body}
          />
        </div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getItemList : (type) => getItemList(type),
  addItemList : (type) => addItemList(type,id,data),
  updateItemList : (type,id, auctionDTO) => updateItemList(type,id, data),
  updateItemListPosition : (type,itemId,topItem,topBottom) => updateItemListPosition(type,itemId,topItem,topBottom),
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FundNeedAddItem);
