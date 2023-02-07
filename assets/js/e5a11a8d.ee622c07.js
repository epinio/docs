"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[26076],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=c(r),d=i,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,s=new Array(o);s[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var c=2;c<o;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5994:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return p}});var n=r(83117),i=r(80102),o=(r(67294),r(3905)),s=["components"],a={sidebar_label:"Installing A Metrics Server",sidebar_position:22,title:""},l="What is the need for a Metrics Server ?",c={unversionedId:"howtos/install_metrics_server",id:"version-1.6.2/howtos/install_metrics_server",title:"",description:'If no Metrics Server is running on a Kubernetes cluster, the application "instances" (aka',source:"@site/versioned_docs/version-1.6.2/howtos/install_metrics_server.md",sourceDirName:"howtos",slug:"/howtos/install_metrics_server",permalink:"/howtos/install_metrics_server",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.6.2/howtos/install_metrics_server.md",tags:[],version:"1.6.2",sidebarPosition:22,frontMatter:{sidebar_label:"Installing A Metrics Server",sidebar_position:22,title:""},sidebar:"docs",previous:{title:"Installing Epinio On Public Clouds",permalink:"/howtos/install_epinio_on_public_cloud"},next:{title:"How To Install Wordpress With Epinio",permalink:"/howtos/install_wordpress_application"}},u={},p=[],m={toc:p};function d(e){var t=e.components,r=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"what-is-the-need-for-a-metrics-server-"},"What is the need for a Metrics Server ?"),(0,o.kt)("p",null,'If no Metrics Server is running on a Kubernetes cluster, the application "instances" (aka\nPods) will report errors when it will try to show metrics (RAM, CPU etc) with the command\n',(0,o.kt)("a",{parentName:"p",href:"/references/commands/cli/app/epinio_app_show"},"epinio app show")),(0,o.kt)("h1",{id:"install-a-metrics-server"},"Install a Metrics Server"),(0,o.kt)("p",null,"Please read and follow the\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server"},"instructions")," for installing a Metrics\nServer. You will get the information about the requirements, the various installation\nmethods (plain yaml, helm chart, etc), and guidance for additional configurations such as\nhigh availability and security."),(0,o.kt)("p",null,"As an example, here is the command to install a Metrics Server:"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"kubectl apply -f ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"},"https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"))),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"This installation method should be used only for simple environments.")))}d.isMDXComponent=!0}}]);