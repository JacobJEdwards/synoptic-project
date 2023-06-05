import { pathToRegex, getParams } from './utils/urls.js'
/**
 * Routes of the app
 * Each route has a path and a component
 * The path is used to match the url path
 * The component is the view that will be rendered
 */
const routes = [
  {
    path: '/',
    component: () => import('./views/pages/Dashboard.js'),
  },
  {
    path: '/about',
    component: () => import('./views/pages/About.js'),
  },
  {
    path: '/charities',
    component: () => import('./views/pages/Charities.js'),
  },
  {
    path: '/recipes',
    component: () => import('./views/pages/Recipes.js'),
  },
  {
    path: '/recipes/new',
    component: () => import('./views/pages/CreateRecipe.js'),
  },
  {
    path: '/recipes/:id',
    component: () => import('./views/pages/Recipe.js'),
  },
  {
    path: '/404',
    component: () => import('./views/pages/Error404.js'),
  },
]

// Improved Router class
class Router {
  constructor(routes) {
    this.routes = new Set(routes)
    this.matcher = new RouterMatcher(routes)
    this.match = null
    this.component = null
    this.action = null
    this.loader = null
  }

  async loadView(pathname) {
    const match = this.matcher.match(pathname)

    if (match === this.match) {
      return { view: this.component, action: this.action, loader: this.loader }
    }

    this.match = match

    const component = await this.loadComponent(match)
    const loaderData = await this.loadLoaderData(component)

    this.component = component.view
    this.action = component.action
    this.loader = component.loader

    return {
      view: component.view,
      action: component.action,
      loader: loaderData,
    }
  }

  async loadComponent(match) {
    const { default: Component, action, loader } = await match.route.component()
    const view = new Component(getParams(match))
    return { view, action, loader }
  }

  async loadLoaderData(component) {
    if (component.loader) {
      const loaderData = await component.loader(component.view.params)
      component.view.loaderData = loaderData
      return loaderData
    }
    return null
  }

  addRoute(route) {
    this.routes.add(route)
  }
}

// RouterMatcher class
class RouterMatcher {
  static NOT_FOUND_ROUTE = {
    path: '/404',
    component: () => import('./views/pages/Error404.js'),
  }

  constructor(routes) {
    this.routes = routes
    this.regexCache = new Map()
  }

  match(pathname) {
    /* Get the current url path */
    const potentialMatches = this.routes.map((route) => {
      let regex = this.regexCache.get(route.path)

      if (!regex) {
        regex = pathToRegex(route.path)
        this.regexCache.set(route.path, regex)
      }

      return {
        route: route,
        result: pathname.match(regex),
      }
    })

    /* Find the route that matches the url path */
    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== null
    )

    /* If there is no match render the 404 page */
    if (!match) {
      match = {
        route: this.NOT_FOUND_ROUTE,
        result: [pathname],
      }
    }

    return match
  }
}

/**
 * Router function
 * It will match the url path with the routes
 * If there is no match it will render the 404 page
 * If there is a match it will render the corresponding view
 */
// const Router = async (pathname) => {
//   /* Get the current url path */
//   const potentialMatches = routes.map((route) => {
//     return {
//       route: route,
//       result: pathname.match(pathToRegex(route.path)),
//     };
//   });
//
//   /* Find the route that matches the url path */
//   let match = potentialMatches.find(
//     (potentialMatch) => potentialMatch.result !== null
//   );
//
//   /* If there is no match render the 404 page */
//   if (!match) {
//     match = {
//       route: routes[4],
//       result: [pathname],
//     };
//   }
//
//   /* Render the view */
//   const { default: Component, action, loader } = await match.route.component();
//   const view = new Component(getParams(match));
//   if (loader) {
//     const loaderData = await loader(view.params);
//     view.loaderData = loaderData;
//   }
//
//   return { view, action, loader };
// };

export default new Router(routes)
