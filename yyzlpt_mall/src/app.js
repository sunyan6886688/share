import jkdh from './utils/jkdh.es.min.js'
export default {
  config: {
    onError(e) {
      e.preventDefault();
      // console.error(e.message);
    },
  },
};
export function onRouteChange({ location, routes, action }) {
}
export function modifyRouteProps(props, { route }) {
  jkdh.ready(() => {
    jkdh.ui.setTitle({
      title: route.title
    })
  })
  return props;
}