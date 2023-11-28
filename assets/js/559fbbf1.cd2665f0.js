"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[96826],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return f}});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=i.createContext({}),s=function(e){var n=i.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=s(e.components);return i.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=s(t),f=r,d=u["".concat(p,".").concat(f)]||u[f]||m[f]||a;return t?i.createElement(d,o(o({ref:n},l),{},{components:t})):i.createElement(d,o({ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,o=new Array(a);o[0]=u;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<a;s++)o[s]=t[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9498:function(e,n,t){t.r(n),t.d(n,{assets:function(){return l},contentTitle:function(){return p},default:function(){return f},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return m}});var i=t(83117),r=t(80102),a=(t(67294),t(3905)),o=["components"],c={sidebar_label:"epinio namespace",description:"epinio namespace",keywords:["epinio","kubernetes","epinio namespace"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-namespace"],"doc-persona":["epinio-developer","epinio-operator"]},p=void 0,s={unversionedId:"references/commands/cli/namespace/epinio_namespace",id:"references/commands/cli/namespace/epinio_namespace",title:"epinio_namespace",description:"epinio namespace",source:"@site/docs/references/commands/cli/namespace/epinio_namespace.md",sourceDirName:"references/commands/cli/namespace",slug:"/references/commands/cli/namespace/epinio_namespace",permalink:"/next/references/commands/cli/namespace/epinio_namespace",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/references/commands/cli/namespace/epinio_namespace.md",tags:[],version:"current",frontMatter:{sidebar_label:"epinio namespace",description:"epinio namespace",keywords:["epinio","kubernetes","epinio namespace"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-namespace"],"doc-persona":["epinio-developer","epinio-operator"]},sidebar:"docs",previous:{title:"epinio gitconfig show",permalink:"/next/references/commands/cli/gitconfig/epinio_gitconfig_show"},next:{title:"epinio namespace create",permalink:"/next/references/commands/cli/namespace/epinio_namespace_create"}},l={},m=[{value:"epinio namespace",id:"epinio-namespace",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],u={toc:m};function f(e){var n=e.components,t=(0,r.Z)(e,o);return(0,a.kt)("wrapper",(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"epinio-namespace"},"epinio namespace"),(0,a.kt)("p",null,"Epinio-controlled namespaces"),(0,a.kt)("h3",{id:"synopsis"},"Synopsis"),(0,a.kt)("p",null,"Manage epinio-controlled namespaces"),(0,a.kt)("h3",{id:"options"},"Options"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"  -h, --help   help for namespace\n")),(0,a.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,a.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/next/references/commands/cli/epinio"},"epinio"),"\t - Epinio cli"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/next/references/commands/cli/namespace/epinio_namespace_create"},"epinio namespace create"),"\t - Creates an epinio-controlled namespace"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/next/references/commands/cli/namespace/epinio_namespace_delete"},"epinio namespace delete"),"\t - Deletes an epinio-controlled namespace"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/next/references/commands/cli/namespace/epinio_namespace_list"},"epinio namespace list"),"\t - Lists all epinio-controlled namespaces"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/next/references/commands/cli/namespace/epinio_namespace_show"},"epinio namespace show"),"\t - Shows the details of an epinio-controlled namespace")))}f.isMDXComponent=!0}}]);