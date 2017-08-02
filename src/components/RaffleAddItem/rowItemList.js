import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {
	getItemList,
	addItemList,
	updateItemList,
	updateItemListPosition,
	deleteItemList
} from './../../routes/admin/action';
import ToggleSwitch from '../Widget/ToggleSwitch';
import PopupModel from './../PopupModal/index'
import Button from 'react-bootstrap-button-loader';
import {uploadImage} from '../Widget/UploadFile/action';
import CKEditor from 'react-ckeditor-wrapper';
import UploadImage from '../Widget/UploadFile/UploadImage'

class RowItemList extends React.Component {
	state: Object = {
		value: 0,
		toggle: false,
		uploadedFileCloudinaryUrl: '',
		isDataUpdate: false,

		showPopup: false,
		errorMsg: '',
		popupHeader: '',
		popupType: '',
		loading: false,

		itemNameFeedBack: false,
		itemName: false,
		itemCodeFeedBack: false,
		itemCode: false,
	};

	componentWillReceiveProps() {
		this.setState({
			item: this.props.item
		})
	};

	componentWillMount() {
		this.setState({
			item: this.props.item
		})
	};

	descriptionChangeHandler = (value) => {
		let item = this.state.item;
		item.description = value;
		this.setState({item, isDataUpdate: true})
	}
	itemNameHandlerChange = (e) => {
		this.setState({itemNameFeedBack: true,});
		if (this.itemName.value.trim() == '') {
			this.setState({itemName: false});
		} else {
			this.setState({itemName: true});
		}

		let item = this.state.item;
		item.name = this.itemName.value;
		this.setState({item, isDataUpdate: true})
	}
	itemCodeHandlerChange = (e) => {
    this.itemCode.value= this.itemCode.value.replace(/[^a-zA-Z]/g, '');
		this.setState({itemCodeFeedBack: true,});
		if (this.itemCode.value.trim() == '') {
			this.setState({itemCode: false});
		} else {
			this.setState({itemCode: true});
		}

		let item = this.state.item;
		item.code = this.itemCode.value;
		this.setState({item, isDataUpdate: true})
	}
	imageUploaded = () => {
		this.setState({isDataUpdate: true}, function stateChange() {
			this.autoAddData();
		})
	}
	autoAddData = () => {
		setTimeout(() => {
			if (this.state.item.name && this.state.item.code && this.state.isDataUpdate) {
				if (this.state.item.id) {
					this.props.updateItemList('raffle', this.state.item.id, this.state.item).then(resp => {
					})
				} else {
					this.props.addItemList('raffle', this.state.item).then(resp => {
					})
				}
				this.setState({isDataUpdate: false})
			}
		}, 100)
	}
	deleteAction = () => {
		this.setState({
			showPopup: true,
			errorMsg: 'Are you sure you want to delete User ? ',
			popupHeader: 'Delete Confirmation',
			popupType: 'Delete-Confirmation',
		});
	};
	deleteItemList = () => {
		this.setState({loading: true});
		this.state.item && this.state.item.id &&
		this.props.deleteItemList('raffle', this.state.item.id).then(resp => {
			this.setState({loading: false,showPopup: false,})
		})

	};
	hideItemChangeHandler = () => {
		let item = this.state.item;
		item.active = !item.active;
		this.setState({item, isDataUpdate: true}, function stateChange() {
			this.autoAddData();
		})
	};

	getDragHeight() {
		return 60;
	};

	doToggle = () => {
		this.setState({toggle: !this.state.toggle})
	};
	showPanel = () => {
		this.setState({toggle: true})
	};
	showPopup = () => {
		this.setState({
			showPopup: true,
		});
	};
	hidePopup = () => {
		this.setState({
			showPopup: false,
		});
	};

