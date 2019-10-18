/*

JSON-stat for Eurostat v. 0.1.9 (requires JJT)
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
const EuroJSONstat=function(){"use strict";const e="en",t="2.1";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function l(r){if(r.dataset){const l=r.filter||null,a=r.lang||e;let s=`https://ec.europa.eu/eurostat/wdds/rest/data/v${r.version||t}/json/${a}/${r.dataset}`,n=[];return l&&(Object.keys(l).forEach(e=>{l[e].forEach(t=>{n.push(`${e}=${t}`)})}),s+="?"+n.join("&")),s}return null}function a(l){const a=JSON.parse(JSON.stringify(l));return r(a,"filter")?(delete a.filter.time,a.filter.lastTimePeriod=["1"]):a.filter={lastTimePeriod:["1"]},a.class="query",a.lang=l.lang?l.lang:e,a.version=l.version?l.version:t,a}function s(l,a){const s=JSON.parse(JSON.stringify(l));return r(s,"filter")&&(Object.keys(s.filter).forEach(e=>{s.filter[e]=s.filter[e].slice(0,1)}),!0===a&&(delete s.filter.time,s.filter.lastTimePeriod=["1"])),r(s,"label")&&r(s.label,"category")&&(Object.keys(s.label.category).forEach(e=>{s.label.category[e]=s.label.category[e].slice(0,1)}),!0===a&&delete s.label.category.time),s.class="query",s.lang=l.lang?l.lang:e,s.version=l.version?l.version:t,s}function n(l,a){const s=JSON.parse(JSON.stringify(l)),n=r(s,"filter"),o=r(s,"label"),i=o&&r(s.label,"category"),c=o&&r(s.label,"dimension");return a.forEach(e=>{n&&delete s.filter[e],o&&(i&&delete s.label.category[e],c&&delete s.label.dimension[e])}),s.class="query",s.lang=l.lang?l.lang:e,s.version=l.version?l.version:t,s}function o(l,a,s){var n,o;void 0===s&&(s=Object.keys(a),a={class:"query",dataset:null,filter:a,lang:n||e,version:o||t});const i=JSON.parse(JSON.stringify(l)),c=r(a,"filter"),f=r(a,"label")&&r(a.label,"category");return s.forEach(e=>{c&&r(a.filter,e)&&(r(i,"filter")||(i.filter={}),i.filter[e]=a.filter[e]),f&&r(a.label.category,e)&&(r(i,"label")?r(i.label,"category")||(i.label.category={}):i.label={},i.label.category[e]=a.label.category[e])}),i.class="query",i.lang=l.lang?l.lang:e,i.version=l.version?l.version:t,i}function i(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach(t=>{switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":e.role.metric.push(t);break;default:e.role.classification.push(t)}})}const c=new Function("try {return this===global;}catch(e){return false;}");function f(e){let t;if(t=c()?require("node-fetch"):"function"!=typeof fetch?function(){window.alert("JSONstat for Eurostat: Old browsers are not supported, sorry. Use a polyfill for Fetch and Promise.")}:fetch,e)return t("string"==typeof e?e:l(e)).then(e=>e.json()).then(e=>{if(e.error)return{class:"error",status:e.error.status,label:e.error.label};{const t=JSONstat(e);return"dataset"===t.class?(i(t),t):{class:"error",status:"422",label:"Unprocessable Entity"}}})}function u(r,l){const s=!1!==l?a(r):r;return f(s).then(r=>{if("error"===r.class)return r;const l={},a={},n={};return r.id.forEach(e=>{const t=r.Dimension(e);a[e]=t.label,l[e]=t.id,n[e]=t.Category().map(e=>e.label)}),{class:"query",dataset:s.dataset,filter:l,label:{dataset:r.label,dimension:a,category:n},lang:s.lang||e,version:s.version||t}})}return{simpleQuery:s,lastPeriodQuery:a,addParamQuery:o,removeParamQuery:n,removeTimeQuery:function(e){return n(e,["time","lastTimePeriod","sinceTimePeriod"])},fetchQuery:u,fetchFullQuery:function(e,t){return u(o(e,"string"==typeof t?{geo:[t]}:{filterNonGeo:["1"]})).then(e=>"error"===e.class?e:u(n(s(e),["time","geo"]),!1).then(t=>"error"===t.class?t:o(e,t,["time","geo"])))},fetchDataset:f,getURL:l,getStatusLabel:function(e,t){return e.extension.status.label[t]},getEmptyDataset:function(e){const t=Object.keys(e.filter),r=t.map(t=>e.filter[t].length),l={};t.forEach(t=>{l[t]={label:e.label.dimension[t],category:{index:e.filter[t],label:{}}},e.filter[t].forEach((r,a)=>{Object.defineProperty(l[t].category.label,r,{value:e.label.category[t][a]})})});const a={version:"2.0",class:"dataset",label:e.label.dataset,id:t,size:r,dimension:l,value:[]},s=JSONstat(a);return EuroJSONstat.setRole(s),s},setRole:i,version:"0.1.9"}}();
