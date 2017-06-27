
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './RaffleSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class RaffleSetting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-2 col-sm-10">
            <div id="content-wrapper">
              <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          Raffle Settings
                          <div className="pull-right">
                            <button className="btn btn-info btn-block" type="submit" onclick="$('.main-box > .form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className>
                      <div className="main-box no-header">
                        <div id="formmessage" />
                        <form id="command" className="form" action="update" method="POST">
                          <input type="hidden" name="id" defaultValue={283} />
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Raffle end time
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <input type="text" className="form-control datetimepicker white-bg" name="newEndDate" id="newEndDate" defaultValue="2017/07/23 02:30" readOnly="readonly" />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Select Timezone
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <select name="timezone" className="form-control">
                                <option value="Etc/GMT+12">Etc/GMT+12 (GMT-12:00)</option>
                                <option value="Pacific/Pago_Pago">Pacific/Pago_Pago (GMT-11:00)</option>
                                <option value="Pacific/Samoa">Pacific/Samoa (GMT-11:00)</option>
                                <option value="Pacific/Niue">Pacific/Niue (GMT-11:00)</option>
                                <option value="US/Samoa">US/Samoa (GMT-11:00)</option>
                                <option value="Etc/GMT+11">Etc/GMT+11 (GMT-11:00)</option>
                                <option value="Pacific/Midway">Pacific/Midway (GMT-11:00)</option>
                                <option value="Pacific/Honolulu">Pacific/Honolulu (GMT-10:00)</option>
                                <option value="Pacific/Rarotonga">Pacific/Rarotonga (GMT-10:00)</option>
                                <option value="Pacific/Tahiti">Pacific/Tahiti (GMT-10:00)</option>
                                <option value="Pacific/Johnston">Pacific/Johnston (GMT-10:00)</option>
                                <option value="America/Atka">America/Atka (GMT-10:00)</option>
                                <option value="US/Hawaii">US/Hawaii (GMT-10:00)</option>
                                <option value="SystemV/HST10">SystemV/HST10 (GMT-10:00)</option>
                                <option value="America/Adak">America/Adak (GMT-10:00)</option>
                                <option value="US/Aleutian">US/Aleutian (GMT-10:00)</option>
                                <option value="Etc/GMT+10">Etc/GMT+10 (GMT-10:00)</option>
                                <option value="Pacific/Marquesas">Pacific/Marquesas (GMT-9:30)</option>
                                <option value="Etc/GMT+9">Etc/GMT+9 (GMT-9:00)</option>
                                <option value="US/Alaska">US/Alaska (GMT-9:00)</option>
                                <option value="America/Juneau">America/Juneau (GMT-9:00)</option>
                                <option value="America/Metlakatla">America/Metlakatla (GMT-9:00)</option>
                                <option value="Pacific/Gambier">Pacific/Gambier (GMT-9:00)</option>
                                <option value="America/Yakutat">America/Yakutat (GMT-9:00)</option>
                                <option value="America/Sitka">America/Sitka (GMT-9:00)</option>
                                <option value="SystemV/YST9">SystemV/YST9 (GMT-9:00)</option>
                                <option value="America/Anchorage">America/Anchorage (GMT-9:00)</option>
                                <option value="America/Nome">America/Nome (GMT-9:00)</option>
                                <option value="SystemV/YST9YDT">SystemV/YST9YDT (GMT-9:00)</option>
                                <option value="Etc/GMT+8">Etc/GMT+8 (GMT-8:00)</option>
                                <option value="Canada/Yukon">Canada/Yukon (GMT-8:00)</option>
                                <option value="US/Pacific-New">US/Pacific-New (GMT-8:00)</option>
                                <option value="Canada/Pacific">Canada/Pacific (GMT-8:00)</option>
                                <option value="PST8PDT">PST8PDT (GMT-8:00)</option>
                                <option value="Pacific/Pitcairn">Pacific/Pitcairn (GMT-8:00)</option>
                                <option value="America/Dawson">America/Dawson (GMT-8:00)</option>
                                <option value="Mexico/BajaNorte">Mexico/BajaNorte (GMT-8:00)</option>
                                <option value="America/Tijuana">America/Tijuana (GMT-8:00)</option>
                                <option value="SystemV/PST8">SystemV/PST8 (GMT-8:00)</option>
                                <option value="America/Santa_Isabel">America/Santa_Isabel (GMT-8:00)</option>
                                <option value="America/Vancouver">America/Vancouver (GMT-8:00)</option>
                                <option value="America/Ensenada">America/Ensenada (GMT-8:00)</option>
                                <option value="America/Whitehorse">America/Whitehorse (GMT-8:00)</option>
                                <option value="SystemV/PST8PDT">SystemV/PST8PDT (GMT-8:00)</option>
                                <option value="America/Los_Angeles">America/Los_Angeles (GMT-8:00)</option>
                                <option value="US/Pacific">US/Pacific (GMT-8:00)</option>
                                <option value="Etc/GMT+7">Etc/GMT+7 (GMT-7:00)</option>
                                <option value="US/Arizona">US/Arizona (GMT-7:00)</option>
                                <option value="Mexico/BajaSur">Mexico/BajaSur (GMT-7:00)</option>
                                <option value="America/Dawson_Creek">America/Dawson_Creek (GMT-7:00)</option>
                                <option value="America/Denver">America/Denver (GMT-7:00)</option>
                                <option value="America/Yellowknife">America/Yellowknife (GMT-7:00)</option>
                                <option value="America/Inuvik">America/Inuvik (GMT-7:00)</option>
                                <option value="America/Mazatlan">America/Mazatlan (GMT-7:00)</option>
                                <option value="SystemV/MST7">SystemV/MST7 (GMT-7:00)</option>
                                <option value="America/Boise">America/Boise (GMT-7:00)</option>
                                <option value="MST7MDT">MST7MDT (GMT-7:00)</option>
                                <option value="America/Chihuahua">America/Chihuahua (GMT-7:00)</option>
                                <option value="America/Ojinaga">America/Ojinaga (GMT-7:00)</option>
                                <option value="US/Mountain">US/Mountain (GMT-7:00)</option>
                                <option value="America/Creston">America/Creston (GMT-7:00)</option>
                                <option value="America/Edmonton">America/Edmonton (GMT-7:00)</option>
                                <option value="America/Hermosillo">America/Hermosillo (GMT-7:00)</option>
                                <option value="Canada/Mountain">Canada/Mountain (GMT-7:00)</option>
                                <option value="America/Cambridge_Bay">America/Cambridge_Bay (GMT-7:00)</option>
                                <option value="Navajo">Navajo (GMT-7:00)</option>
                                <option value="America/Phoenix">America/Phoenix (GMT-7:00)</option>
                                <option value="SystemV/MST7MDT">SystemV/MST7MDT (GMT-7:00)</option>
                                <option value="America/Fort_Nelson">America/Fort_Nelson (GMT-7:00)</option>
                                <option value="America/Shiprock">America/Shiprock (GMT-7:00)</option>
                                <option value="America/El_Salvador">America/El_Salvador (GMT-6:00)</option>
                                <option value="America/Guatemala">America/Guatemala (GMT-6:00)</option>
                                <option value="America/Belize">America/Belize (GMT-6:00)</option>
                                <option value="America/Managua">America/Managua (GMT-6:00)</option>
                                <option value="America/Chicago">America/Chicago (GMT-6:00)</option>
                                <option value="America/Tegucigalpa">America/Tegucigalpa (GMT-6:00)</option>
                                <option value="Etc/GMT+6">Etc/GMT+6 (GMT-6:00)</option>
                                <option value="Pacific/Easter">Pacific/Easter (GMT-6:00)</option>
                                <option value="America/Regina">America/Regina (GMT-6:00)</option>
                                <option value="Mexico/General">Mexico/General (GMT-6:00)</option>
                                <option value="America/Rankin_Inlet">America/Rankin_Inlet (GMT-6:00)</option>
                                <option value="US/Central">US/Central (GMT-6:00)</option>
                                <option value="Pacific/Galapagos">Pacific/Galapagos (GMT-6:00)</option>
                                <option value="America/Rainy_River">America/Rainy_River (GMT-6:00)</option>
                                <option value="America/Swift_Current">America/Swift_Current (GMT-6:00)</option>
                                <option value="America/Costa_Rica">America/Costa_Rica (GMT-6:00)</option>
                                <option value="America/Indiana/Knox">America/Indiana/Knox (GMT-6:00)</option>
                                <option value="America/North_Dakota/Beulah">America/North_Dakota/Beulah (GMT-6:00)</option>
                                <option value="Canada/East-Saskatchewan">Canada/East-Saskatchewan (GMT-6:00)</option>
                                <option value="America/Monterrey">America/Monterrey (GMT-6:00)</option>
                                <option value="SystemV/CST6">SystemV/CST6 (GMT-6:00)</option>
                                <option value="America/North_Dakota/Center">America/North_Dakota/Center (GMT-6:00)</option>
                                <option value="America/Indiana/Tell_City">America/Indiana/Tell_City (GMT-6:00)</option>
                                <option value="Chile/EasterIsland">Chile/EasterIsland (GMT-6:00)</option>
                                <option value="America/Mexico_City">America/Mexico_City (GMT-6:00)</option>
                                <option value="America/Matamoros">America/Matamoros (GMT-6:00)</option>
                                <option value="CST6CDT">CST6CDT (GMT-6:00)</option>
                                <option value="America/Knox_IN">America/Knox_IN (GMT-6:00)</option>
                                <option value="America/Menominee">America/Menominee (GMT-6:00)</option>
                                <option value="America/Resolute">America/Resolute (GMT-6:00)</option>
                                <option value="Canada/Central">Canada/Central (GMT-6:00)</option>
                                <option value="America/Bahia_Banderas">America/Bahia_Banderas (GMT-6:00)</option>
                                <option value="US/Indiana-Starke">US/Indiana-Starke (GMT-6:00)</option>
                                <option value="SystemV/CST6CDT">SystemV/CST6CDT (GMT-6:00)</option>
                                <option value="America/Merida">America/Merida (GMT-6:00)</option>
                                <option value="Canada/Saskatchewan">Canada/Saskatchewan (GMT-6:00)</option>
                                <option value="America/North_Dakota/New_Salem">America/North_Dakota/New_Salem (GMT-6:00)</option>
                                <option value="America/Winnipeg">America/Winnipeg (GMT-6:00)</option>
                                <option value="America/Panama">America/Panama (GMT-5:00)</option>
                                <option value="America/Indiana/Petersburg">America/Indiana/Petersburg (GMT-5:00)</option>
                                <option value="America/Eirunepe">America/Eirunepe (GMT-5:00)</option>
                                <option value="Cuba">Cuba (GMT-5:00)</option>
                                <option value="Etc/GMT+5">Etc/GMT+5 (GMT-5:00)</option>
                                <option value="America/Fort_Wayne">America/Fort_Wayne (GMT-5:00)</option>
                                <option value="America/Havana">America/Havana (GMT-5:00)</option>
                                <option value="America/Porto_Acre">America/Porto_Acre (GMT-5:00)</option>
                                <option value="US/Michigan">US/Michigan (GMT-5:00)</option>
                                <option value="America/Louisville">America/Louisville (GMT-5:00)</option>
                                <option value="America/Guayaquil">America/Guayaquil (GMT-5:00)</option>
                                <option value="America/Indiana/Vevay">America/Indiana/Vevay (GMT-5:00)</option>
                                <option value="America/Indiana/Vincennes">America/Indiana/Vincennes (GMT-5:00)</option>
                                <option value="America/Indianapolis">America/Indianapolis (GMT-5:00)</option>
                                <option value="America/Iqaluit">America/Iqaluit (GMT-5:00)</option>
                                <option value="America/Kentucky/Louisville">America/Kentucky/Louisville (GMT-5:00)</option>
                                <option value="EST5EDT">EST5EDT (GMT-5:00)</option>
                                <option value="America/Nassau">America/Nassau (GMT-5:00)</option>
                                <option value="America/Jamaica">America/Jamaica (GMT-5:00)</option>
                                <option value="America/Atikokan">America/Atikokan (GMT-5:00)</option>
                                <option value="America/Kentucky/Monticello">America/Kentucky/Monticello (GMT-5:00)</option>
                                <option value="America/Coral_Harbour">America/Coral_Harbour (GMT-5:00)</option>
                                <option value="America/Cayman">America/Cayman (GMT-5:00)</option>
                                <option value="America/Indiana/Indianapolis">America/Indiana/Indianapolis (GMT-5:00)</option>
                                <option value="America/Thunder_Bay">America/Thunder_Bay (GMT-5:00)</option>
                                <option value="America/Indiana/Marengo">America/Indiana/Marengo (GMT-5:00)</option>
                                <option value="America/Bogota">America/Bogota (GMT-5:00)</option>
                                <option value="SystemV/EST5">SystemV/EST5 (GMT-5:00)</option>
                                <option value="US/Eastern">US/Eastern (GMT-5:00)</option>
                                <option value="Canada/Eastern">Canada/Eastern (GMT-5:00)</option>
                                <option value="America/Port-au-Prince">America/Port-au-Prince (GMT-5:00)</option>
                                <option value="America/Nipigon">America/Nipigon (GMT-5:00)</option>
                                <option value="Brazil/Acre">Brazil/Acre (GMT-5:00)</option>
                                <option value="US/East-Indiana">US/East-Indiana (GMT-5:00)</option>
                                <option value="America/Cancun">America/Cancun (GMT-5:00)</option>
                                <option value="America/Lima">America/Lima (GMT-5:00)</option>
                                <option value="America/Rio_Branco">America/Rio_Branco (GMT-5:00)</option>
                                <option value="America/Detroit">America/Detroit (GMT-5:00)</option>
                                <option value="Jamaica">Jamaica (GMT-5:00)</option>
                                <option value="America/Pangnirtung">America/Pangnirtung (GMT-5:00)</option>
                                <option value="America/Montreal">America/Montreal (GMT-5:00)</option>
                                <option value="America/Indiana/Winamac">America/Indiana/Winamac (GMT-5:00)</option>
                                <option value="America/New_York" selected="selected">America/New_York (GMT-5:00)</option>
                                <option value="America/Toronto">America/Toronto (GMT-5:00)</option>
                                <option value="SystemV/EST5EDT">SystemV/EST5EDT (GMT-5:00)</option>
                                <option value="America/Cuiaba">America/Cuiaba (GMT-4:00)</option>
                                <option value="America/Marigot">America/Marigot (GMT-4:00)</option>
                                <option value="Chile/Continental">Chile/Continental (GMT-4:00)</option>
                                <option value="Canada/Atlantic">Canada/Atlantic (GMT-4:00)</option>
                                <option value="America/Grand_Turk">America/Grand_Turk (GMT-4:00)</option>
                                <option value="Etc/GMT+4">Etc/GMT+4 (GMT-4:00)</option>
                                <option value="America/Manaus">America/Manaus (GMT-4:00)</option>
                                <option value="America/St_Thomas">America/St_Thomas (GMT-4:00)</option>
                                <option value="America/Anguilla">America/Anguilla (GMT-4:00)</option>
                                <option value="America/Barbados">America/Barbados (GMT-4:00)</option>
                                <option value="America/Curacao">America/Curacao (GMT-4:00)</option>
                                <option value="America/Guyana">America/Guyana (GMT-4:00)</option>
                                <option value="America/Martinique">America/Martinique (GMT-4:00)</option>
                                <option value="America/Puerto_Rico">America/Puerto_Rico (GMT-4:00)</option>
                                <option value="America/Port_of_Spain">America/Port_of_Spain (GMT-4:00)</option>
                                <option value="SystemV/AST4">SystemV/AST4 (GMT-4:00)</option>
                                <option value="America/Kralendijk">America/Kralendijk (GMT-4:00)</option>
                                <option value="America/Antigua">America/Antigua (GMT-4:00)</option>
                                <option value="America/Moncton">America/Moncton (GMT-4:00)</option>
                                <option value="America/St_Vincent">America/St_Vincent (GMT-4:00)</option>
                                <option value="America/Dominica">America/Dominica (GMT-4:00)</option>
                                <option value="America/Asuncion">America/Asuncion (GMT-4:00)</option>
                                <option value="Atlantic/Bermuda">Atlantic/Bermuda (GMT-4:00)</option>
                                <option value="Brazil/West">Brazil/West (GMT-4:00)</option>
                                <option value="America/Aruba">America/Aruba (GMT-4:00)</option>
                                <option value="America/Halifax">America/Halifax (GMT-4:00)</option>
                                <option value="America/Santiago">America/Santiago (GMT-4:00)</option>
                                <option value="America/La_Paz">America/La_Paz (GMT-4:00)</option>
                                <option value="Antarctica/Palmer">Antarctica/Palmer (GMT-4:00)</option>
                                <option value="America/Blanc-Sablon">America/Blanc-Sablon (GMT-4:00)</option>
                                <option value="America/Santo_Domingo">America/Santo_Domingo (GMT-4:00)</option>
                                <option value="America/Glace_Bay">America/Glace_Bay (GMT-4:00)</option>
                                <option value="America/St_Barthelemy">America/St_Barthelemy (GMT-4:00)</option>
                                <option value="America/St_Lucia">America/St_Lucia (GMT-4:00)</option>
                                <option value="America/Montserrat">America/Montserrat (GMT-4:00)</option>
                                <option value="America/Lower_Princes">America/Lower_Princes (GMT-4:00)</option>
                                <option value="America/Thule">America/Thule (GMT-4:00)</option>
                                <option value="America/Tortola">America/Tortola (GMT-4:00)</option>
                                <option value="America/Porto_Velho">America/Porto_Velho (GMT-4:00)</option>
                                <option value="America/Campo_Grande">America/Campo_Grande (GMT-4:00)</option>
                                <option value="America/Goose_Bay">America/Goose_Bay (GMT-4:00)</option>
                                <option value="America/Virgin">America/Virgin (GMT-4:00)</option>
                                <option value="America/Boa_Vista">America/Boa_Vista (GMT-4:00)</option>
                                <option value="America/Grenada">America/Grenada (GMT-4:00)</option>
                                <option value="America/St_Kitts">America/St_Kitts (GMT-4:00)</option>
                                <option value="America/Caracas">America/Caracas (GMT-4:00)</option>
                                <option value="America/Guadeloupe">America/Guadeloupe (GMT-4:00)</option>
                                <option value="SystemV/AST4ADT">SystemV/AST4ADT (GMT-4:00)</option>
                                <option value="America/St_Johns">America/St_Johns (GMT-3:30)</option>
                                <option value="Canada/Newfoundland">Canada/Newfoundland (GMT-3:30)</option>
                                <option value="America/Miquelon">America/Miquelon (GMT-3:00)</option>
                                <option value="America/Argentina/Catamarca">America/Argentina/Catamarca (GMT-3:00)</option>
                                <option value="America/Argentina/Cordoba">America/Argentina/Cordoba (GMT-3:00)</option>
                                <option value="America/Araguaina">America/Araguaina (GMT-3:00)</option>
                                <option value="America/Argentina/Salta">America/Argentina/Salta (GMT-3:00)</option>
                                <option value="Etc/GMT+3">Etc/GMT+3 (GMT-3:00)</option>
                                <option value="America/Montevideo">America/Montevideo (GMT-3:00)</option>
                                <option value="Brazil/East">Brazil/East (GMT-3:00)</option>
                                <option value="America/Argentina/Mendoza">America/Argentina/Mendoza (GMT-3:00)</option>
                                <option value="America/Argentina/Rio_Gallegos">America/Argentina/Rio_Gallegos (GMT-3:00)</option>
                                <option value="America/Catamarca">America/Catamarca (GMT-3:00)</option>
                                <option value="America/Godthab">America/Godthab (GMT-3:00)</option>
                                <option value="America/Cordoba">America/Cordoba (GMT-3:00)</option>
                                <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3:00)</option>
                                <option value="America/Argentina/Jujuy">America/Argentina/Jujuy (GMT-3:00)</option>
                                <option value="America/Cayenne">America/Cayenne (GMT-3:00)</option>
                                <option value="America/Recife">America/Recife (GMT-3:00)</option>
                                <option value="America/Buenos_Aires">America/Buenos_Aires (GMT-3:00)</option>
                                <option value="America/Paramaribo">America/Paramaribo (GMT-3:00)</option>
                                <option value="America/Mendoza">America/Mendoza (GMT-3:00)</option>
                                <option value="America/Santarem">America/Santarem (GMT-3:00)</option>
                                <option value="America/Maceio">America/Maceio (GMT-3:00)</option>
                                <option value="Atlantic/Stanley">Atlantic/Stanley (GMT-3:00)</option>
                                <option value="Antarctica/Rothera">Antarctica/Rothera (GMT-3:00)</option>
                                <option value="America/Argentina/San_Luis">America/Argentina/San_Luis (GMT-3:00)</option>
                                <option value="America/Argentina/Ushuaia">America/Argentina/Ushuaia (GMT-3:00)</option>
                                <option value="America/Fortaleza">America/Fortaleza (GMT-3:00)</option>
                                <option value="America/Argentina/La_Rioja">America/Argentina/La_Rioja (GMT-3:00)</option>
                                <option value="America/Belem">America/Belem (GMT-3:00)</option>
                                <option value="America/Jujuy">America/Jujuy (GMT-3:00)</option>
                                <option value="America/Bahia">America/Bahia (GMT-3:00)</option>
                                <option value="America/Argentina/San_Juan">America/Argentina/San_Juan (GMT-3:00)</option>
                                <option value="America/Argentina/ComodRivadavia">America/Argentina/ComodRivadavia (GMT-3:00)</option>
                                <option value="America/Argentina/Tucuman">America/Argentina/Tucuman (GMT-3:00)</option>
                                <option value="America/Rosario">America/Rosario (GMT-3:00)</option>
                                <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires (GMT-3:00)</option>
                                <option value="Etc/GMT+2">Etc/GMT+2 (GMT-2:00)</option>
                                <option value="America/Noronha">America/Noronha (GMT-2:00)</option>
                                <option value="Brazil/DeNoronha">Brazil/DeNoronha (GMT-2:00)</option>
                                <option value="Atlantic/South_Georgia">Atlantic/South_Georgia (GMT-2:00)</option>
                                <option value="Etc/GMT+1">Etc/GMT+1 (GMT-1:00)</option>
                                <option value="Atlantic/Cape_Verde">Atlantic/Cape_Verde (GMT-1:00)</option>
                                <option value="Atlantic/Azores">Atlantic/Azores (GMT-1:00)</option>
                                <option value="America/Scoresbysund">America/Scoresbysund (GMT-1:00)</option>
                                <option value="Europe/London">Europe/London (GMT0:00)</option>
                                <option value="GMT">GMT (GMT0:00)</option>
                                <option value="Etc/GMT-0">Etc/GMT-0 (GMT0:00)</option>
                                <option value="Europe/Jersey">Europe/Jersey (GMT0:00)</option>
                                <option value="Atlantic/St_Helena">Atlantic/St_Helena (GMT0:00)</option>
                                <option value="Europe/Guernsey">Europe/Guernsey (GMT0:00)</option>
                                <option value="Europe/Isle_of_Man">Europe/Isle_of_Man (GMT0:00)</option>
                                <option value="Etc/GMT+0">Etc/GMT+0 (GMT0:00)</option>
                                <option value="Africa/Banjul">Africa/Banjul (GMT0:00)</option>
                                <option value="Etc/GMT">Etc/GMT (GMT0:00)</option>
                                <option value="Africa/Freetown">Africa/Freetown (GMT0:00)</option>
                                <option value="GB-Eire">GB-Eire (GMT0:00)</option>
                                <option value="Africa/Bamako">Africa/Bamako (GMT0:00)</option>
                                <option value="GB">GB (GMT0:00)</option>
                                <option value="Africa/Conakry">Africa/Conakry (GMT0:00)</option>
                                <option value="Portugal">Portugal (GMT0:00)</option>
                                <option value="Universal">Universal (GMT0:00)</option>
                                <option value="Africa/Sao_Tome">Africa/Sao_Tome (GMT0:00)</option>
                                <option value="Africa/Nouakchott">Africa/Nouakchott (GMT0:00)</option>
                                <option value="Antarctica/Troll">Antarctica/Troll (GMT0:00)</option>
                                <option value="UTC">UTC (GMT0:00)</option>
                                <option value="Etc/Universal">Etc/Universal (GMT0:00)</option>
                                <option value="Atlantic/Faeroe">Atlantic/Faeroe (GMT0:00)</option>
                                <option value="Africa/Abidjan">Africa/Abidjan (GMT0:00)</option>
                                <option value="Eire">Eire (GMT0:00)</option>
                                <option value="Africa/Accra">Africa/Accra (GMT0:00)</option>
                                <option value="Atlantic/Faroe">Atlantic/Faroe (GMT0:00)</option>
                                <option value="Etc/UCT">Etc/UCT (GMT0:00)</option>
                                <option value="GMT0">GMT0 (GMT0:00)</option>
                                <option value="Europe/Dublin">Europe/Dublin (GMT0:00)</option>
                                <option value="Zulu">Zulu (GMT0:00)</option>
                                <option value="Africa/El_Aaiun">Africa/El_Aaiun (GMT0:00)</option>
                                <option value="Africa/Ouagadougou">Africa/Ouagadougou (GMT0:00)</option>
                                <option value="Atlantic/Reykjavik">Atlantic/Reykjavik (GMT0:00)</option>
                                <option value="Atlantic/Madeira">Atlantic/Madeira (GMT0:00)</option>
                                <option value="Etc/Zulu">Etc/Zulu (GMT0:00)</option>
                                <option value="Iceland">Iceland (GMT0:00)</option>
                                <option value="Europe/Lisbon">Europe/Lisbon (GMT0:00)</option>
                                <option value="Atlantic/Canary">Atlantic/Canary (GMT0:00)</option>
                                <option value="Africa/Lome">Africa/Lome (GMT0:00)</option>
                                <option value="Greenwich">Greenwich (GMT0:00)</option>
                                <option value="Africa/Casablanca">Africa/Casablanca (GMT0:00)</option>
                                <option value="Europe/Belfast">Europe/Belfast (GMT0:00)</option>
                                <option value="Etc/GMT0">Etc/GMT0 (GMT0:00)</option>
                                <option value="America/Danmarkshavn">America/Danmarkshavn (GMT0:00)</option>
                                <option value="Africa/Dakar">Africa/Dakar (GMT0:00)</option>
                                <option value="Africa/Bissau">Africa/Bissau (GMT0:00)</option>
                                <option value="WET">WET (GMT0:00)</option>
                                <option value="Etc/Greenwich">Etc/Greenwich (GMT0:00)</option>
                                <option value="Africa/Timbuktu">Africa/Timbuktu (GMT0:00)</option>
                                <option value="UCT">UCT (GMT0:00)</option>
                                <option value="Africa/Monrovia">Africa/Monrovia (GMT0:00)</option>
                                <option value="Etc/UTC">Etc/UTC (GMT0:00)</option>
                                <option value="Europe/Brussels">Europe/Brussels (GMT+1:00)</option>
                                <option value="Europe/Warsaw">Europe/Warsaw (GMT+1:00)</option>
                                <option value="CET">CET (GMT+1:00)</option>
                                <option value="Etc/GMT-1">Etc/GMT-1 (GMT+1:00)</option>
                                <option value="Europe/Luxembourg">Europe/Luxembourg (GMT+1:00)</option>
                                <option value="Africa/Tunis">Africa/Tunis (GMT+1:00)</option>
                                <option value="Africa/Windhoek">Africa/Windhoek (GMT+1:00)</option>
                                <option value="Europe/Malta">Europe/Malta (GMT+1:00)</option>
                                <option value="Europe/Busingen">Europe/Busingen (GMT+1:00)</option>
                                <option value="Africa/Malabo">Africa/Malabo (GMT+1:00)</option>
                                <option value="Europe/Skopje">Europe/Skopje (GMT+1:00)</option>
                                <option value="Europe/Sarajevo">Europe/Sarajevo (GMT+1:00)</option>
                                <option value="Africa/Lagos">Africa/Lagos (GMT+1:00)</option>
                                <option value="Europe/Rome">Europe/Rome (GMT+1:00)</option>
                                <option value="Africa/Algiers">Africa/Algiers (GMT+1:00)</option>
                                <option value="Europe/Zurich">Europe/Zurich (GMT+1:00)</option>
                                <option value="Europe/Gibraltar">Europe/Gibraltar (GMT+1:00)</option>
                                <option value="Europe/Vaduz">Europe/Vaduz (GMT+1:00)</option>
                                <option value="Europe/Ljubljana">Europe/Ljubljana (GMT+1:00)</option>
                                <option value="Europe/Berlin">Europe/Berlin (GMT+1:00)</option>
                                <option value="Europe/Stockholm">Europe/Stockholm (GMT+1:00)</option>
                                <option value="Europe/Budapest">Europe/Budapest (GMT+1:00)</option>
                                <option value="Europe/Zagreb">Europe/Zagreb (GMT+1:00)</option>
                                <option value="Europe/Paris">Europe/Paris (GMT+1:00)</option>
                                <option value="Africa/Ndjamena">Africa/Ndjamena (GMT+1:00)</option>
                                <option value="Africa/Ceuta">Africa/Ceuta (GMT+1:00)</option>
                                <option value="Europe/Prague">Europe/Prague (GMT+1:00)</option>
                                <option value="Europe/Copenhagen">Europe/Copenhagen (GMT+1:00)</option>
                                <option value="Europe/Vienna">Europe/Vienna (GMT+1:00)</option>
                                <option value="Europe/Tirane">Europe/Tirane (GMT+1:00)</option>
                                <option value="MET">MET (GMT+1:00)</option>
                                <option value="Europe/Amsterdam">Europe/Amsterdam (GMT+1:00)</option>
                                <option value="Africa/Libreville">Africa/Libreville (GMT+1:00)</option>
                                <option value="Europe/San_Marino">Europe/San_Marino (GMT+1:00)</option>
                                <option value="Africa/Douala">Africa/Douala (GMT+1:00)</option>
                                <option value="Africa/Brazzaville">Africa/Brazzaville (GMT+1:00)</option>
                                <option value="Africa/Porto-Novo">Africa/Porto-Novo (GMT+1:00)</option>
                                <option value="Poland">Poland (GMT+1:00)</option>
                                <option value="Europe/Andorra">Europe/Andorra (GMT+1:00)</option>
                                <option value="Europe/Oslo">Europe/Oslo (GMT+1:00)</option>
                                <option value="Europe/Podgorica">Europe/Podgorica (GMT+1:00)</option>
                                <option value="Africa/Luanda">Africa/Luanda (GMT+1:00)</option>
                                <option value="Atlantic/Jan_Mayen">Atlantic/Jan_Mayen (GMT+1:00)</option>
                                <option value="Africa/Kinshasa">Africa/Kinshasa (GMT+1:00)</option>
                                <option value="Europe/Madrid">Europe/Madrid (GMT+1:00)</option>
                                <option value="Africa/Bangui">Africa/Bangui (GMT+1:00)</option>
                                <option value="Europe/Belgrade">Europe/Belgrade (GMT+1:00)</option>
                                <option value="Africa/Niamey">Africa/Niamey (GMT+1:00)</option>
                                <option value="Europe/Bratislava">Europe/Bratislava (GMT+1:00)</option>
                                <option value="Arctic/Longyearbyen">Arctic/Longyearbyen (GMT+1:00)</option>
                                <option value="Europe/Vatican">Europe/Vatican (GMT+1:00)</option>
                                <option value="Europe/Monaco">Europe/Monaco (GMT+1:00)</option>
                                <option value="Africa/Cairo">Africa/Cairo (GMT+2:00)</option>
                                <option value="Africa/Mbabane">Africa/Mbabane (GMT+2:00)</option>
                                <option value="Europe/Istanbul">Europe/Istanbul (GMT+2:00)</option>
                                <option value="Etc/GMT-2">Etc/GMT-2 (GMT+2:00)</option>
                                <option value="Europe/Zaporozhye">Europe/Zaporozhye (GMT+2:00)</option>
                                <option value="Libya">Libya (GMT+2:00)</option>
                                <option value="Africa/Kigali">Africa/Kigali (GMT+2:00)</option>
                                <option value="Africa/Tripoli">Africa/Tripoli (GMT+2:00)</option>
                                <option value="Israel">Israel (GMT+2:00)</option>
                                <option value="Europe/Kaliningrad">Europe/Kaliningrad (GMT+2:00)</option>
                                <option value="Europe/Bucharest">Europe/Bucharest (GMT+2:00)</option>
                                <option value="Europe/Mariehamn">Europe/Mariehamn (GMT+2:00)</option>
                                <option value="Africa/Lubumbashi">Africa/Lubumbashi (GMT+2:00)</option>
                                <option value="Asia/Istanbul">Asia/Istanbul (GMT+2:00)</option>
                                <option value="Europe/Tiraspol">Europe/Tiraspol (GMT+2:00)</option>
                                <option value="Europe/Chisinau">Europe/Chisinau (GMT+2:00)</option>
                                <option value="Europe/Helsinki">Europe/Helsinki (GMT+2:00)</option>
                                <option value="Asia/Beirut">Asia/Beirut (GMT+2:00)</option>
                                <option value="Asia/Tel_Aviv">Asia/Tel_Aviv (GMT+2:00)</option>
                                <option value="Europe/Sofia">Europe/Sofia (GMT+2:00)</option>
                                <option value="Africa/Gaborone">Africa/Gaborone (GMT+2:00)</option>
                                <option value="Asia/Gaza">Asia/Gaza (GMT+2:00)</option>
                                <option value="Europe/Riga">Europe/Riga (GMT+2:00)</option>
                                <option value="Africa/Maputo">Africa/Maputo (GMT+2:00)</option>
                                <option value="Asia/Damascus">Asia/Damascus (GMT+2:00)</option>
                                <option value="Europe/Uzhgorod">Europe/Uzhgorod (GMT+2:00)</option>
                                <option value="Asia/Jerusalem">Asia/Jerusalem (GMT+2:00)</option>
                                <option value="Africa/Bujumbura">Africa/Bujumbura (GMT+2:00)</option>
                                <option value="Europe/Kiev">Europe/Kiev (GMT+2:00)</option>
                                <option value="Europe/Vilnius">Europe/Vilnius (GMT+2:00)</option>
                                <option value="Africa/Maseru">Africa/Maseru (GMT+2:00)</option>
                                <option value="Africa/Blantyre">Africa/Blantyre (GMT+2:00)</option>
                                <option value="Africa/Lusaka">Africa/Lusaka (GMT+2:00)</option>
                                <option value="Africa/Harare">Africa/Harare (GMT+2:00)</option>
                                <option value="Europe/Tallinn">Europe/Tallinn (GMT+2:00)</option>
                                <option value="Turkey">Turkey (GMT+2:00)</option>
                                <option value="Africa/Johannesburg">Africa/Johannesburg (GMT+2:00)</option>
                                <option value="Asia/Nicosia">Asia/Nicosia (GMT+2:00)</option>
                                <option value="EET">EET (GMT+2:00)</option>
                                <option value="Asia/Hebron">Asia/Hebron (GMT+2:00)</option>
                                <option value="Egypt">Egypt (GMT+2:00)</option>
                                <option value="Asia/Amman">Asia/Amman (GMT+2:00)</option>
                                <option value="Europe/Nicosia">Europe/Nicosia (GMT+2:00)</option>
                                <option value="Europe/Athens">Europe/Athens (GMT+2:00)</option>
                                <option value="Asia/Aden">Asia/Aden (GMT+3:00)</option>
                                <option value="Africa/Nairobi">Africa/Nairobi (GMT+3:00)</option>
                                <option value="Etc/GMT-3">Etc/GMT-3 (GMT+3:00)</option>
                                <option value="Indian/Comoro">Indian/Comoro (GMT+3:00)</option>
                                <option value="Antarctica/Syowa">Antarctica/Syowa (GMT+3:00)</option>
                                <option value="Africa/Mogadishu">Africa/Mogadishu (GMT+3:00)</option>
                                <option value="Africa/Asmera">Africa/Asmera (GMT+3:00)</option>
                                <option value="Europe/Moscow">Europe/Moscow (GMT+3:00)</option>
                                <option value="Africa/Djibouti">Africa/Djibouti (GMT+3:00)</option>
                                <option value="Europe/Simferopol">Europe/Simferopol (GMT+3:00)</option>
                                <option value="Africa/Asmara">Africa/Asmara (GMT+3:00)</option>
                                <option value="Asia/Baghdad">Asia/Baghdad (GMT+3:00)</option>
                                <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam (GMT+3:00)</option>
                                <option value="Africa/Addis_Ababa">Africa/Addis_Ababa (GMT+3:00)</option>
                                <option value="Asia/Riyadh">Asia/Riyadh (GMT+3:00)</option>
                                <option value="Asia/Kuwait">Asia/Kuwait (GMT+3:00)</option>
                                <option value="Europe/Kirov">Europe/Kirov (GMT+3:00)</option>
                                <option value="Africa/Kampala">Africa/Kampala (GMT+3:00)</option>
                                <option value="Europe/Minsk">Europe/Minsk (GMT+3:00)</option>
                                <option value="Asia/Qatar">Asia/Qatar (GMT+3:00)</option>
                                <option value="Asia/Bahrain">Asia/Bahrain (GMT+3:00)</option>
                                <option value="Indian/Antananarivo">Indian/Antananarivo (GMT+3:00)</option>
                                <option value="Indian/Mayotte">Indian/Mayotte (GMT+3:00)</option>
                                <option value="Europe/Volgograd">Europe/Volgograd (GMT+3:00)</option>
                                <option value="Africa/Khartoum">Africa/Khartoum (GMT+3:00)</option>
                                <option value="Africa/Juba">Africa/Juba (GMT+3:00)</option>
                                <option value="W-SU">W-SU (GMT+3:00)</option>
                                <option value="Iran">Iran (GMT+3:30)</option>
                                <option value="Asia/Tehran">Asia/Tehran (GMT+3:30)</option>
                                <option value="Asia/Yerevan">Asia/Yerevan (GMT+4:00)</option>
                                <option value="Etc/GMT-4">Etc/GMT-4 (GMT+4:00)</option>
                                <option value="Asia/Dubai">Asia/Dubai (GMT+4:00)</option>
                                <option value="Indian/Reunion">Indian/Reunion (GMT+4:00)</option>
                                <option value="Indian/Mauritius">Indian/Mauritius (GMT+4:00)</option>
                                <option value="Europe/Samara">Europe/Samara (GMT+4:00)</option>
                                <option value="Indian/Mahe">Indian/Mahe (GMT+4:00)</option>
                                <option value="Asia/Baku">Asia/Baku (GMT+4:00)</option>
                                <option value="Asia/Muscat">Asia/Muscat (GMT+4:00)</option>
                                <option value="Europe/Astrakhan">Europe/Astrakhan (GMT+4:00)</option>
                                <option value="Asia/Tbilisi">Asia/Tbilisi (GMT+4:00)</option>
                                <option value="Europe/Ulyanovsk">Europe/Ulyanovsk (GMT+4:00)</option>
                                <option value="Asia/Kabul">Asia/Kabul (GMT+4:30)</option>
                                <option value="Asia/Aqtau">Asia/Aqtau (GMT+5:00)</option>
                                <option value="Etc/GMT-5">Etc/GMT-5 (GMT+5:00)</option>
                                <option value="Asia/Samarkand">Asia/Samarkand (GMT+5:00)</option>
                                <option value="Asia/Karachi">Asia/Karachi (GMT+5:00)</option>
                                <option value="Asia/Yekaterinburg">Asia/Yekaterinburg (GMT+5:00)</option>
                                <option value="Asia/Dushanbe">Asia/Dushanbe (GMT+5:00)</option>
                                <option value="Indian/Maldives">Indian/Maldives (GMT+5:00)</option>
                                <option value="Asia/Oral">Asia/Oral (GMT+5:00)</option>
                                <option value="Asia/Tashkent">Asia/Tashkent (GMT+5:00)</option>
                                <option value="Antarctica/Mawson">Antarctica/Mawson (GMT+5:00)</option>
                                <option value="Asia/Aqtobe">Asia/Aqtobe (GMT+5:00)</option>
                                <option value="Asia/Ashkhabad">Asia/Ashkhabad (GMT+5:00)</option>
                                <option value="Asia/Ashgabat">Asia/Ashgabat (GMT+5:00)</option>
                                <option value="Indian/Kerguelen">Indian/Kerguelen (GMT+5:00)</option>
                                <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                                <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                                <option value="Asia/Calcutta">Asia/Calcutta (GMT+5:30)</option>
                                <option value="Asia/Kathmandu">Asia/Kathmandu (GMT+5:45)</option>
                                <option value="Asia/Katmandu">Asia/Katmandu (GMT+5:45)</option>
                                <option value="Asia/Kashgar">Asia/Kashgar (GMT+6:00)</option>
                                <option value="Etc/GMT-6">Etc/GMT-6 (GMT+6:00)</option>
                                <option value="Asia/Almaty">Asia/Almaty (GMT+6:00)</option>
                                <option value="Asia/Novosibirsk">Asia/Novosibirsk (GMT+6:00)</option>
                                <option value="Asia/Dacca">Asia/Dacca (GMT+6:00)</option>
                                <option value="Asia/Omsk">Asia/Omsk (GMT+6:00)</option>
                                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6:00)</option>
                                <option value="Indian/Chagos">Indian/Chagos (GMT+6:00)</option>
                                <option value="Asia/Qyzylorda">Asia/Qyzylorda (GMT+6:00)</option>
                                <option value="Asia/Bishkek">Asia/Bishkek (GMT+6:00)</option>
                                <option value="Antarctica/Vostok">Antarctica/Vostok (GMT+6:00)</option>
                                <option value="Asia/Urumqi">Asia/Urumqi (GMT+6:00)</option>
                                <option value="Asia/Thimbu">Asia/Thimbu (GMT+6:00)</option>
                                <option value="Asia/Thimphu">Asia/Thimphu (GMT+6:00)</option>
                                <option value="Asia/Rangoon">Asia/Rangoon (GMT+6:30)</option>
                                <option value="Indian/Cocos">Indian/Cocos (GMT+6:30)</option>
                                <option value="Asia/Pontianak">Asia/Pontianak (GMT+7:00)</option>
                                <option value="Etc/GMT-7">Etc/GMT-7 (GMT+7:00)</option>
                                <option value="Asia/Phnom_Penh">Asia/Phnom_Penh (GMT+7:00)</option>
                                <option value="Antarctica/Davis">Antarctica/Davis (GMT+7:00)</option>
                                <option value="Asia/Tomsk">Asia/Tomsk (GMT+7:00)</option>
                                <option value="Asia/Jakarta">Asia/Jakarta (GMT+7:00)</option>
                                <option value="Asia/Barnaul">Asia/Barnaul (GMT+7:00)</option>
                                <option value="Indian/Christmas">Indian/Christmas (GMT+7:00)</option>
                                <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7:00)</option>
                                <option value="Asia/Hovd">Asia/Hovd (GMT+7:00)</option>
                                <option value="Asia/Bangkok">Asia/Bangkok (GMT+7:00)</option>
                                <option value="Asia/Vientiane">Asia/Vientiane (GMT+7:00)</option>
                                <option value="Asia/Novokuznetsk">Asia/Novokuznetsk (GMT+7:00)</option>
                                <option value="Asia/Krasnoyarsk">Asia/Krasnoyarsk (GMT+7:00)</option>
                                <option value="Asia/Saigon">Asia/Saigon (GMT+7:00)</option>
                                <option value="Asia/Kuching">Asia/Kuching (GMT+8:00)</option>
                                <option value="Asia/Chungking">Asia/Chungking (GMT+8:00)</option>
                                <option value="Etc/GMT-8">Etc/GMT-8 (GMT+8:00)</option>
                                <option value="Australia/Perth">Australia/Perth (GMT+8:00)</option>
                                <option value="Asia/Macao">Asia/Macao (GMT+8:00)</option>
                                <option value="Asia/Macau">Asia/Macau (GMT+8:00)</option>
                                <option value="Asia/Choibalsan">Asia/Choibalsan (GMT+8:00)</option>
                                <option value="Asia/Shanghai">Asia/Shanghai (GMT+8:00)</option>
                                <option value="Antarctica/Casey">Antarctica/Casey (GMT+8:00)</option>
                                <option value="Asia/Ulan_Bator">Asia/Ulan_Bator (GMT+8:00)</option>
                                <option value="Asia/Chongqing">Asia/Chongqing (GMT+8:00)</option>
                                <option value="Asia/Ulaanbaatar">Asia/Ulaanbaatar (GMT+8:00)</option>
                                <option value="Asia/Taipei">Asia/Taipei (GMT+8:00)</option>
                                <option value="Asia/Manila">Asia/Manila (GMT+8:00)</option>
                                <option value="PRC">PRC (GMT+8:00)</option>
                                <option value="Asia/Ujung_Pandang">Asia/Ujung_Pandang (GMT+8:00)</option>
                                <option value="Asia/Harbin">Asia/Harbin (GMT+8:00)</option>
                                <option value="Singapore">Singapore (GMT+8:00)</option>
                                <option value="Asia/Brunei">Asia/Brunei (GMT+8:00)</option>
                                <option value="Australia/West">Australia/West (GMT+8:00)</option>
                                <option value="Asia/Hong_Kong">Asia/Hong_Kong (GMT+8:00)</option>
                                <option value="Asia/Makassar">Asia/Makassar (GMT+8:00)</option>
                                <option value="Hongkong">Hongkong (GMT+8:00)</option>
                                <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (GMT+8:00)</option>
                                <option value="Asia/Irkutsk">Asia/Irkutsk (GMT+8:00)</option>
                                <option value="Asia/Singapore">Asia/Singapore (GMT+8:00)</option>
                                <option value="Asia/Pyongyang">Asia/Pyongyang (GMT+8:30)</option>
                                <option value="Australia/Eucla">Australia/Eucla (GMT+8:45)</option>
                                <option value="Etc/GMT-9">Etc/GMT-9 (GMT+9:00)</option>
                                <option value="Pacific/Palau">Pacific/Palau (GMT+9:00)</option>
                                <option value="Asia/Chita">Asia/Chita (GMT+9:00)</option>
                                <option value="Asia/Dili">Asia/Dili (GMT+9:00)</option>
                                <option value="Asia/Jayapura">Asia/Jayapura (GMT+9:00)</option>
                                <option value="Asia/Yakutsk">Asia/Yakutsk (GMT+9:00)</option>
                                <option value="ROK">ROK (GMT+9:00)</option>
                                <option value="Asia/Seoul">Asia/Seoul (GMT+9:00)</option>
                                <option value="Asia/Khandyga">Asia/Khandyga (GMT+9:00)</option>
                                <option value="Japan">Japan (GMT+9:00)</option>
                                <option value="Asia/Tokyo">Asia/Tokyo (GMT+9:00)</option>
                                <option value="Australia/North">Australia/North (GMT+9:30)</option>
                                <option value="Australia/Yancowinna">Australia/Yancowinna (GMT+9:30)</option>
                                <option value="Australia/Adelaide">Australia/Adelaide (GMT+9:30)</option>
                                <option value="Australia/Broken_Hill">Australia/Broken_Hill (GMT+9:30)</option>
                                <option value="Australia/South">Australia/South (GMT+9:30)</option>
                                <option value="Australia/Darwin">Australia/Darwin (GMT+9:30)</option>
                                <option value="Australia/Hobart">Australia/Hobart (GMT+10:00)</option>
                                <option value="Pacific/Yap">Pacific/Yap (GMT+10:00)</option>
                                <option value="Australia/Tasmania">Australia/Tasmania (GMT+10:00)</option>
                                <option value="Pacific/Port_Moresby">Pacific/Port_Moresby (GMT+10:00)</option>
                                <option value="Australia/ACT">Australia/ACT (GMT+10:00)</option>
                                <option value="Australia/Victoria">Australia/Victoria (GMT+10:00)</option>
                                <option value="Pacific/Chuuk">Pacific/Chuuk (GMT+10:00)</option>
                                <option value="Australia/Queensland">Australia/Queensland (GMT+10:00)</option>
                                <option value="Australia/Canberra">Australia/Canberra (GMT+10:00)</option>
                                <option value="Australia/Currie">Australia/Currie (GMT+10:00)</option>
                                <option value="Pacific/Guam">Pacific/Guam (GMT+10:00)</option>
                                <option value="Pacific/Truk">Pacific/Truk (GMT+10:00)</option>
                                <option value="Australia/NSW">Australia/NSW (GMT+10:00)</option>
                                <option value="Asia/Vladivostok">Asia/Vladivostok (GMT+10:00)</option>
                                <option value="Pacific/Saipan">Pacific/Saipan (GMT+10:00)</option>
                                <option value="Antarctica/DumontDUrville">Antarctica/DumontDUrville (GMT+10:00)</option>
                                <option value="Australia/Sydney">Australia/Sydney (GMT+10:00)</option>
                                <option value="Australia/Brisbane">Australia/Brisbane (GMT+10:00)</option>
                                <option value="Etc/GMT-10">Etc/GMT-10 (GMT+10:00)</option>
                                <option value="Asia/Ust-Nera">Asia/Ust-Nera (GMT+10:00)</option>
                                <option value="Australia/Melbourne">Australia/Melbourne (GMT+10:00)</option>
                                <option value="Australia/Lindeman">Australia/Lindeman (GMT+10:00)</option>
                                <option value="Australia/Lord_Howe">Australia/Lord_Howe (GMT+10:30)</option>
                                <option value="Australia/LHI">Australia/LHI (GMT+10:30)</option>
                                <option value="Pacific/Ponape">Pacific/Ponape (GMT+11:00)</option>
                                <option value="Pacific/Bougainville">Pacific/Bougainville (GMT+11:00)</option>
                                <option value="Antarctica/Macquarie">Antarctica/Macquarie (GMT+11:00)</option>
                                <option value="Pacific/Pohnpei">Pacific/Pohnpei (GMT+11:00)</option>
                                <option value="Pacific/Efate">Pacific/Efate (GMT+11:00)</option>
                                <option value="Pacific/Norfolk">Pacific/Norfolk (GMT+11:00)</option>
                                <option value="Asia/Magadan">Asia/Magadan (GMT+11:00)</option>
                                <option value="Pacific/Kosrae">Pacific/Kosrae (GMT+11:00)</option>
                                <option value="Asia/Sakhalin">Asia/Sakhalin (GMT+11:00)</option>
                                <option value="Pacific/Noumea">Pacific/Noumea (GMT+11:00)</option>
                                <option value="Etc/GMT-11">Etc/GMT-11 (GMT+11:00)</option>
                                <option value="Asia/Srednekolymsk">Asia/Srednekolymsk (GMT+11:00)</option>
                                <option value="Pacific/Guadalcanal">Pacific/Guadalcanal (GMT+11:00)</option>
                                <option value="Pacific/Kwajalein">Pacific/Kwajalein (GMT+12:00)</option>
                                <option value="Antarctica/McMurdo">Antarctica/McMurdo (GMT+12:00)</option>
                                <option value="Pacific/Wallis">Pacific/Wallis (GMT+12:00)</option>
                                <option value="Pacific/Fiji">Pacific/Fiji (GMT+12:00)</option>
                                <option value="Pacific/Funafuti">Pacific/Funafuti (GMT+12:00)</option>
                                <option value="Pacific/Nauru">Pacific/Nauru (GMT+12:00)</option>
                                <option value="Kwajalein">Kwajalein (GMT+12:00)</option>
                                <option value="NZ">NZ (GMT+12:00)</option>
                                <option value="Pacific/Wake">Pacific/Wake (GMT+12:00)</option>
                                <option value="Antarctica/South_Pole">Antarctica/South_Pole (GMT+12:00)</option>
                                <option value="Pacific/Tarawa">Pacific/Tarawa (GMT+12:00)</option>
                                <option value="Pacific/Auckland">Pacific/Auckland (GMT+12:00)</option>
                                <option value="Asia/Kamchatka">Asia/Kamchatka (GMT+12:00)</option>
                                <option value="Etc/GMT-12">Etc/GMT-12 (GMT+12:00)</option>
                                <option value="Asia/Anadyr">Asia/Anadyr (GMT+12:00)</option>
                                <option value="Pacific/Majuro">Pacific/Majuro (GMT+12:00)</option>
                                <option value="NZ-CHAT">NZ-CHAT (GMT+12:45)</option>
                                <option value="Pacific/Chatham">Pacific/Chatham (GMT+12:45)</option>
                                <option value="Pacific/Fakaofo">Pacific/Fakaofo (GMT+13:00)</option>
                                <option value="Pacific/Enderbury">Pacific/Enderbury (GMT+13:00)</option>
                                <option value="Pacific/Apia">Pacific/Apia (GMT+13:00)</option>
                                <option value="Pacific/Tongatapu">Pacific/Tongatapu (GMT+13:00)</option>
                                <option value="Etc/GMT-13">Etc/GMT-13 (GMT+13:00)</option>
                                <option value="Pacific/Kiritimati">Pacific/Kiritimati (GMT+14:00)</option>
                                <option value="Etc/GMT-14">Etc/GMT-14 (GMT+14:00)</option>
                              </select>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Complimentary Ticket Code
                              <div className="help-text">Enter a comma separated list of codes that you wish to accept.</div>
                            </div>
                            <div className="col-md-3">
                              <input type="text" className="form-control" name="compTicketCode" defaultValue />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Social Sharing
                              <div className="help-text">This is popup text for enable social sharing</div>
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="socialSharingEnabled" className="onoffswitch-checkbox" id="social" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="social">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                              </div>
                            </div>
                            <input type="hidden" name="socialSharingEnabled" defaultValue="off" />
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Item Categories
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="categoryEnabled" className="onoffswitch-checkbox" id="categories" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="categories">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                              </div>
                              <input type="hidden" name="categoryEnabled" defaultValue="off" />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Hide Raffle Tab
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="moduleHidden" className="onoffswitch-checkbox" id="hidden" />
                                <label className="onoffswitch-label" htmlFor="hidden">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                              </div>
                            </div>
                          </div>
                          {/*-<div class="row form-group">
                           <div class="col-md-3 col-md-offset-1">
                           Sweepstakes
                           </div>
                           <div class="col-md-3">
                           <div class="onoffswitch onoffswitch-success">
                           <input type="checkbox" name="sweepstakes" class="onoffswitch-checkbox" id="sweepstakes" >
                           <label class="onoffswitch-label" for="sweepstakes">
                           <div class="onoffswitch-inner"></div>
                           <div class="onoffswitch-switch"></div>
                           </label>
                           </div>
                           <input type="hidden" name="sweepstakes" value="off" />
                           </div>
                           </div> -*/}
                          <input type="hidden" name defaultValue />
                          <div>
                          </div></form>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-default reset" data-toggle="modal" data-target="#resetModuleConfirm">Reset</button>
                        </div>
                        <div className="row form-group ticket-price-settings">
                          <div className="col-md-3 col-md-offset-1">
                            Raffle Ticket Prices
                          </div>
                          <div className="col-md-8">
                            <div id="alert" />
                            <table className="table ticket-price-settings-table">
                              <thead>
                              <tr>
                                <th className="text-center"><span>Number of Tickets</span></th>
                                <th className="text-center"><span>Price</span></th>
                                <th className="text-center"><span>Actions</span></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr className="dummy edit">
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" required name="numOfTicket" />
                                  </div>
                                  <span className="value numofticket" />
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" required name="price" />
                                  </div>
                                  <span className="value ">$<span className="price" /></span>
                                </td>
                                <td className="text-center">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={1} required />
                                  </div>
                                  <span className="value numofticket">1</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={5} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1694} required />
                                  </div>
                                  <span className="value">$<span className="price">5</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={2} required />
                                  </div>
                                  <span className="value numofticket">2</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={10} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1695} required />
                                  </div>
                                  <span className="value">$<span className="price">10</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={6} required />
                                  </div>
                                  <span className="value numofticket">6</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={20} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1696} required />
                                  </div>
                                  <span className="value">$<span className="price">20</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={15} required />
                                  </div>
                                  <span className="value numofticket">15</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={40} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1697} required />
                                  </div>
                                  <span className="value">$<span className="price">40</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={20} required />
                                  </div>
                                  <span className="value numofticket">20</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={50} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1698} required />
                                  </div>
                                  <span className="value">$<span className="price">50</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={50} required />
                                  </div>
                                  <span className="value numofticket">50</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={100} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1699} required />
                                  </div>
                                  <span className="value">$<span className="price">100</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div className="form-group operations-row text-center">
                              <button className="btn btn-default add-item">Add Ticket Price</button>
                            </div>
                          </div>
                        </div>
                        <div className="row form-group category-settings" style={{display : 'block'}}>
                          <div className="col-md-3 col-md-offset-1">
                            Category Management
                          </div>
                          <div className="col-md-8">
                            <div id="alertmessage" />
                            <table className="table category-settings-table">
                              <thead>
                              <tr>
                                <th className="text-center"><span>Name</span></th>
                                <th className="text-center"><span>Actions</span></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr className="dummy edit">
                                <td>
                                  <input type="hidden" name defaultValue />
                                  <input type="text" className="form-control item-name" maxLength={25} name="name" required />
                                  <span className="value" />
                                </td>
                                <td className="text-center">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Category">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="hidden" name defaultValue />
                                  <input type="hidden" name="id" defaultValue={3512} />
                                  <input type="text" className="form-control item-name" maxLength={25} name="name" defaultValue="Travel" required />
                                  <span className="value">Travel</span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Category">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="hidden" name defaultValue />
                                  <input type="hidden" name="id" defaultValue={3513} />
                                  <input type="text" className="form-control item-name" maxLength={25} name="name" defaultValue="Experiences" required />
                                  <span className="value">Experiences</span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Category">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="hidden" name defaultValue />
                                  <input type="hidden" name="id" defaultValue={3514} />
                                  <input type="text" className="form-control item-name" maxLength={25} name="name" defaultValue="Memorabilia" required />
                                  <span className="value">Memorabilia</span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Category">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="hidden" name defaultValue />
                                  <input type="hidden" name="id" defaultValue={3515} />
                                  <input type="text" className="form-control item-name" maxLength={25} name="name" defaultValue="Music" required />
                                  <span className="value">Music</span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Category">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div className="form-group operations-row text-center">
                              <button className="btn btn-default add-item">Add Category</button>
                            </div>
                          </div>
                        </div>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-info mrg-t-lg" type="submit" onclick="$('.main-box > .form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
                        </div>
                      </div> {/* /.form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RaffleSetting);
