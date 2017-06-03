/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Fund from './Fund';
import Raffle from './Raffle';
import Auction from './Auction';

const title = 'Event Page';
export default {
    path: '/goal/:params',
    children:[
        {
            path: '/',
            async action(props) {
                return {
                    title,
                    component: <Layout params={props.params}><Auction title={title} params={props.params} /></Layout>,
                };
            }
        },
        {
            path:'/auction',
            action(props) {
                return {
                    title:"Auction Page",
                    component: <Layout params={props.params}><Auction params={props.params} itemCode={props.params && props.params.ItemCode} title={title} /></Layout>,
                };
            }
        },
        {
            path:'/fund',
            action(props) {
                return {
                    title:"Fund Page",
                    component: <Layout params={props.params}><Fund  params={props.params} itemCode={props.params && props.params.ItemCode}  title={title}  /></Layout>,
                };
            }
        },
        {
                path:'/raffle',
            action(props) {
                return {
                    title:"Raffle Page",
                    component: <Layout params={props.params}><Raffle params={props.params} itemCode={props.params && props.params.ItemCode} title={title}  /></Layout>,
                };
            }
        }
        ]

};
