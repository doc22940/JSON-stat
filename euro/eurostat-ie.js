/*

Old browsers' JSON-stat for Eurostat v. 0.1.8 (requires JJT)
https://json-stat.com
https://github.com/badosa/JSON-stat/tree/master/eurostat

Copyright 2019 Xavier Badosa (https://xavierbadosa.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.

*/
var EuroJSONstat=function(){"use strict";function e(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function t(e){if(e.dataset){var t=e.filter||null,r=e.lang||"en",a=e.version||"2.1",l="".concat("https://ec.europa.eu/eurostat/wdds/rest/data/","v").concat(a,"/json/").concat(r,"/").concat(e.dataset),n=[];return t&&(Object.keys(t).forEach(function(e){t[e].forEach(function(t){n.push("".concat(e,"=").concat(t))})}),l+="?"+n.join("&")),l}return null}function r(t){var r=JSON.parse(JSON.stringify(t));return e(r,"filter")?(delete r.filter.time,r.filter.lastTimePeriod=["1"]):r.filter={lastTimePeriod:["1"]},r.class="query",r}function a(t,r){var a=JSON.parse(JSON.stringify(t));return e(a,"filter")&&(Object.keys(a.filter).forEach(function(e){a.filter[e]=a.filter[e].slice(0,1)}),!0===r&&(delete a.filter.time,a.filter.lastTimePeriod=["1"])),e(a,"label")&&e(a.label,"category")&&(Object.keys(a.label.category).forEach(function(e){a.label.category[e]=a.label.category[e].slice(0,1)}),!0===r&&delete a.label.category.time),a.class="query",a}function l(t,r){var a=JSON.parse(JSON.stringify(t)),l=e(a,"filter"),n=e(a,"label"),i=n&&e(a.label,"category"),o=n&&e(a.label,"dimension");return r.forEach(function(e){l&&delete a.filter[e],n&&(i&&delete a.label.category[e],o&&delete a.label.dimension[e])}),a.class="query",a}function n(t,r,a){void 0===a&&(a=Object.keys(r),r={class:"query",dataset:null,filter:r});var l=JSON.parse(JSON.stringify(t)),n=e(r,"filter"),i=e(r,"label")&&e(r.label,"category");return a.forEach(function(t){n&&e(r.filter,t)&&(e(l,"filter")||(l.filter={}),l.filter[t]=r.filter[t]),i&&e(r.label.category,t)&&(e(l,"label")?e(l.label,"category")||(l.label.category={}):l.label={},l.label.category[t]=r.label.category[t])}),l.class="query",l}function i(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach(function(t){switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":e.role.metric.push(t);break;default:e.role.classification.push(t)}})}var o=new Function("try {return this===global;}catch(e){return false;}");function s(e){var r;if(r=o()?require("node-fetch"):"function"!=typeof fetch?function(){window.alert("JSONstat for Eurostat: Old browsers are not supported, sorry. Use a polyfill for Fetch and Promise.")}:fetch,e)return r("string"==typeof e?e:t(e)).then(function(e){return e.json()}).then(function(e){if(e.error)return{class:"error",status:e.error.status,label:e.error.label};var t=JSONstat(e);return"dataset"===t.class?(i(t),t):{class:"error",status:"422",label:"Unprocessable Entity"}})}function c(e,t){var a=!1!==t?r(e):e;return s(a).then(function(e){if("error"===e.class)return e;var t={},r={},l={};return e.id.forEach(function(a){var n=e.Dimension(a);r[a]=n.label,t[a]=n.id,l[a]=n.Category().map(function(e){return e.label})}),{dataset:a.dataset,filter:t,label:{dataset:e.label,dimension:r,category:l}}})}return{simpleQuery:a,lastPeriodQuery:r,addParamQuery:n,removeParamQuery:l,removeTimeQuery:function(e){return l(e,["time","lastTimePeriod","sinceTimePeriod"])},fetchQuery:c,fetchFullQuery:function(e,t){return c(n(e,"string"==typeof t?{geo:[t]}:{filterNonGeo:["1"]})).then(function(e){return"error"===e.class?e:c(l(a(e),["time","geo"]),!1).then(function(t){return"error"===t.class?t:n(e,t,["time","geo"])})})},fetchDataset:s,getURL:t,getStatusLabel:function(e,t){return e.extension.status.label[t]},getEmptyDataset:function(e){var t=Object.keys(e.filter),r=t.map(function(t){return e.filter[t].length}),a={};t.forEach(function(t){a[t]={label:e.label.dimension[t],category:{index:e.filter[t],label:{}}},e.filter[t].forEach(function(r,l){Object.defineProperty(a[t].category.label,r,{value:e.label.category[t][l]})})});var l={version:"2.0",class:"dataset",label:e.label.dataset,id:t,size:r,dimension:a,value:[]},n=JSONstat(l);return EuroJSONstat.setRole(n),n},setRole:i,version:"0.1.8"}}();
