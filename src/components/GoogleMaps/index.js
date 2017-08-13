import { default as React, Component } from "react";
import PropTypes from "prop-types";

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.eventAddress = this.props.eventAddress;
    this.state = {
      eventAddress:this.eventAddress
    };
  };
  componentDidMount(){
    this.setState({eventData : this.props.eventData});
    let map = new google.maps.Map(this.refs.map,{
      zoom:17
    });
    let geocoder = new google.maps.Geocoder();
    let _this = this;
    geocoder.geocode({"address": this.props.eventAddress}, function(results, status) {
          if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            let searchBox = document.getElementById("eventAddress");
            let autocomplete = new google.maps.places.Autocomplete(searchBox);
            autocomplete.addListener("place_changed", function() {
              marker.setVisible(false);
              let place = autocomplete.getPlace();
              if (!place.geometry) {
                  window.alert("No details available for input: '" + place.name + "'");
                  return;
              }
              if (place.geometry.viewport) {
                  map.fitBounds(place.geometry.viewport);
              } else {
                  map.setCenter(place.geometry.location);
                  map.setZoom(17);
              }
              marker.setPosition(place.geometry.location);
              marker.setVisible(true);
              let address = '';
              if (place.address_components) {
                address = [ (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                  ].join(', ');
                  _this.props.setEventAddress(address);
              }
          });
          autocomplete.bindTo('bounds', map);

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
    }, this);
  };
  render(){
    return(<div>
      <script type="text/javascript" src="//maps.google.com/maps/api/js?key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
      <div ref="map" style={{height: this.props.height, position: "relative", overflow: "hidden"}}/></div>
    );
  };
}
GoogleMap.propTypes = {
    onChange:   React.PropTypes.func
}
GoogleMap.changeHandler = function(e) {
    if (typeof this.props.onChange === 'function') {
        this.props.onChange(e.target.value);
    }
}
