
import React from 'react';
import PropTypes from 'prop-types';
import {Provider as ReduxProvider} from 'react-redux';
import {sessionService} from 'redux-react-session';
import history from './../history';
const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};
import axios from 'axios';
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	 config.headers.common['Authorization'] = localStorage.getItem('token');
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	// Do something with response error
  console.log("error", error, error.response);
  let response = error && error.response;
  if(response && response.status === 401){
		localStorage.clear();
		sessionService.deleteSession();
		sessionService.deleteUser();
    let url = response && response.config && response.config.url;
    if((url && url.indexOf("/host") > -1) || (url && url.indexOf("/superadmin") > -1)){
			history.push("/u/login");
    }
    else {

    }
  }
  else if(response && response.status === 403){
    setTimeout(()=>{
			history.push("/u/myprofile");
    },3000);
  }
	return Promise.reject(error);
});
/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };


  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 100);
  }

  render() {

    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    if (this.state.loading) {

      return (
        <div className="loader">
          <div className="loader-pace">
            <div className="pace pace-active">
              <div className="pace-progress">
                <div className="pace-progress-inner"></div>
              </div>
              <div className="pace-activity"></div>
            </div>
          </div>
        </div>);
    }
    return React.Children.only(this.props.children);
  }

}

export default App;
