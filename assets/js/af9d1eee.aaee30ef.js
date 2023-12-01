"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[12986],{3905:function(e,r,n){n.d(r,{Zo:function(){return l},kt:function(){return d}});var t=n(67294);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var a=t.createContext({}),p=function(e){var r=t.useContext(a),n=r;return e&&(n="function"==typeof e?e(r):s(s({},r),e)),n},l=function(e){var r=p(e.components);return t.createElement(a.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,o=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=p(n),d=i,m=f["".concat(a,".").concat(d)]||f[d]||u[d]||o;return n?t.createElement(m,s(s({ref:r},l),{},{components:n})):t.createElement(m,s({ref:r},l))}));function d(e,r){var n=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=f;var c={};for(var a in r)hasOwnProperty.call(r,a)&&(c[a]=r[a]);c.originalType=e,c.mdxType="string"==typeof e?e:i,s[1]=c;for(var p=2;p<o;p++)s[p]=n[p];return t.createElement.apply(null,s)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},56e3:function(e,r,n){n.r(r),n.d(r,{assets:function(){return l},contentTitle:function(){return a},default:function(){return d},frontMatter:function(){return c},metadata:function(){return p},toc:function(){return u}});var t=n(83117),i=n(80102),o=(n(67294),n(3905)),s=["components"],c={sidebar_label:"epinio service show",title:"",description:"epinio service show",keywords:["epinio","kubernetes","epinio service show"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-service-show"],"doc-persona":["epinio-developer","epinio-operator"]},a=void 0,p={unversionedId:"references/commands/cli/service/epinio_service_show",id:"version-1.11.0/references/commands/cli/service/epinio_service_show",title:"",description:"epinio service show",source:"@site/versioned_docs/version-1.11.0/references/commands/cli/service/epinio_service_show.md",sourceDirName:"references/commands/cli/service",slug:"/references/commands/cli/service/epinio_service_show",permalink:"/references/commands/cli/service/epinio_service_show",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.11.0/references/commands/cli/service/epinio_service_show.md",tags:[],version:"1.11.0",frontMatter:{sidebar_label:"epinio service show",title:"",description:"epinio service show",keywords:["epinio","kubernetes","epinio service show"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-service-show"],"doc-persona":["epinio-developer","epinio-operator"]},sidebar:"docs",previous:{title:"epinio service port-forward",permalink:"/references/commands/cli/service/epinio_service_port-forward"},next:{title:"epinio service unbind",permalink:"/references/commands/cli/service/epinio_service_unbind"}},l={},u=[{value:"epinio service show",id:"epinio-service-show",level:2},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],f={toc:u};function d(e){var r=e.components,n=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,t.Z)({},f,n,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-service-show"},"epinio service show"),(0,o.kt)("p",null,"Show details of a service SERVICENAME"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio service show SERVICENAME [flags]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -h, --help            help for show\n  -o, --output string   sets output format [text|json] (default "text")\n')),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/references/commands/cli/service/epinio_service"},"epinio service"),"\t - Epinio service management")))}d.isMDXComponent=!0}}]);