	render() {
		return (
			<div data-id={36}
					 className={ cx("item-row  ui-sortable-handle", this.state.toggle && "open", this.props.item.images && this.props.item.images[0] && this.props.item.images[0].imageUrl ? "has-image" : "", this.props.item && this.props.item.description ? "has-description" : "")}>
				<div className="flex-row">
					<div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" onClick={this.doToggle}/>
					</div>
					<div className="flex-col item-name-column">
						<input type="hidden" name="id" defaultValue={36}/>
						<input type="text" className="form-control item-name" name="name" maxLength={255}
									 defaultValue={this.props.item.name} onFocus={this.showPanel}
									 ref={ref => {
										 this.itemName = ref;
									 }} onKeyUp={this.itemNameHandlerChange} onBlur={this.autoAddData}/>
						{ this.state.itemNameFeedBack && !this.state.itemName &&
						<small className="error red"> Name is Required.</small>}
					</div>
					<div className="flex-col item-code-column">
						<input type="text" className="form-control item-code alpha-only" name="code"
									 defaultValue={this.props.item.code} maxLength={3} onFocus={this.showPanel}
									 ref={ref => {
										 this.itemCode = ref;
									 }} onKeyUp={this.itemCodeHandlerChange} onBlur={this.autoAddData}/>
						{ this.state.itemCodeFeedBack && !this.state.itemCode &&
						<small className="error red"> Item Code is Required.</small>}
					</div>
					{/*<div className="flex-col item-starting-bid-column">*/}
					{/*<div className="input-group">*/}
					{/*<span className="input-group-addon">$</span>*/}
					{/*<input type="text" className="form-control item-bid" name="startingBid" defaultValue={this.props.item.startingBid}  onFocus={this.showPanel}*/}
					{/*ref={ref=> {this.startingBid=ref;}} onKeyUp={this.startingBidHandlerChange} onBlur={this.autoAddData}/>*/}
					{/*</div>*/}
					{/*</div>*/}
					<div className="flex-col text-center item-actions-column">
						<ul className="list-inline">
							<li>
								<i className={cx("fa fa-2x fa-image edit-item")} onClick={this.doToggle}/>
							</li>
							<li>
								<i className="fa fa-2x fa-file-o edit-item" onClick={this.doToggle}/>
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
										config={{
											toolbarGroups: [
												{name: 'links', groups: ['links']},
												{name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
												{name: 'styles', groups: ['styles']},
												{name: 'colors', groups: ['colors']},
											]
										}} onBlur={this.autoAddData}/>
									<div>
										<UploadImage item={this.props.item} { ...this.state } { ...this.props }
																 imageUploaded={ this.imageUploaded }/>
									</div>
								</div>
								<div className="col-md-4">
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
						<input type="hidden" name defaultValue/>
						<i className="fa fa-trash delete-item red" onClick={this.deleteAction}/>
						<PopupModel
							id="mapPopup"
							showModal={this.state.showPopup}
							headerText={<p>{this.state.popupHeader}</p>}
							modelBody='<div><h1>Location</h1></div>'
							onCloseFunc={this.hidePopup}>
							<div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
								{ this.state && this.state.errorMsg }
								<div className="modal-footer">
									{/*{this.state.popupType == "Invitation-Confirmation" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.resendInvitationUserManagementStaff} >Confirm</Button> : ""}*/}
									{/*{this.state.popupType == "Edit-Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.updatedUserManagementStaff} >Confirm</Button> : ""}*/}
									{this.state.popupType === "Delete-Confirmation" ?
										<Button className="btn btn-danger" loading={this.state.loading} onClick={this.deleteItemList}>Confirm</Button> : ""}
									<button className="btn btn-primary" onClick={this.hidePopup}>Close</button>
								</div>
							</div>
						</PopupModel>
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
	deleteItemList: (type, id) => deleteItemList(type, id),
	uploadImage: (file) => uploadImage(file),
};

const mapStateToProps = (state) => ({
	isItemAdded: state.isItemAdded && state.isItemAdded.isItemAdded
});

export default connect(mapStateToProps, mapDispatchToProps)(RowItemList);
