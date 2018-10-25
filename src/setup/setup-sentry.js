import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export function initRaven () {
  Raven
    .config('http://83bb7b7e3b504a35a3576fa652fe0a00@raven.wynn.tech/6')
    .addPlugin(RavenVue, Vue)
    .install()
}

export function ravenContext (initApp) {
  Raven.context(() => {
    initApp()
  })
}

export function trackingUser (email, id) {
  Raven.setUserContext({
    email: email,
    id: id
  })
}

export function removeTrackingUser () {
  Raven.setUserContext()
}
