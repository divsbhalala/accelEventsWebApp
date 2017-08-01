
/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./contact').default,
    require('./login').default,
    require('./register').default,
    require('./resetPassword').default,
    require('./about').default,
    require('./privacy').default,
    require('./admin').default,
    require('./event').default,
   // require('./scroll').default,
   // require('./table').default,
   // require('./goal').default,
    require('./checkout').default,
    require('./myProfile').default,


    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({next}) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';
    route.isAdmin = route.component.props.isAdmin || false;

    return route;
  },

};
