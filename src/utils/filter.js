import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeFormat', function (data, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(data).format(formatString)
})
