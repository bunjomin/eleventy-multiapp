const router = () => {
  return {
    install: function (Vue, options) {
      Vue.setRoute = function (route) {
        window.bunjomin.route = route;
      }
    }
  }
};
