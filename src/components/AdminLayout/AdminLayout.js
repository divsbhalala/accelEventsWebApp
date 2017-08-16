import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './AdminLayout.css';
import HeaderNew from '../HeaderNew/HeaderNew';
import Feedback from '../Feedback';
import Footer from '../Footer';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import $ from 'jquery'

class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  _handleDropdowns() {
    $('.fixed-header .sidebar-wrap .dropdown-toggle').on('click', function() {
      var $item = $(this).parent();
      if ($item.hasClass('active')) {
        return;
      } else {
        $('.submenu').slideUp('fast');
        $item.children('.submenu').slideDown('fast');
      }
    });
  }
  _handleSmallNav() {
    $('body').on('mouseenter', '.nav-small .admin-sidebar-wrap .dropdown-toggle', function(e) {
      if ($(document).width() >= 992) {
        var $item = $(this).parent();
        if ($('body').hasClass('fixed-leftmenu')) {
          var topPosition = $item.position().top;
          if ((topPosition + 4 * $(this).outerHeight()) >= $(window)
              .height()) {
            topPosition -= 6 * $(this).outerHeight();
          }
          $('#nav-col-submenu').html($item.children('.submenu').clone());
          $('#nav-col-submenu > .submenu').css({
            'top' : topPosition
          });
        }
        $item.addClass('open');
        $item.children('.submenu').slideDown('fast');
      }
    });
    $('body').on('mouseleave', '.nav-small .admin-sidebar-wrap .nav-pills > li', function(e) {
      if ($(document).width() >= 992) {
        var $item = $(this);
        if ($item.hasClass('open')) {
          $item.find('.open .submenu').slideUp('fast');
          $item.find('.open').removeClass('open');
          $item.children('.submenu').slideUp('fast');
        }
        $item.removeClass('open');
      }
    });
    $('body').on('mouseenter', '.nav-small .admin-sidebar-wrap a:not(.dropdown-toggle)', function(e) {
      if ($('body').hasClass('fixed-leftmenu')) {
        $('#nav-col-submenu').html('');
      }
    });
    $('body').on('mouseleave', '.nav-small .admin-sidebar-wrap', function(e) {
      if ($('body').hasClass('fixed-leftmenu')) {
        $('#nav-col-submenu').html('');
      }
    });
    $('.top-header-wrap #make-small-nav').click(function(e) {
      $('#app').toggleClass('nav-small');
    });
  }
  _handleScrollbar() {
    /*$('.admin-sidebar-wrap #col-left').nanoScroller({
      alwaysVisible : false,
      iOSNativeScrolling : false,
      preventPageScrolling : true,
      contentClass : 'col-left-nano-content'
    });*/
  }
  componentDidMount() {
    // this._handleDropdowns();
    //this._handleSmallNav();
    //this._handleScrollbar();
  }
  render() {
    return (
      <div className={cx("fixed-header nav-small-class", (this.props.class))}>
        <HeaderNew admin={true}/>
        <AdminSidebar />
        {this.props.children}
        {this.props.showFeedBack && <Feedback />}
        <Footer />
      </div>
    );
  }
}

export default AdminLayout;
