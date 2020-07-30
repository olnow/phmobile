import axios from 'axios'
import { store } from './store'
import { GLOBAL_MUTATIONS } from './modules/mutation-types'

export const AXIOS = axios.create({
  // eslint-disable-next-line
  baseURL: config.VUE_APP_API_URL || process.env.VUE_APP_API_URL,
  headers: {
    // eslint-disable-next-line
    'Access-Control-Allow-Origin': config.VUE_APP_ORIGINS || process.env.VUE_APP_ORIGINS
  }
})

export async function getRestApi (request) {
  let data
  try {
    // console.log(config)
    // AXIOS.defaults.withCredentials = true
    AXIOS.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
    // AXIOS.defaults.xsrfCookieName = 'X-CSRF-TOKEN'
    AXIOS.defaults.withCredentials = true
    data = await AXIOS.get(request)
    let csrfToken = data.headers['x-csrf-token']
    if (csrfToken && csrfToken.length) {
      // console.log('getRestAPI', store)
      store.commit('GlobalStore/' + GLOBAL_MUTATIONS.SET_CSRF, csrfToken)
    }
    return data
  } catch (e) {
    if (e.response && e.response.status === 401) {
      store.dispatch('GlobalStore/logout')
      // console.log(e.response.status);
    } else {
      console.log('getRestApi error: ', e)
    }
    return null
  }
}

export async function postRestApi (request, data) {
  let res
  try {
    // console.log(store, data)
    let csrf = store.getters['GlobalStore/getCSRF']
    let csrfEnable = store.getters['GlobalStore/getCsrfEnable']
    if (csrfEnable && !csrf.length) {
      console.log('postRestApi: csrf empty')
      return
    }
    // console.log('import store CSRF: ', csrf)
    AXIOS.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
    AXIOS.defaults.withCredentials = true
    AXIOS.defaults.headers.post['X-CSRF-TOKEN'] = csrf
    AXIOS.defaults.headers.post['X-XSRF-TOKEN'] = csrf
    // console.log('postRest data: ', data)
    if (data) {
      // console.log(data)
      res = await AXIOS.post(request, data)
    } else {
      // console.log('empty post') // , data, data.length)
      res = await AXIOS.post(request)
    }
    // console.log('postRestApi res: ', res)
    let csrfToken = res.headers['x-csrf-token']
    if (csrfToken && csrfToken.length) {
      // console.log('getRestAPI set csrf: ', csrfToken)
      store.commit('GlobalStore/' + GLOBAL_MUTATIONS.SET_CSRF, csrfToken)
    }
    if (res && res['status'] === 200) {
      // console.log('postRestApi res return: ', res['data'])
      return res
    }
    if (res && res['status'] === 401) {
      console.log('postRestApi res return: 401')
      // return res
    }
    return []
  } catch (e) {
    if (e.response && e.response.status === 401) {
      store.dispatch('GlobalStore/logout')
      // console.log(e.response.status);
    } else {
      console.log('postRestApi error: ', e)
      return e
    }
    // store.commit('GlobalStore/' + GLOBAL_MUTATIONS.CLEAR_CSRF)
    return []
  }
}

export async function postRestApiPromise (request, data) {
  try {
    AXIOS.defaults.withCredentials = true
    let res
    // console.log('postRest data: ', data)
    if (data) {
      // console.log(data)
      res = AXIOS.post(request, data)
    } else {
      // console.log('empty post') // , data, data.length)
      res = AXIOS.post(request)
    }
    store.commit('GlobalStore/' + GLOBAL_MUTATIONS.REST_LOAD_DATA, true)
    // let value = await res.then(function (response) {
    // console.log('then:', response, response.data)
    //  return response.data
    // })
    return res
    // console.log('postRestApiPromise res: ', dt)
    // return dt
    /**
    if (res && res['status'] === 200) {
      // console.log('postRestApi res return: ', res['data'])
      return res
    }
    if (res && res['status'] === 401) {
      console.log('postRestApi res return: 401')
      // return res
    }
    return []
     */
  } catch (e) {
    if (e.response && e.response.status === 401) {
      store.dispatch('GlobalStore/logout')
      // console.log(e.response.status);
    } else {
      console.log('postRestApi error: ', e)
    }
    // store.commit('GlobalStore/' + GLOBAL_MUTATIONS.CLEAR_CSRF)
    return []
  }
}
