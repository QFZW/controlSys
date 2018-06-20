import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeFormat', function (data, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(data).format(formatString)
})
Vue.filter('timeFormat1', function (data, formatString) {
  formatString = formatString || 'YYYY-MM-DD  h:mm:ss'
  return moment(data).format(formatString)
})
