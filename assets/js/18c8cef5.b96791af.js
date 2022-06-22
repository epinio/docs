"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[79789],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=c(r),f=o,d=m["".concat(l,".").concat(f)]||m[f]||u[f]||i;return r?n.createElement(d,s(s({ref:t},p),{},{components:r})):n.createElement(d,s({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,s=new Array(i);s[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:o,s[1]=a;for(var c=2;c<i;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},22111:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return u}});var n=r(87462),o=r(63366),i=(r(67294),r(3905)),s=["components"],a={sidebar_label:"Install Metrics Server",sidebar_position:19,title:""},l="Why Install A Metrics Server ?",c={unversionedId:"howtos/install_metrics_server",id:"howtos/install_metrics_server",title:"",description:'If no metrics server is running on a cluster, the application "instances" (aka Pods) will',source:"@site/docs/howtos/install_metrics_server.md",sourceDirName:"howtos",slug:"/howtos/install_metrics_server",permalink:"/next/howtos/install_metrics_server",editUrl:"https://github.com/epinio/docs/docs/howtos/install_metrics_server.md",tags:[],version:"current",sidebarPosition:19,frontMatter:{sidebar_label:"Install Metrics Server",sidebar_position:19,title:""},sidebar:"docs",previous:{title:"Install Epinio on Public Clouds",permalink:"/next/howtos/install_epinio_on_public_cloud"},next:{title:"Install Wordpress with Epinio",permalink:"/next/howtos/install_wordpress_application"}},p={},u=[],m={toc:u};function f(e){var t=e.components,r=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"why-install-a-metrics-server-"},"Why Install A Metrics Server ?"),(0,i.kt)("p",null,'If no metrics server is running on a cluster, the application "instances" (aka Pods) will\nreport errors when trying to show metrics (RAM, CPU etc) via\n',(0,i.kt)("a",{parentName:"p",href:"/next/references/commands/cli/app/epinio_app_show"},"epinio app show")),(0,i.kt)("h1",{id:"install-a-metrics-server"},"Install A Metrics Server"),(0,i.kt)("p",null,"Please read and follow the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server"},"instructions")," for installing a metrics\nserver. They provide information about requirements, the various possible methods (plain\nyaml, helm chart, etc), and issues like configuration for high availability and security,\netc."),(0,i.kt)("p",null,"The most simple form of installation, execution of"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"kubectl apply -f ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"},"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"))),(0,i.kt)("p",null,"should be used only for simple environments."))}f.isMDXComponent=!0}}]);