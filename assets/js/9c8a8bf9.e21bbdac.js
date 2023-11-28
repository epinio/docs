"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[7352],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return g}});var i=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var a=i.createContext({}),p=function(e){var n=i.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},l=function(e){var n=p(e.components);return i.createElement(a.Provider,{value:n},e.children)},f={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,a=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(t),g=o,d=u["".concat(a,".").concat(g)]||u[g]||f[g]||r;return t?i.createElement(d,c(c({ref:n},l),{},{components:t})):i.createElement(d,c({ref:n},l))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,c=new Array(r);c[0]=u;var s={};for(var a in n)hasOwnProperty.call(n,a)&&(s[a]=n[a]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var p=2;p<r;p++)c[p]=t[p];return i.createElement.apply(null,c)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},26461:function(e,n,t){t.r(n),t.d(n,{assets:function(){return l},contentTitle:function(){return a},default:function(){return g},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return f}});var i=t(83117),o=t(80102),r=(t(67294),t(3905)),c=["components"],s={sidebar_label:"epinio gitconfig show",description:"epinio gitconfig show",keywords:["epinio","kubernetes","epinio gitconfig show"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-gitconfig-show"],"doc-persona":["epinio-developer","epinio-operator"]},a=void 0,p={unversionedId:"references/commands/cli/gitconfig/epinio_gitconfig_show",id:"references/commands/cli/gitconfig/epinio_gitconfig_show",title:"epinio_gitconfig_show",description:"epinio gitconfig show",source:"@site/docs/references/commands/cli/gitconfig/epinio_gitconfig_show.md",sourceDirName:"references/commands/cli/gitconfig",slug:"/references/commands/cli/gitconfig/epinio_gitconfig_show",permalink:"/next/references/commands/cli/gitconfig/epinio_gitconfig_show",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/references/commands/cli/gitconfig/epinio_gitconfig_show.md",tags:[],version:"current",frontMatter:{sidebar_label:"epinio gitconfig show",description:"epinio gitconfig show",keywords:["epinio","kubernetes","epinio gitconfig show"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-gitconfig-show"],"doc-persona":["epinio-developer","epinio-operator"]},sidebar:"docs",previous:{title:"epinio gitconfig list",permalink:"/next/references/commands/cli/gitconfig/epinio_gitconfig_list"},next:{title:"epinio namespace",permalink:"/next/references/commands/cli/namespace/epinio_namespace"}},l={},f=[{value:"epinio gitconfig show",id:"epinio-gitconfig-show",level:2},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],u={toc:f};function g(e){var n=e.components,t=(0,o.Z)(e,c);return(0,r.kt)("wrapper",(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"epinio-gitconfig-show"},"epinio gitconfig show"),(0,r.kt)("p",null,"Shows the details of a git configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"epinio gitconfig show NAME [flags]\n")),(0,r.kt)("h3",{id:"options"},"Options"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"  -h, --help   help for show\n")),(0,r.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,r.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/next/references/commands/cli/gitconfig/epinio_gitconfig"},"epinio gitconfig"),"\t - Epinio git configuration management")))}g.isMDXComponent=!0}}]);