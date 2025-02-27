!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Defuddle=t():e.Defuddle=t()}(this,(()=>{return e={156:(e,t,r)=>{var o,a,s,n,i;void 0!==(o=function(e,t){}.apply(a={},[r,t]))||(o=a),void 0!==(s=function(e,t,r){"use strict";const o=["[hidden]",'[style*="display: none"]','[style*="display:none"]','[style*="visibility: hidden"]','[style*="visibility:hidden"]',".hidden",".invisible"].join(","),a=new Set(["href","src","srcset","data-src","data-srcset","alt","title","id","class","width","height","colspan","rowspan","headers","aria-label","role","lang"]),s=["#toc",".toc","#comments","#siteSub",".ad","aside","button","canvas","dialog","fieldset","footer","form","header","input","iframe","label","link","nav","noscript","option","script","select","sidebar",".sidebar","#sidebar","style","textarea",'[data-link-name*="skip"]','[src*="author"]','[href="#site-content"]','[class^="ad-"]','[class$="-ad"]','[id^="ad-"]','[id$="-ad"]','[role="banner"]','[role="dialog"]','[role="complementary"]','[role="navigation"]'],n=["avatar","-ad-","_ad_","article-end ","article-title","author","banner","bottom-of-article","brand-bar","breadcrumb","button","btn-","-btn","byline","catlinks","collections","comments","comment-content","complementary","-cta","cta-","discussion","eyebrow","expand-reduce","facebook","feedback","fixed","footer","for-you","global","google","goog-","interlude","link-box","loading","logo-","menu-","meta-","metadata","more-","mw-editsection","mw-jump-link","nav-","navbar","next-","newsletter-signup","overlay","popular","popup","post-date","post-title","post_date","post_title","preview","prevnext","profile","promo","qr-code","qr_code","read-next","reading-list","recommend","recirc","register","related","screen-reader-text","share","site-index","skip-","social","sponsor","subscribe","-toc","table-of-contents","tabs-","toolbar","top-wrapper","tree-item","trending","twitter"];class i{static enableDebug(e=!0){this.debug=e}static log(...e){this.debug&&console.log("Defuddle:",...e)}static parse(e){try{const t=this.evaluateMediaQueries(e),o=this.findSmallImages(e),a=e.cloneNode(!0),s=r.MetadataExtractor.extractSchemaOrgData(e);this.applyMobileStyles(a,t);const n=this.findMainContent(a);if(!n)return Object.assign({content:e.body.innerHTML},r.MetadataExtractor.extract(e,s));this.removeSmallImages(a,o),this.removeHiddenElements(a),this.removeClutter(a),this.cleanContent(n);const i=r.MetadataExtractor.extract(e,s);return Object.assign({content:n?n.outerHTML:e.body.innerHTML},i)}catch(t){console.error("Defuddle","Error processing document:",t);const o=r.MetadataExtractor.extractSchemaOrgData(e);return Object.assign({content:e.body.innerHTML},r.MetadataExtractor.extract(e,o))}}static evaluateMediaQueries(e){const t=[];try{Array.from(e.styleSheets).filter((e=>{try{return e.cssRules,!0}catch(e){return!1}})).forEach((e=>{try{Array.from(e.cssRules).forEach((e=>{var r;e instanceof CSSMediaRule&&e.conditionText.includes("max-width")&&600<=parseInt((null===(r=e.conditionText.match(/\d+/))||void 0===r?void 0:r[0])||"0")&&Array.from(e.cssRules).forEach((e=>{if(e instanceof CSSStyleRule)try{t.push({selector:e.selectorText,styles:e.style.cssText})}catch(t){console.error("Defuddle","Error collecting styles for selector:",e.selectorText,t)}}))}))}catch(e){console.error("Defuddle","Error processing stylesheet:",e)}}))}catch(e){console.error("Defuddle","Error evaluating media queries:",e)}return t}static applyMobileStyles(e,t){t.forEach((({selector:t,styles:r})=>{try{e.querySelectorAll(t).forEach((e=>{e.setAttribute("style",(e.getAttribute("style")||"")+r)}))}catch(e){console.error("Defuddle","Error applying styles for selector:",t,e)}}))}static removeHiddenElements(e){let t=0;e.querySelectorAll(this.HIDDEN_ELEMENTS_SELECTOR).forEach((e=>{e.remove(),t++}));const r=e.getElementsByTagName("*");Array.from(r).forEach((e=>{const r=window.getComputedStyle(e);"none"!==r.display&&"hidden"!==r.visibility&&"0"!==r.opacity||(e.remove(),t++)})),this.log("Removed hidden elements:",t)}static removeClutter(e){let t=0,r=0;const o=s.map((e=>e.includes("[")?e.split(/(\[.*?\])/).map((e=>{if(e.startsWith("[")&&e.includes("=")){const[t,r]=e.slice(1,-1).split("=");if(r.startsWith('"')||r.startsWith("'"))return`[${t.toLowerCase()}=${r}]`}return e.toLowerCase()})).join(""):e.toLowerCase())).join(",");e.querySelectorAll(o).forEach((e=>{(null==e?void 0:e.parentNode)&&(e.remove(),t++)}));const a=n.map((e=>new RegExp(e,"i"))),i=new Set;e.querySelectorAll("[class], [id], [data-testid], [data-qa]").forEach((e=>{var t,o;if(!e||!e.parentNode)return;const s=`${e.className&&"string"==typeof e.className?e.className.toLowerCase():""} ${e.id?e.id.toLowerCase():""} ${(null===(t=e.getAttribute("data-testid"))||void 0===t?void 0:t.toLowerCase())||""} ${(null===(o=e.getAttribute("data-qa"))||void 0===o?void 0:o.toLowerCase())||""}`;a.some((e=>e.test(s)))&&(i.add(e),r++)})),i.forEach((e=>e.remove())),this.log("Found clutter elements:",{basicSelectors:t,patternMatches:r,total:t+r})}static cleanContent(e){this.removeHtmlComments(e),this.handleHeadings(e),this.stripUnwantedAttributes(e),this.removeEmptyElements(e)}static handleHeadings(e){const t=e.getElementsByTagName("h1");let r=!0;Array.from(t).forEach((e=>{var t;if(r)e.remove(),r=!1;else{const r=document.createElement("h2");r.innerHTML=e.innerHTML,Array.from(e.attributes).forEach((e=>{this.ALLOWED_ATTRIBUTES.has(e.name)&&r.setAttribute(e.name,e.value)})),null===(t=e.parentNode)||void 0===t||t.replaceChild(r,e)}}))}static removeHtmlComments(e){const t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT,null);let o;for(;o=r.nextNode();)t.push(o);t.forEach((e=>{e.remove()})),this.log("Removed HTML comments:",t.length)}static stripUnwantedAttributes(e){let t=0;const r=e=>{Array.from(e.attributes).forEach((r=>{const o=r.name.toLowerCase();this.ALLOWED_ATTRIBUTES.has(o)||o.startsWith("data-")||(e.removeAttribute(r.name),t++)}))};r(e),e.querySelectorAll("*").forEach(r),this.log("Stripped attributes:",t)}static removeEmptyElements(e){let t=0,r=0,o=!0;const a=new Set(["area","audio","base","br","col","embed","figure","hr","iframe","img","input","link","meta","object","param","picture","source","svg","td","th","track","video","wbr"]);for(;o;){r++,o=!1;const s=Array.from(e.getElementsByTagName("*")).filter((e=>{var t;if(a.has(e.tagName.toLowerCase()))return!1;const r=0===(null===(t=e.textContent)||void 0===t?void 0:t.trim().length),o=!e.hasChildNodes()||Array.from(e.childNodes).every((e=>{var t;return e.nodeType===Node.TEXT_NODE&&0===(null===(t=e.textContent)||void 0===t?void 0:t.trim().length)}));return r&&o}));s.length>0&&(s.forEach((e=>{e.remove(),t++})),o=!0)}this.log("Removed empty elements:",{count:t,iterations:r})}static findSmallImages(e){let t=0;const r=new Set,o=e.getElementsByTagName("img");return Array.from(o).forEach((e=>{var o;try{const a=window.getComputedStyle(e),s=e.naturalWidth||0,n=e.naturalHeight||0,i=parseInt(e.getAttribute("width")||"0"),l=parseInt(e.getAttribute("height")||"0"),c=parseInt(a.width)||0,d=parseInt(a.height)||0,m=e.getBoundingClientRect(),h=m.width,u=m.height,g=a.transform,f=g?parseFloat((null===(o=g.match(/scale\(([\d.]+)\)/))||void 0===o?void 0:o[1])||"1"):1,p=h*f,E=u*f,y=Math.min(...[s,i,c,p].filter((e=>e>0))),b=Math.min(...[n,l,d,E].filter((e=>e>0)));if(y>0&&b>0&&(y<24||b<24)){const o=this.getImageIdentifier(e);o&&(r.add(o),t++)}}catch(e){console.error("Error processing image:",e)}})),this.log("Found small images:",t),r}static removeSmallImages(e,t){let r=0;const o=e.getElementsByTagName("img");Array.from(o).forEach((e=>{const o=this.getImageIdentifier(e);o&&t.has(o)&&(e.remove(),r++)})),this.log("Removed small images:",r)}static getImageIdentifier(e){const t=e.src||e.getAttribute("data-src")||"",r=e.srcset||e.getAttribute("data-srcset")||"",o=e.alt||"",a=e.className||"",s=e.id||"";return t?`src:${t}`:r?`srcset:${r}`:s?`id:${s}`:a&&o?`class:${a};alt:${o}`:null}static findMainContent(e){const t=["article",'[role="article"]','[itemprop="articleBody"]',".post-content",".article-content","#article-content",".content-article","main",'[role="main"]',"body"],r=[];return t.forEach(((o,a)=>{e.querySelectorAll(o).forEach((e=>{let o=10*(t.length-a);o+=this.scoreElement(e),r.push({element:e,score:o})}))})),0===r.length?this.findContentByScoring(e):(r.sort(((e,t)=>t.score-e.score)),this.debug&&this.log("Content candidates:",r.map((e=>({element:e.element.tagName,selector:this.getElementSelector(e.element),score:e.score})))),r[0].element)}static findContentByScoring(e){const t=this.scoreElements(e);return t.length>0?t[0].element:null}static getElementSelector(e){const t=[];let r=e;for(;r&&r!==document.documentElement;){let e=r.tagName.toLowerCase();r.id?e+="#"+r.id:r.className&&(e+="."+r.className.trim().split(/\s+/).join(".")),t.unshift(e),r=r.parentElement}return t.join(" > ")}static scoreElements(e){const t=[];return this.BLOCK_ELEMENTS.forEach((r=>{Array.from(e.getElementsByTagName(r)).forEach((e=>{const r=this.scoreElement(e);r>0&&t.push({score:r,element:e})}))})),t.sort(((e,t)=>t.score-e.score))}static scoreElement(e){let t=0;const r=e.className.toLowerCase(),o=e.id.toLowerCase();(this.POSITIVE_PATTERNS.test(r)||this.POSITIVE_PATTERNS.test(o))&&(t+=25),(this.NEGATIVE_PATTERNS.test(r)||this.NEGATIVE_PATTERNS.test(o))&&(t-=25);const a=e.textContent||"",s=a.split(/\s+/).length;t+=Math.min(Math.floor(s/100),3);const n=e.getElementsByTagName("a"),i=Array.from(n).reduce(((e,t)=>{var r;return e+((null===(r=t.textContent)||void 0===r?void 0:r.length)||0)}),0);(a.length?i/a.length:0)>.5&&(t-=10),t+=e.getElementsByTagName("p").length;const l=e.getElementsByTagName("img").length;return t+=Math.min(3*l,9),t}}i.debug=!0,i.POSITIVE_PATTERNS=/article|content|main|post|body|text|blog|story/i,i.NEGATIVE_PATTERNS=/comment|meta|footer|footnote|foot|nav|sidebar|banner|ad|popup|menu/i,i.BLOCK_ELEMENTS=["div","section","article","main"],i.HIDDEN_ELEMENTS_SELECTOR=o,i.ALLOWED_ATTRIBUTES=a,window.Defuddle=i}.apply(n={},[r,t,o]))||(s=n),void 0===(i=function(e,t,r){}.apply(t,[r,t,s]))||(e.exports=i)}},t={},function r(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}(156).default;var e,t}));