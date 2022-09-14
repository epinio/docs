"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[54777],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=c(n),f=o,m=d["".concat(p,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},59937:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return p},default:function(){return f},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var r=n(83117),o=n(80102),i=(n(67294),n(3905)),a=["components"],s={sidebar_label:"Port Forwarding",sidebar_position:8,title:""},p=void 0,c={unversionedId:"howtos/port_forwarding",id:"version-1.1.0/howtos/port_forwarding",title:"",description:"How to use Port Forwarding",source:"@site/versioned_docs/version-1.1.0/howtos/port_forwarding.md",sourceDirName:"howtos",slug:"/howtos/port_forwarding",permalink:"/1.1.0/howtos/port_forwarding",draft:!1,editUrl:"https://github.com/epinio/docs/versioned_docs/version-1.1.0/howtos/port_forwarding.md",tags:[],version:"1.1.0",sidebarPosition:8,frontMatter:{sidebar_label:"Port Forwarding",sidebar_position:8,title:""},sidebar:"docs",previous:{title:"Setting up routing secrets",permalink:"/1.1.0/howtos/setup_routing_secrets"},next:{title:"Custom Routes",permalink:"/1.1.0/howtos/custom_routes"}},l={},u=[{value:"How to use Port Forwarding",id:"how-to-use-port-forwarding",level:2},{value:"Point to a specific instance",id:"point-to-a-specific-instance",level:3}],d={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"how-to-use-port-forwarding"},"How to use Port Forwarding"),(0,i.kt)("p",null,"This how-to demonstrates how to use port forwarding to access a running application."),(0,i.kt)("p",null,"Port forwarding can be started with the ",(0,i.kt)("inlineCode",{parentName:"p"},"port-forward")," command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"epinio app port-forward samplejava 34506:8080\n")),(0,i.kt)("p",null,"This will forward the traffic coming from ",(0,i.kt)("inlineCode",{parentName:"p"},"localhost:34506")," to the remote ",(0,i.kt)("inlineCode",{parentName:"p"},":8080"),".\n",(0,i.kt)("strong",{parentName:"p"},"Note")," that specification of the local port is optional. When none is provided a random port will be selected."),(0,i.kt)("h3",{id:"point-to-a-specific-instance"},"Point to a specific instance"),(0,i.kt)("p",null,"Port forwarding can be directed to a specific instance of your app. To do this list all the instances of the application, pick the desired ID, and then use the ",(0,i.kt)("inlineCode",{parentName:"p"},"--instance")," flag to direct the port forwarding to that instance:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"-> % epinio app show samplejava\n\n\ud83d\udea2 Show application details\nNamespace: workspace\nApplication: samplejava\n\n\u2714\ufe0f  Details:\n|        KEY           |                    VALUE                    |\n|----------------------|---------------------------------------------|\n| Origin               | /home/user/sample                           |\n| Status               | 1/1                                         |\n| Username             | admin                                       |\n| StageId              | cac0d6fec92e0a1f                            |\n| Age                  | 2m50s                                       |\n| Active Routes        |                                             |\n|                      | samplejava.172.19.0.4.omg.howdoi.website    |\n| Desired Instances    |                                           1 |\n| Bound Configurations |                                             |\n| Environment          |                                             |\n\n\u2714\ufe0f  Instances: \n|            NAME             | READY |  MEMORY   | MILLICPUS | RESTARTS |  AGE  |\n|-----------------------------|-------|-----------|-----------|----------|-------|\n| samplejava-5f84c47f76-7mvv7 | true  | 214.0 MiB |         2 |        0 | 2m50s |\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"epinio app port-forward samplejava 34506:8080 --instance samplejava-5f84c47f76-7mvv7\n")))}f.isMDXComponent=!0}}]);