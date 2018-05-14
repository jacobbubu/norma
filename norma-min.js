/* Copyright (c) 2014-2015 Richard Rodger, MIT License */
"use strict";function compile(e){if(null==e)throw error("no_spec","no argument specification");var r=specmap[e];if(null!=r)return r;var s=parse_spec(e),n=[],p=1,u=["^"],i=0;s.forEach(function(e){if(u.push("("),e.type.or&&0<e.type.or.length){var r=1;u.push("("),u.push(e.type.mark),u.push(")"),e.type.or.forEach(function(e){u.push("|"),u.push("("),u.push(e[1]),r++,u.push(")")}),"?"==e.mod&&u.push("|[UNA]?"),n[i]={index:p},p+=r}else"?"==e.mod?u.push("[UNA"+e.type.mark+"]?"):(u.push(e.type.mark),u.push(e.mod||"")),n[i]={index:p};n[i].mod=e.mod,u.push(")"),p++,i++}),u.push("$");var t=new RegExp(u.join(""));return r=specmap[e]={re:t,spec:e,respec:s,reindex:n}}function parse_spec(e){try{return parser.parse(e)}catch(r){throw error("parse",r.message+'; spec:"'+e+'", col:'+r.column+", line:"+r.line)}}function processargs(e,r,s){var n=Array.prototype.slice.call(s||[]),p=describe(n),u=e.re.exec(p);if(!u){if("throw"==r.onfail)throw error("invalid_arguments",'invalid arguments; expected: "'+e.spec+'", was: ['+p+"]; values: "+descargs(n,r),{args:n,specdef:e,options:r});return null}for(var i=e.respec.object?{}:[],t=0,o=0,a=0;t<e.reindex.length;t++){var c=e.reindex[t],l=void 0;if(e.respec.object||(i[a]=l),null!=c.index){var h=u[c.index],d=""!==h;if(d){var f=e.respec[t].name,m="*"===e.respec[t].mod,g="+"===e.respec[t].mod;if(0===h.length&&g)throw error("invalid_arguments",'invalid arguments; expected: "'+e.spec+'", was: ['+p+"]; values: "+descargs(n,r),{args:n,specdef:e,options:r});if(1==h.length)l=n[o],o++,e.respec.object||(i[a]=l),null!=f&&(m||g?(i[f]=i[f]||[]).push(l):i[e.respec[t].name]=l),a++;else if(1<h.length)for(var v=0;v<h.length;v++)l=n[o],o++,e.respec.object||(i[a]=l),null!=f&&(i[f]=i[f]||[]).push(l),a++}else e.respec.object||(i[a]=void 0),a++}}return i}function describe(e){var r=[];return e.forEach(function(e){_.isString(e)?r.push("s"):isNaN(e)||(0|e)!==parseFloat(e)?_.isNaN(e)?r.push("A"):1/0===e?r.push("Y"):_.isNumber(e)?r.push("n"):_.isBoolean(e)?r.push("b"):_.isFunction(e)?r.push("f"):_.isArray(e)?r.push("a"):_.isRegExp(e)?r.push("r"):_.isDate(e)?r.push("d"):_.isArguments(e)?r.push("g"):util.isError(e)?r.push("e"):_.isNull(e)?r.push("N"):_.isUndefined(e)?r.push("U"):_.isObject(e)?r.push("o"):r.push("q"):r.push("i")}),r.join("")}function descargs(e,r){var s=[];return _.each(e,function(e){var n=util.inspect(e).substring(0,r.desclen);s.push(n)}),s}function handle(e,r,s){if((_.isArguments(r)||_.isArray(r))&&(s=r,r=null),r=null==r?defopts:_.extend({},defopts,r),null==s)throw error("init",'no arguments variable; expected norma( "...", arguments ), '+"or <compiled>( arguments )",{arguments:arguments});return processargs(e,r,s)}var util=require("util"),_=require("lodash"),error=require("eraro")({"package":"norma"}),parser=require("./norma-parser"),defopts={onfail:"throw",desclen:33},specmap={};module.exports=function(e,r,s){var n=compile(e);return handle(n,r,s)},module.exports.compile=function(e){var r=compile(e),s=function(e,s){return handle(r,e,s)};return s.toString=function(){return util.inspect({spec:r.spec,re:""+r.re})},s};
//# sourceMappingURL=norma-min.map