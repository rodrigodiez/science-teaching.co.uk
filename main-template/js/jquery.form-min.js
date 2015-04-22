/*!
 * jQuery Form Plugin
 * version: 2.47 (04-SEP-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(b){b.fn.ajaxSubmit=function(s){if(!this.length){a("ajaxSubmit: skipping submit process - no element selected");return this;}if(typeof s=="function"){s={success:s};}var d=b.trim(this.attr("action"));if(d){d=(d.match(/^([^#]+)/)||[])[1];}d=d||window.location.href||"";s=b.extend(true,{url:d,type:this.attr("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},s);var t={};this.trigger("form-pre-serialize",[this,s,t]);if(t.veto){a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this;}if(s.beforeSerialize&&s.beforeSerialize(this,s)===false){a("ajaxSubmit: submit aborted via beforeSerialize callback");return this;}var f,o,l=this.formToArray(s.semantic);if(s.data){s.extraData=s.data;for(f in s.data){if(s.data[f] instanceof Array){for(var h in s.data[f]){l.push({name:f,value:s.data[f][h]});}}else{o=s.data[f];o=b.isFunction(o)?o():o;l.push({name:f,value:o});}}}if(s.beforeSubmit&&s.beforeSubmit(l,this,s)===false){a("ajaxSubmit: submit aborted via beforeSubmit callback");return this;}this.trigger("form-submit-validate",[l,this,s,t]);if(t.veto){a("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this;}var c=b.param(l);if(s.type.toUpperCase()=="GET"){s.url+=(s.url.indexOf("?")>=0?"&":"?")+c;s.data=null;}else{s.data=c;}var r=this,j=[];if(s.resetForm){j.push(function(){r.resetForm();});}if(s.clearForm){j.push(function(){r.clearForm();});}if(!s.dataType&&s.target){var p=s.success||function(){};j.push(function(n){var k=s.replaceTarget?"replaceWith":"html";b(s.target)[k](n).each(p,arguments);});}else{if(s.success){j.push(s.success);}}s.success=function(v,n,w){var u=s.context||s;for(var q=0,k=j.length;q<k;q++){j[q].apply(u,[v,n,w||r,r]);}};var g=b("input:file",this).length>0;var e="multipart/form-data";var i=(r.attr("enctype")==e||r.attr("encoding")==e);if(s.iframe!==false&&(g||s.iframe||i)){if(s.closeKeepAlive){b.get(s.closeKeepAlive,m);}else{m();}}else{b.ajax(s);}this.trigger("form-submit-notify",[this,s]);return this;function m(){var k=r[0];if(b(":input[name=submit],:input[id=submit]",k).length){alert('Error: Form elements must not have name or id of "submit".');return;}var y=b.extend(true,{},b.ajaxSettings,s);y.context=y.context||y;var B="jqFormIO"+(new Date().getTime()),w="_"+B;window[w]=function(){var n=q.data("form-plugin-onload");if(n){n();window[w]=undefined;try{delete window[w];}catch(K){}}};var q=b('<iframe id="'+B+'" name="'+B+'" src="'+y.iframeSrc+'" onload="window[\'_\'+this.id]()" />');var x=q[0];q.css({position:"absolute",top:"-1000px",left:"-1000px"});var u={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;
q.attr("src",y.iframeSrc);}};var G=y.global;if(G&&!b.active++){b.event.trigger("ajaxStart");}if(G){b.event.trigger("ajaxSend",[u,y]);}if(y.beforeSend&&y.beforeSend.call(y.context,u,y)===false){if(y.global){b.active--;}return;}if(u.aborted){return;}var C=false;var F=0;var v=k.clk;if(v){var D=v.name;if(D&&!v.disabled){y.extraData=y.extraData||{};y.extraData[D]=v.value;if(v.type=="image"){y.extraData[D+".x"]=k.clk_x;y.extraData[D+".y"]=k.clk_y;}}}function E(){var M=r.attr("target"),K=r.attr("action");k.setAttribute("target",B);if(k.getAttribute("method")!="POST"){k.setAttribute("method","POST");}if(k.getAttribute("action")!=y.url){k.setAttribute("action",y.url);}if(!y.skipEncodingOverride){r.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});}if(y.timeout){setTimeout(function(){F=true;A();},y.timeout);}var L=[];try{if(y.extraData){for(var N in y.extraData){L.push(b('<input type="hidden" name="'+N+'" value="'+y.extraData[N]+'" />').appendTo(k)[0]);}}q.appendTo("body");q.data("form-plugin-onload",A);k.submit();}finally{k.setAttribute("action",K);if(M){k.setAttribute("target",M);}else{r.removeAttr("target");}b(L).remove();}}if(y.forceSync){E();}else{setTimeout(E,10);}var I,J,H=50;function A(){if(C){return;}q.removeData("form-plugin-onload");var K=true;try{if(F){throw"timeout";}J=x.contentWindow?x.contentWindow.document:x.contentDocument?x.contentDocument:x.document;var O=y.dataType=="xml"||J.XMLDocument||b.isXMLDoc(J);a("isXml="+O);if(!O&&window.opera&&(J.body==null||J.body.innerHTML=="")){if(--H){a("requeing onLoad callback, DOM not available");setTimeout(A,250);return;}}C=true;u.responseText=J.documentElement?J.documentElement.innerHTML:null;u.responseXML=J.XMLDocument?J.XMLDocument:J;u.getResponseHeader=function(Q){var P={"content-type":y.dataType};return P[Q];};var N=/(json|script)/.test(y.dataType);if(N||y.textarea){var n=J.getElementsByTagName("textarea")[0];if(n){u.responseText=n.value;}else{if(N){var M=J.getElementsByTagName("pre")[0];if(M){u.responseText=M.innerHTML;}}}}else{if(y.dataType=="xml"&&!u.responseXML&&u.responseText!=null){u.responseXML=z(u.responseText);}}I=b.httpData(u,y.dataType);}catch(L){a("error caught:",L);K=false;u.error=L;b.handleError(y,u,"error",L);}if(K){y.success.call(y.context,I,"success",u);if(G){b.event.trigger("ajaxSuccess",[u,y]);}}if(G){b.event.trigger("ajaxComplete",[u,y]);}if(G&&!--b.active){b.event.trigger("ajaxStop");}if(y.complete){y.complete.call(y.context,u,K?"success":"error");}setTimeout(function(){q.removeData("form-plugin-onload");q.remove();u.responseXML=null;},100);}function z(n,K){if(window.ActiveXObject){K=new ActiveXObject("Microsoft.XMLDOM");K.async="false";K.loadXML(n);}else{K=(new DOMParser()).parseFromString(n,"text/xml");}return(K&&K.documentElement&&K.documentElement.tagName!="parsererror")?K:null;}}};b.fn.ajaxForm=function(c){if(this.length===0){var d={s:this.selector,c:this.context};if(!b.isReady&&d.s){a("DOM not ready, queuing ajaxForm");b(function(){b(d.s,d.c).ajaxForm(c);
});return this;}a("terminating; zero elements found by selector"+(b.isReady?"":" (DOM not ready)"));return this;}return this.ajaxFormUnbind().bind("submit.form-plugin",function(f){if(!f.isDefaultPrevented()){f.preventDefault();b(this).ajaxSubmit(c);}}).bind("click.form-plugin",function(j){var i=j.target;var g=b(i);if(!(g.is(":submit,input:image"))){var f=g.closest(":submit");if(f.length==0){return;}i=f[0];}var h=this;h.clk=i;if(i.type=="image"){if(j.offsetX!=undefined){h.clk_x=j.offsetX;h.clk_y=j.offsetY;}else{if(typeof b.fn.offset=="function"){var k=g.offset();h.clk_x=j.pageX-k.left;h.clk_y=j.pageY-k.top;}else{h.clk_x=j.pageX-i.offsetLeft;h.clk_y=j.pageY-i.offsetTop;}}}setTimeout(function(){h.clk=h.clk_x=h.clk_y=null;},100);});};b.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin");};b.fn.formToArray=function(o){var m=[];if(this.length===0){return m;}var c=this[0];var f=o?c.getElementsByTagName("*"):c.elements;if(!f){return m;}var h,g,e,p,d;for(h=0,max=f.length;h<max;h++){d=f[h];e=d.name;if(!e){continue;}if(o&&c.clk&&d.type=="image"){if(!d.disabled&&c.clk==d){m.push({name:e,value:b(d).val()});m.push({name:e+".x",value:c.clk_x},{name:e+".y",value:c.clk_y});}continue;}p=b.fieldValue(d,true);if(p&&p.constructor==Array){for(g=0,jmax=p.length;g<jmax;g++){m.push({name:e,value:p[g]});}}else{if(p!==null&&typeof p!="undefined"){m.push({name:e,value:p});}}}if(!o&&c.clk){var k=b(c.clk),l=k[0];e=l.name;if(e&&!l.disabled&&l.type=="image"){m.push({name:e,value:k.val()});m.push({name:e+".x",value:c.clk_x},{name:e+".y",value:c.clk_y});}}return m;};b.fn.formSerialize=function(c){return b.param(this.formToArray(c));};b.fn.fieldSerialize=function(d){var c=[];this.each(function(){var h=this.name;if(!h){return;}var f=b.fieldValue(this,d);if(f&&f.constructor==Array){for(var g=0,e=f.length;g<e;g++){c.push({name:h,value:f[g]});}}else{if(f!==null&&typeof f!="undefined"){c.push({name:this.name,value:f});}}});return b.param(c);};b.fn.fieldValue=function(h){for(var g=[],e=0,c=this.length;e<c;e++){var f=this[e];var d=b.fieldValue(f,h);if(d===null||typeof d=="undefined"||(d.constructor==Array&&!d.length)){continue;}d.constructor==Array?b.merge(g,d):g.push(d);}return g;};b.fieldValue=function(c,j){var e=c.name,p=c.type,q=c.tagName.toLowerCase();if(j===undefined){j=true;}if(j&&(!e||c.disabled||p=="reset"||p=="button"||(p=="checkbox"||p=="radio")&&!c.checked||(p=="submit"||p=="image")&&c.form&&c.form.clk!=c||q=="select"&&c.selectedIndex==-1)){return null;}if(q=="select"){var k=c.selectedIndex;if(k<0){return null;}var m=[],d=c.options;var g=(p=="select-one");var l=(g?k+1:d.length);for(var f=(g?k:0);f<l;f++){var h=d[f];if(h.selected){var o=h.value;if(!o){o=(h.attributes&&h.attributes.value&&!(h.attributes.value.specified))?h.text:h.value;}if(g){return o;}m.push(o);}}return m;}return b(c).val();};b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields();});};b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();
if(d=="text"||d=="password"||c=="textarea"){this.value="";}else{if(d=="checkbox"||d=="radio"){this.checked=false;}else{if(c=="select"){this.selectedIndex=-1;}}}});};b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset();}});};b.fn.enable=function(c){if(c===undefined){c=true;}return this.each(function(){this.disabled=!c;});};b.fn.selected=function(c){if(c===undefined){c=true;}return this.each(function(){var d=this.type;if(d=="checkbox"||d=="radio"){this.checked=c;}else{if(this.tagName.toLowerCase()=="option"){var e=b(this).parent("select");if(c&&e[0]&&e[0].type=="select-one"){e.find("option").selected(false);}this.selected=c;}}});};function a(){if(b.fn.ajaxSubmit.debug){var c="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log){window.console.log(c);}else{if(window.opera&&window.opera.postError){window.opera.postError(c);}}}}})(jQuery);