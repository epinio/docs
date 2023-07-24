"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[45028],{3905:function(e,n,i){i.d(n,{Zo:function(){return p},kt:function(){return d}});var t=i(67294);function r(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function o(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function a(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?o(Object(i),!0).forEach((function(n){r(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function c(e,n){if(null==e)return{};var i,t,r=function(e,n){if(null==e)return{};var i,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)i=o[t],n.indexOf(i)>=0||(r[i]=e[i]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)i=o[t],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var u=t.createContext({}),s=function(e){var n=t.useContext(u),i=n;return e&&(i="function"==typeof e?e(n):a(a({},n),e)),i},p=function(e){var n=s(e.components);return t.createElement(u.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var i=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(i),d=r,m=f["".concat(u,".").concat(d)]||f[d]||l[d]||o;return i?t.createElement(m,a(a({ref:n},p),{},{components:i})):t.createElement(m,a({ref:n},p))}));function d(e,n){var i=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=i.length,a=new Array(o);a[0]=f;var c={};for(var u in n)hasOwnProperty.call(n,u)&&(c[u]=n[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var s=2;s<o;s++)a[s]=i[s];return t.createElement.apply(null,a)}return t.createElement.apply(null,i)}f.displayName="MDXCreateElement"},60244:function(e,n,i){i.r(n),i.d(n,{assets:function(){return p},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return l}});var t=i(83117),r=i(80102),o=(i(67294),i(3905)),a=["components"],c={title:"",sidebar_label:"epinio configuration unbind"},u=void 0,s={unversionedId:"references/commands/cli/configuration/epinio_configuration_unbind",id:"version-1.9.0/references/commands/cli/configuration/epinio_configuration_unbind",title:"",description:"epinio configuration unbind",source:"@site/versioned_docs/version-1.9.0/references/commands/cli/configuration/epinio_configuration_unbind.md",sourceDirName:"references/commands/cli/configuration",slug:"/references/commands/cli/configuration/epinio_configuration_unbind",permalink:"/references/commands/cli/configuration/epinio_configuration_unbind",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.9.0/references/commands/cli/configuration/epinio_configuration_unbind.md",tags:[],version:"1.9.0",frontMatter:{title:"",sidebar_label:"epinio configuration unbind"},sidebar:"docs",previous:{title:"epinio configuration show",permalink:"/references/commands/cli/configuration/epinio_configuration_show"},next:{title:"epinio configuration update",permalink:"/references/commands/cli/configuration/epinio_configuration_update"}},p={},l=[{value:"epinio configuration unbind",id:"epinio-configuration-unbind",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],f={toc:l};function d(e){var n=e.components,i=(0,r.Z)(e,a);return(0,o.kt)("wrapper",(0,t.Z)({},f,i,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-configuration-unbind"},"epinio configuration unbind"),(0,o.kt)("p",null,"Unbind configuration from an application"),(0,o.kt)("h3",{id:"synopsis"},"Synopsis"),(0,o.kt)("p",null,"Unbind configuration by name, from named application."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio configuration unbind NAME APP [flags]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"  -h, --help   help for unbind\n")),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/references/commands/cli/configuration/epinio_configuration"},"epinio configuration"),"\t - Epinio configuration features")))}d.isMDXComponent=!0}}]);