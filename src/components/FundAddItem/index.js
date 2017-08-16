import React from 'react';
import cx from 'classnames';
import DraggableList from './../draggableList';
import {connect} from 'react-redux';
import RowItemList from './rowItemList';
import {getItemList, addItemList, updateItemList, updateItemListPosition,	getItemCategories} from './../../routes/admin/action';
import {getHostSettings} from '../HostSettings/action/RestActions';

class PlanetItem extends React.Component {
	state: Object = {
		value: 0,
		toggle: false,
		message: "",
		status: "",
    settings:'',
	};

	getDragHeight() {
		return 60;
	};

	doToggle = () => {
		this.setState({toggle: !this.state.toggle})
	};

	render() {
		const {item, itemSelected, dragHandle} = this.props;
		const {value} = this.state;
		const scale = itemSelected * 0.05 + 1;
		const shadow = itemSelected * 15 + 1;
		const dragged = itemSelected !== 0;

		return (
			<div className={cx('item', {dragged})}>
				{dragHandle(<div className="dragHandle"/>)}
				{this.props.item && <RowItemList item={this.props.item}/> }
			</div>
		);
	}
};

class FundNeedAddItem extends React.Component {
	_container: HTMLElement;

	state: Object = {
		useContainer: false,
		list: [],
		actionChange: this.actionChange,
	};

	componentWillReceiveProps() {
		setTimeout(() => {
			let message = "";
			if (this.props.isItemAdded && this.props.isItemAdded.status === "success") {
				if (this.props.isItemAdded && this.props.isItemAdded.type === "Updated") {
					message = "Item Updated ..."
				}
				if (this.props.isItemAdded && this.props.isItemAdded.type === "PositionChange") {
					message = "Item PositionChange Updated ..."
				}
				if (this.props.isItemAdded && this.props.isItemAdded.type === "Inserted") {
					message = "Item Added successfully ...";
					this.getItemList()
				}
				if (this.props.isItemAdded && this.props.isItemAdded.type === "Deleted") {
					message = "Item deleted successfully ...";
					this.getItemList()
				}
			} else {
				message = "Something Wrong"
			}
			if (this.props.isItemAdded && this.props.isItemAdded.type === "getList") {
				message = "Item Listed"
			}
			this.setState({
				message,
				status: this.props.isItemAdded && this.props.isItemAdded.status
			})
		}, 500);
		setTimeout(() => {
			this.setState({message: ""})
		}, 4000)
	};

  getItemList = () => {
    this.props.getItemList("fundANeed").then(resp => {
      if (resp && resp.data && resp.data.items.length) {
        this.setState({list: resp.data.items, categories: resp.data.items[0].categories});
      }
      else {
        this.props.getItemCategories("fundANeed").then(resp => {
          this.setState({
            categories: resp.data.itemCategories.map((value) => {
              return value.name
            })
          });
          this.addEmptyRow()
        });
      }
    }).catch((error) => {

    });
  };

	componentWillMount() {
    this.props.getHostSettings('fundANeed').then(resp => {
      this.setState({settings:resp.data});
    }).catch((error) => {
    });
		this.getItemList()
	};

	onListChange(newList: Array<Object>, movedItem: Array<Object>, oldIndex: number, newIndex: number) {
		this.setState({list: newList});
    let topItem = newIndex === 0 ? 0 : newList[newIndex - 1].id;
    let bottomItem = newIndex === newList.length - 1 ? 0 : newList[newIndex + 1].id;
    if ( newList[newIndex].id && topItem && bottomItem) {
      this.props.updateItemListPosition('fundANeed', newList[newIndex].id, topItem, bottomItem).then(resp => {
				if (resp && resp.data && resp.data.items.length) {
					this.setState({list: resp.data.items});
				}
				else {
				}
			}).catch((error) => {
				
			});
		}
	};

	addNewRow = () => {
		if (this.state.list.length > 0) {
			if (this.state.list[0].id) {
				this.addEmptyRow()
			}
		} else {
			this.addEmptyRow()
		}
	};
	addEmptyRow = () => {
		const list = this.state.list;
		let data = {
      id:0,
			"active": false,
      "category": this.state.categories,
			"code": "",
			"description": "",
			"images": [
				{
					"imageUrl": ""
				}
			],
			"name": "",
			"startingBid": 0
		}
		list.unshift(data);
		this.setState({list})
	};

	render() {
		const {useContainer} = this.state;
		return (
			<div>
				<p>In Fund a Need, any number of people can submit a 'bid' for a fund a need item. The price
					of the item does not increase with each subsequent bid.</p>
				<div className="text-left mrg-t-md">
					<button className="btn btn-info add-new-item mrg-t-lg" onClick={this.addNewRow}> &nbsp; Add
						Item &nbsp; </button>
				</div>
				<div className="ajax-wrap">
          { this.props.isLoading ?
						<div className="ajax-msg-box text-center">
							<span className="fa fa-spinner fa-pulse fa-fw"/>
							<span className="resp-message">Please wait...</span>
						</div> : ""
          }
          { this.props.isSuccess ?
						<div className="ajax-msg-box text-center text-success">
							<span className="resp-message">Item saved...</span>
						</div> : ""
          }
					{this.state.message && <div
						className={cx("alert", this.props.isItemAdded && this.props.isItemAdded.status === "success" ? "alert-success" : "alert-danger")}>{this.state.message}</div>}
				</div>
				<div className="table-header">
					<div className="flex-row">
						<div className="flex-col plus-sign-column"/>
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
							onMoveEnd={(newList, movedItem, oldIndex, newIndex) => this.onListChange(newList, movedItem, oldIndex, newIndex)}
							container={() => useContainer ? this._container : document.body}
						/>
					</div>
				</div>
			</div>
		);
	}
};

const mapDispatchToProps = {
  getHostSettings : (moduleType) => getHostSettings(moduleType),
	getItemList: (type) => getItemList(type),
	addItemList: (type, data) => addItemList(type, data),
	updateItemList: (type, id, data) => updateItemList(type, id, data),
	updateItemListPosition: (type, itemId, topItem, topBottom) => updateItemListPosition(type, itemId, topItem, topBottom),
  getItemCategories: (type) => getItemCategories(type),
};

const mapStateToProps = (state) => ({
	isItemAdded: state.isItemAdded && state.isItemAdded.isItemAdded,
	currencySymbol: (state.host && state.host.currencySymbol) || "$"

});

export default connect(mapStateToProps, mapDispatchToProps)(FundNeedAddItem);
