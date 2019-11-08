# What is this?
This is a weird little experiment trying to create a multi-page app that behaves like a single-page app. We're using [Eleventy](https://11ty.io) and [Vue](https://vuejs.org).

Routing is handled in the [router plugin](src/includes/router.plugin.js) and "controlled" by the [router-link component](src/includes/components/router-link.js.njk).

# How does it work?
The approach in this project is inspired by the idea behind [Turbolinks](https://github.com/turbolinks/turbolinks).

When we click a router-link:
- The router plugin fetches the target page.
- We use [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) to create a document from the response.
- Using `getElementByID`, we get the script tag for the component we're trying to mount.
- We merge the script tag into the current document.

Our [app-wrapper][src/includes/app-wrapper.js.njk] include wraps each of our "apps" in an (IIFE)(https://developer.mozilla.org/en-US/docs/Glossary/IIFE) which registers the target component and includes our Vue [base](src/includes/components/base.js.njk) then re-mounts Vue.

## Challenges
Registration of Vue components must occur before we call the Vue constructor. Unfortunately, this means we have to re-mount Vue when we dynamically fetch components. I thought this would cause flickering or some side effect that would be totally breaking for us, but it seems to work fine at small scale. I can imagine this not being the case for a large application.

## State-management library?
This iteration doesn't make use of a state-management library. You could add Vuex to this, but I think it could present problems due to the regular reinstantiation of Vue.

### Alternative to an SML?
Keep components small and maybe make use of the `window` to decouple global data from Vue. Register watchers / computed data in components to make global data reactive.
