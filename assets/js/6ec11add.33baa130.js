"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[38198],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return f}});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},p=Object.keys(e);for(i=0;i<p.length;i++)t=p[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(i=0;i<p.length;i++)t=p[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,p=e.originalType,s=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=c(t),f=r,v=m["".concat(s,".").concat(f)]||m[f]||u[f]||p;return t?i.createElement(v,o(o({ref:n},l),{},{components:t})):i.createElement(v,o({ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var p=t.length,o=new Array(p);o[0]=m;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a.mdxType="string"==typeof e?e:r,o[1]=a;for(var c=2;c<p;c++)o[c]=t[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},30878:function(e,n,t){t.r(n),t.d(n,{assets:function(){return l},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return u}});var i=t(83117),r=t(80102),p=(t(67294),t(3905)),o=["components"],a={title:"",sidebar_label:"epinio app env"},s=void 0,c={unversionedId:"references/commands/cli/app/env/epinio_app_env",id:"version-1.10.0/references/commands/cli/app/env/epinio_app_env",title:"",description:"epinio app env",source:"@site/versioned_docs/version-1.10.0/references/commands/cli/app/env/epinio_app_env.md",sourceDirName:"references/commands/cli/app/env",slug:"/references/commands/cli/app/env/epinio_app_env",permalink:"/references/commands/cli/app/env/epinio_app_env",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/references/commands/cli/app/env/epinio_app_env.md",tags:[],version:"1.10.0",frontMatter:{title:"",sidebar_label:"epinio app env"},sidebar:"docs",previous:{title:"epinio app chart show",permalink:"/references/commands/cli/app/chart/epinio_app_chart_show"},next:{title:"epinio app env list",permalink:"/references/commands/cli/app/env/epinio_app_env_list"}},l={},u=[{value:"epinio app env",id:"epinio-app-env",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],m={toc:u};function f(e){var n=e.components,t=(0,r.Z)(e,o);return(0,p.kt)("wrapper",(0,i.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,p.kt)("h2",{id:"epinio-app-env"},"epinio app env"),(0,p.kt)("p",null,"Epinio application configuration"),(0,p.kt)("h3",{id:"synopsis"},"Synopsis"),(0,p.kt)("p",null,"Manage epinio application environment variables"),(0,p.kt)("h3",{id:"options"},"Options"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre"},"  -h, --help   help for env\n")),(0,p.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,p.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/references/commands/cli/app/epinio_app"},"epinio app"),"\t - Epinio application features"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/references/commands/cli/app/env/epinio_app_env_list"},"epinio app env list"),"\t - Lists application environment"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/references/commands/cli/app/env/epinio_app_env_set"},"epinio app env set"),"\t - Extend application environment"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/references/commands/cli/app/env/epinio_app_env_show"},"epinio app env show"),"\t - Describe application's environment variable"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/references/commands/cli/app/env/epinio_app_env_unset"},"epinio app env unset"),"\t - Shrink application environment")))}f.isMDXComponent=!0}}]);