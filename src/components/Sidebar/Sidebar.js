
import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import Link from '../Link';
import _ from 'lodash';
import  history from  './../../history';

import styled from 'styled-components';
import SideNav, {Nav, NavIcon, NavText, withRR4} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {ic_aspect_ratio} from 'react-icons-kit/md/ic_aspect_ratio';
import {ic_business} from 'react-icons-kit/md/ic_business';
import {ic_business_center} from 'react-icons-kit/md/ic_business_center';
import {ic_format_list_bulleted} from 'react-icons-kit/md/ic_format_list_bulleted';
import {ic_people} from 'react-icons-kit/md/ic_people';
import {ic_shopping_cart} from 'react-icons-kit/md/ic_shopping_cart';
import {cogs} from 'react-icons-kit/fa/cogs';
import {paintBrush} from 'react-icons-kit/fa/paintBrush';
import {ticket} from 'react-icons-kit/fa/ticket';
import {gavel} from 'react-icons-kit/fa/gavel';

const Icon20 = (props) => (<SvgIcon size={props.size || 20} icon={props.icon}/>);

const BaseContainer = props => <div style={{
  display: 'inline-block',
  paddingTop: 16,
  paddingBottom: 16,
  fontFamily: 'Roboto',
  width: 240, ...props.style
}}>{props.children}</div>;

const Title = styled.div`
    padding: 12px;    
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = (props) => {
	return (
		<SeparatorTitleContainer>
			{ props.children }
			<hr style={{border: 0, borderTop: '1px solid #E5E5E5'}}/>
		</SeparatorTitleContainer>
	);
};

const NavMain = {
	dashboard: {title: 'Dashboard', icon: ic_aspect_ratio},
	products: {title: 'Products', icon: ic_business_center},
	orders: {title: 'Orders', icon: ic_format_list_bulleted}
};

const BasicSideNav = (props) => (
	<div id="nav-col">
		<SideNav highlightBgColor='#00bcd4' defaultSelected={props.selected} onItemSelection={ (id, parent) => {
    console.log(id, parent, props, this.props);
  }}>
			<Title> Basic SideNav </Title>

			<Nav id='dashboard'>
				<NavIcon><Icon20 icon={ic_people}/></NavIcon>
				<NavText>
					<Link to="/admin" style={{color: "#333"}}>
						Dashboard </Link>
				</NavText>
				<Nav id='silent_auction_performance'>
					<NavIcon><Icon20 size={16} icon={ic_aspect_ratio}/></NavIcon>
					<NavText>
						<Link to="/admin/auction-performance" style={{color: "#333"}}>Silent Auction Performance</Link>
					</NavText>
				</Nav>
				<Nav id='raffle_performance'>
					<NavIcon><Icon20 size={16} icon={ic_business}/></NavIcon>
					<NavText> <Link to="/admin/raffle-performance" style={{color: "#333"}}>Raffle Performance</Link> </NavText>
				</Nav>
				<Nav id='fund_a_need_performance'>
					<NavIcon><Icon20 size={16} icon={ic_business_center}/></NavIcon>
					<NavText> <Link to="/admin/fund-performance" style={{color: "#333"}}>Fund A Need Performance</Link> </NavText>
				</Nav>
				<Nav id='donation_performance'>
					<NavIcon><Icon20 size={16} icon={ic_business_center}/></NavIcon>
					<NavText> <Link to="/admin/donation-performance" style={{color: "#333"}}>Donation Performance</Link>
					</NavText>
				</Nav>
				<Nav id='ticket_sales_performance'>
					<NavIcon><Icon20 size={16} icon={ic_business_center}/></NavIcon>
					<NavText> <Link to="/admin/ticket-performance" style={{color: "#333"}}>Ticket Sales Performance</Link>
					</NavText>
				</Nav>
			</Nav>

			<Nav id='design'>
				<NavIcon><Icon20 icon={paintBrush}/></NavIcon>
				<NavText> <Link to="/admin/design" style={{color: "#333"}}>
					Design </Link>
				</NavText>
			</Nav>

			<Nav id='ticketing'>
				<NavIcon><Icon20 icon={ticket}/></NavIcon>
				<NavText> <Link to="/admin/ticket" style={{color: "#333"}}>
					Ticketing </Link> </NavText>
			</Nav>

			<Nav id='silent_auction'>
				<NavIcon><Icon20 icon={gavel}/></NavIcon><NavText> <Link to="/admin/auction" style={{color: "#333"}}>Silent
				Auction</Link> </NavText>
			</Nav>

			<Nav id='raffle'>
				<NavIcon><Icon20 icon={ic_business_center}/></NavIcon>
				<NavText> <Link to="/admin/raffle" style={{color: "#333"}}>Raffle</Link> </NavText>
			</Nav>

			<Nav id='fund_a_need'>
				<NavIcon><Icon20 icon={ic_business_center}/></NavIcon><NavText>
				<Link to="/admin/fund" style={{color: "#333"}}>Fund A Need</Link> </NavText>
			</Nav>

			<Nav id='user_management'>
				<NavIcon><Icon20 icon={ic_business_center}/></NavIcon><NavText> <Link to="/admin/users" style={{color: "#333"}}>User
				Management</Link> </NavText>
			</Nav>

			<Nav id='settings'>
				<NavIcon><Icon20 icon={cogs}/></NavIcon><NavText> <Link to="/admin/setting"
				                                                        style={{color: "#333"}}>Settings</Link> </NavText>
			</Nav>
		</SideNav>
	</div>
);


class Sidebar extends React.Component {

	render() {
		return (
			<div className={cx(s.root, this.props.className) } style={this.props.style}>
				<BasicSideNav selected="dashboard"/>
			</div>
		);
	}
}

export default (withStyles(s)(Sidebar))
