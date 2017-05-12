/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

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

const BasicSideNav = (props) => (

  <SideNav highlightBgColor='#00bcd4' defaultSelected={props.selected}>
    <Title> Basic SideNav {console.log(props.selected)}</Title>

    <Nav id='dashboard'>
      <NavIcon><Icon20 icon={ic_aspect_ratio}/></NavIcon>
      <NavText>
        <Link to="/admin" style={{color:"#333"}}>
          Dashboard </Link>
      </NavText>
    </Nav>
    <Nav id='Dashboard'>
      <NavIcon><Icon20 icon={ic_people}/></NavIcon><NavText> Dashboard </NavText>
      <Nav id='dashboard2'>
        <NavIcon><Icon20 size={16} icon={ic_aspect_ratio}/></NavIcon><NavText> Search </NavText>
      </Nav>
      <Nav id='sales2'>
        <NavIcon><Icon20 size={16} icon={ic_business}/></NavIcon><NavText> Promote </NavText>
      </Nav>
      <Nav id='products2'>
        <NavIcon><Icon20 size={16} icon={ic_business_center}/></NavIcon><NavText> Social Media </NavText>
      </Nav>
    </Nav>

    <Nav id='design'>
      <NavIcon><Icon20 icon={paintBrush}/></NavIcon><NavText> Design </NavText>
    </Nav>

    <Nav id='ticketing'>
      <NavIcon><Icon20 icon={ticket}/></NavIcon><NavText> Ticketing </NavText>
    </Nav>

    <Nav id='silent_auction'>
      <NavIcon><Icon20 icon={gavel}/></NavIcon><NavText> Silent Auction </NavText>
    </Nav>

    <Nav id='raffle'>
      <NavIcon><Icon20 icon={ic_business_center}/></NavIcon><NavText> Raffle </NavText>
    </Nav>

    <Nav id='fund_a_need'>
      <NavIcon><Icon20 icon={ic_business_center}/></NavIcon><NavText> Fund A Need </NavText>
    </Nav>

    <Nav id='user_management'>
      <NavIcon><Icon20 icon={ic_business_center}/></NavIcon><NavText>  User Management </NavText>
    </Nav>

    <Nav id='settings'>
      <NavIcon><Icon20 icon={cogs}/></NavIcon><NavText> Settings </NavText>
    </Nav>

    <Nav id='logout'>

      <NavIcon><Icon20 icon={ic_format_list_bulleted}/></NavIcon><NavText> Logout </NavText>

    </Nav>
  </SideNav>
);

const NavMain = {
  dashboard: {title: 'Dashboard', icon: ic_aspect_ratio},
  products: {title: 'Products', icon: ic_business_center},
  orders: {title: 'Orders', icon: ic_format_list_bulleted}
};


class Sidebar extends React.Component {

  render() {
    console.log('{this.props.style}', this.props.className);
    return (
      <div className={cx(s.root, this.props.className) } style={this.props.style}>
        <BasicSideNav selected="customers"/>
      </div>
    );
  }
}

export default (withStyles(s)(Sidebar))
