const router = {
  install: function (Vue, options) {
    Vue.prototype.$setRoute = function (targetApp) {
      window.bunjomin.route = targetApp.permalink;
      console.log(targetApp.permalink);
      window.history.pushState(null, targetApp.permalink, targetApp.permalink);
    },
    Vue.prototype.$getRoute = async function (targetApp) {
      const response = await fetch(targetApp.permalink).catch((err) => console.log(err)),
        body = await response.text(),
        parser = new DOMParser(),
        doc = parser.parseFromString(body, 'text/html'),
        selectedScript = doc.getElementById(targetApp.slug),
        newScript = document.createElement('script'),
        inline = document.createTextNode(selectedScript.innerHTML);
      newScript.appendChild(inline);
      newScript.id = targetApp.slug;
      newScript.type = 'application/javascript';
      document.body.appendChild(newScript);
    }
  }
};
