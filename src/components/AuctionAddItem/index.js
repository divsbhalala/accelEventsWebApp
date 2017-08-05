import React from 'react';
import cx from 'classnames';
import DraggableList from './../draggableList';
import {connect} from 'react-redux';
import RowItemList from './rowItemList';
import {
	getItemList,
	addItemList,
	updateItemList,
	updateItemListPosition,
	getItemCategories
} from './../../routes/admin/action';


class PlanetItem extends React.Component {
	state: Object = {
		value: 0,
		toggle: false,
		message: "",
		status: "",
		categories: "",
	};

	getDragHeight() {
		return 60;
	}

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
				{this.props.item && <RowItemList item={this.props.item}  /> }
			</div>
		);
	}
}

class AuctionAddItem extends React.Component {
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
		this.props.getItemList("auction").then(resp => {
			if (resp && resp.data && resp.data.items.length) {
				this.setState({list: resp.data.items, categories: resp.data.items[0].categories});
				console.log(this.state.items);
			}
			else {
				this.props.getItemCategories("auction").then(resp => {
					this.setState({
						categories: resp.data.itemCategories.map((value) => {
							return value.name
						})
					});
					this.addEmptyRow()
				});
				console.log(resp);
			}
		}).catch((error) => {
			console.log(error);
		});
	};

	componentWillMount() {
		this.getItemList()
	};

	onListChange(newList: Array<Object>, movedItem: Array<Object>, oldIndex: number, newIndex: number) {
		this.setState({list: newList});
		let topItem = newIndex === 0 ? 0 : newList[newIndex - 1].id;
		let bottomItem = newIndex === newList.length - 1 ? 0 : newList[newIndex + 1].id;
		if ( newList[newIndex].id && topItem && bottomItem) {
			this.props.updateItemListPosition('auction', newList[newIndex].id, topItem, bottomItem).then(resp => {
				if (resp && resp.data && resp.data.items.length) {
					this.setState({list: resp.data.items});
					console.log(this.state.items);
				}
				else {
					console.log(resp);
				}
			}).catch((error) => {
				console.log(error);
			});
		}
	}

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
			"bidIncrement": 0,
			"buyItNowPrice": 0,
			"categories": this.state.categories,
			"code": "",
			"description": "",
			"images": [
				{
					"imageUrl": ""
				}
			],
			"marketValue": 0,
			"name": "",
			"startingBid": 0
		};
		list.unshift(data);
		this.setState({list})
	};

	render() {
		const {useContainer} = this.state;
		return (
			<div>
				<p>Add the items that will be available at your silent auction. There are not limits on the number of items
					which you can add. Attendees will submit bids for an item by replying to the event text message number with
					the 3 letter item code followed by the dollar amount they would like to place for that item. After their first
					bid they will be asked to confirm their bid by replying to the text message with their first and last name.ADD
					ITEM
				</p>
				<div className="text-left mrg-t-md">
					<button className="btn btn-info add-new-item mrg-t-lg" onClick={this.addNewRow}> &nbsp; Add
						Item &nbsp; </button>
				</div>
				<div className="ajax-wrap">
					{this.state.message && <div
						className={cx("alert", this.props.isItemAdded &&  this.props.isItemAdded.status === "success" ? "alert-success" : "alert-danger")}>{this.state.message}</div>}
				</div>
				<div className="table-header">
					<div className="flex-row">
						<div className="flex-col plus-sign-column"/>
						<div className="flex-col item-name-column"><span>Item name</span></div>
						<div className="flex-col item-code-column"><span>Item code</span></div>
						<div className="flex-col item-starting-bid-column"><span>Starting Bid</span></div>
						<div className="flex-col item-starting-bid-column"><span>Buy It Now Price</span></div>
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
}

const mapDispatchToProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionAddItem);
