"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[39788],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return v}});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),f=l(t),v=i,d=f["".concat(s,".").concat(v)]||f[v]||u[v]||o;return t?r.createElement(d,p(p({ref:n},c),{},{components:t})):r.createElement(d,p({ref:n},c))}));function v(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,p=new Array(o);p[0]=f;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a.mdxType="string"==typeof e?e:i,p[1]=a;for(var l=2;l<o;l++)p[l]=t[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},78984:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return s},default:function(){return v},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var r=t(83117),i=t(80102),o=(t(67294),t(3905)),p=["components"],a={title:"",sidebar_label:"epinio app env set"},s=void 0,l={unversionedId:"references/cli/epinio_app_env_set",id:"version-0.9.0/references/cli/epinio_app_env_set",title:"",description:"epinio app env set",source:"@site/versioned_docs/version-0.9.0/references/cli/epinio_app_env_set.md",sourceDirName:"references/cli",slug:"/references/cli/epinio_app_env_set",permalink:"/0.9.0/references/cli/epinio_app_env_set",draft:!1,editUrl:"https://github.com/epinio/docs/versioned_docs/version-0.9.0/references/cli/epinio_app_env_set.md",tags:[],version:"0.9.0",frontMatter:{title:"",sidebar_label:"epinio app env set"},sidebar:"docs",previous:{title:"epinio app env list",permalink:"/0.9.0/references/cli/epinio_app_env_list"},next:{title:"epinio app env show",permalink:"/0.9.0/references/cli/epinio_app_env_show"}},c={},u=[{value:"epinio app env set",id:"epinio-app-env-set",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],f={toc:u};function v(e){var n=e.components,t=(0,i.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-app-env-set"},"epinio app env set"),(0,o.kt)("p",null,"Extend application environment"),(0,o.kt)("h3",{id:"synopsis"},"Synopsis"),(0,o.kt)("p",null,"Add or change environment variable of named application"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio app env set APPNAME NAME VALUE [flags]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"  -h, --help   help for set\n")),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/0.9.0/references/cli/epinio_app_env"},"epinio app env"),"\t - Epinio application configuration")))}v.isMDXComponent=!0}}]);