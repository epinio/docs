"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[7352],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return g}});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),l=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return i.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=l(n),g=r,m=u["".concat(s,".").concat(g)]||u[g]||f[g]||o;return n?i.createElement(m,c(c({ref:t},p),{},{components:n})):i.createElement(m,c({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=u;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:r,c[1]=a;for(var l=2;l<o;l++)c[l]=n[l];return i.createElement.apply(null,c)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},26461:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return f}});var i=n(83117),r=n(80102),o=(n(67294),n(3905)),c=["components"],a={title:"",sidebar_label:"epinio gitconfig show"},s=void 0,l={unversionedId:"references/commands/cli/gitconfig/epinio_gitconfig_show",id:"references/commands/cli/gitconfig/epinio_gitconfig_show",title:"",description:"epinio gitconfig show",source:"@site/docs/references/commands/cli/gitconfig/epinio_gitconfig_show.md",sourceDirName:"references/commands/cli/gitconfig",slug:"/references/commands/cli/gitconfig/epinio_gitconfig_show",permalink:"/next/references/commands/cli/gitconfig/epinio_gitconfig_show",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/references/commands/cli/gitconfig/epinio_gitconfig_show.md",tags:[],version:"current",frontMatter:{title:"",sidebar_label:"epinio gitconfig show"},sidebar:"docs",previous:{title:"epinio gitconfig list",permalink:"/next/references/commands/cli/gitconfig/epinio_gitconfig_list"},next:{title:"epinio namespace",permalink:"/next/references/commands/cli/namespace/epinio_namespace"}},p={},f=[{value:"epinio gitconfig show",id:"epinio-gitconfig-show",level:2},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],u={toc:f};function g(e){var t=e.components,n=(0,r.Z)(e,c);return(0,o.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-gitconfig-show"},"epinio gitconfig show"),(0,o.kt)("p",null,"Shows the details of a git configuration"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio gitconfig show NAME [flags]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"  -h, --help   help for show\n")),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/next/references/commands/cli/gitconfig/epinio_gitconfig"},"epinio gitconfig"),"\t - Epinio git configuration management")))}g.isMDXComponent=!0}}]);