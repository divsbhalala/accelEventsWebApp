
import React from 'react';
import PropTypes from 'prop-types';
import {Provider as ReduxProvider} from 'react-redux';
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
