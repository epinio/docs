"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[31094],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(r),f=o,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||i;return r?n.createElement(d,a(a({ref:t},p),{},{components:r})):n.createElement(d,a({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},66262:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return u}});var n=r(83117),o=r(80102),i=(r(67294),r(3905)),a=["components"],s={sidebar_label:"Installing A Metrics Server",sidebar_position:24,title:""},c="What is the need for a Metrics Server ?",l={unversionedId:"howtos/operations/install_metrics_server",id:"howtos/operations/install_metrics_server",title:"",description:'If no Metrics Server is running on a Kubernetes cluster, the application "instances" (aka',source:"@site/docs/howtos/operations/install_metrics_server.md",sourceDirName:"howtos/operations",slug:"/howtos/operations/install_metrics_server",permalink:"/next/howtos/operations/install_metrics_server",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/howtos/operations/install_metrics_server.md",tags:[],version:"current",sidebarPosition:24,frontMatter:{sidebar_label:"Installing A Metrics Server",sidebar_position:24,title:""},sidebar:"docs",previous:{title:"Contributing To Epinio",permalink:"/next/howtos/contribute"},next:{title:"AWS IAM integration",permalink:"/next/howtos/operations/aws_iam_integration"}},p={},u=[],m={toc:u};function f(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"what-is-the-need-for-a-metrics-server-"},"What is the need for a Metrics Server ?"),(0,i.kt)("p",null,'If no Metrics Server is running on a Kubernetes cluster, the application "instances" (aka\nPods) will report errors when it will try to show metrics (RAM, CPU etc) with the command\n',(0,i.kt)("a",{parentName:"p",href:"/next/references/commands/cli/app/epinio_app_show"},"epinio app show")),(0,i.kt)("h1",{id:"install-a-metrics-server"},"Install a Metrics Server"),(0,i.kt)("p",null,"Please read and follow the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server"},"instructions")," for installing a Metrics\nServer. You will get the information about the requirements, the various installation\nmethods (plain yaml, helm chart, etc), and guidance for additional configurations such as\nhigh availability and security."),(0,i.kt)("p",null,"As an example, here is the command to install a Metrics Server:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"kubectl apply -f ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"},"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"))),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This installation method should be used only for simple environments.")))}f.isMDXComponent=!0}}]);