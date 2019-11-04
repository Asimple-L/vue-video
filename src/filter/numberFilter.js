/**
 * Created by Asimple on 2019/10/14.
 */
import Vue from 'vue'

export const toFixed = Vue.filter('toFixed', (value, fixed) => {
  if( null==fixed || ''===fixed ) {
    fixed = 2;
  }
  let tempVal = parseFloat(value).toFixed(fixed+1);
  return tempVal.substring(0, tempVal.length - 1);
});
