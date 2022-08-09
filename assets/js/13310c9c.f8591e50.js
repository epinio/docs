"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[43505],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,m=d["".concat(l,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},78561:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return c}});var r=n(83117),o=n(80102),a=(n(67294),n(3905)),i=["components"],p={sidebar_label:"Debug application",sidebar_position:2,title:""},l=void 0,s={unversionedId:"howtos/debug",id:"version-1.0.0/howtos/debug",title:"",description:"How to debug an app",source:"@site/versioned_docs/version-1.0.0/howtos/debug.md",sourceDirName:"howtos",slug:"/howtos/debug",permalink:"/1.0.0/howtos/debug",draft:!1,editUrl:"https://github.com/epinio/docs/versioned_docs/version-1.0.0/howtos/debug.md",tags:[],version:"1.0.0",sidebarPosition:2,frontMatter:{sidebar_label:"Debug application",sidebar_position:2,title:""},sidebar:"docs",previous:{title:"Certificate Issuers",permalink:"/1.0.0/howtos/certificate_issuers"},next:{title:"Provision external IP address for local Kubernetes",permalink:"/1.0.0/howtos/provision_external_ip_for_local_kubernetes"}},u={},c=[{value:"How to debug an app",id:"how-to-debug-an-app",level:2},{value:"Java",id:"java",level:3},{value:"Node",id:"node",level:3}],d={toc:c};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"how-to-debug-an-app"},"How to debug an app"),(0,a.kt)("p",null,"This how-to demonstrates how to debug a running application."),(0,a.kt)("h3",{id:"java"},"Java"),(0,a.kt)("p",null,"To debug a Java application you have to set the ",(0,a.kt)("a",{parentName:"p",href:"https://paketo.io/docs/howto/java/#enable-remote-debugging"},(0,a.kt)("inlineCode",{parentName:"a"},"BPL_DEBUG_ENABLED"))," environment variable to ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),".",(0,a.kt)("br",{parentName:"p"}),"\n","This is done with the epinio cli ",(0,a.kt)("inlineCode",{parentName:"p"},"app env set")," command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"epinio app env set samplejava BPL_DEBUG_ENABLED true\n")),(0,a.kt)("p",null,"After the application has restarted (to integrate the change of the environment) use ",(0,a.kt)("a",{parentName:"p",href:"/1.0.0/howtos/port_forwarding"},"port forwarding")," to attach the debugger. It runs by default on the port ",(0,a.kt)("inlineCode",{parentName:"p"},"8000"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"epinio app port-forward sample 8000:8000\n")),(0,a.kt)("p",null,"This will forward the traffic coming from ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost:8000")," to the remote ",(0,a.kt)("inlineCode",{parentName:"p"},":8000"),"."),(0,a.kt)("h3",{id:"node"},"Node"),(0,a.kt)("p",null,"To debug a Node application you will have to start the application with the ",(0,a.kt)("inlineCode",{parentName:"p"},"--inspect")," flag. Your ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")," has to be similar to:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "nodejs-sample-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node --inspect index.js"\n  }\n}\n')),(0,a.kt)("p",null,"After the application has been deployed use ",(0,a.kt)("a",{parentName:"p",href:"/1.0.0/howtos/port_forwarding"},"port forwarding")," to attach the debugger. It runs by default on the port ",(0,a.kt)("inlineCode",{parentName:"p"},"9229"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"epinio app port-forward sample 9229:9229\n")),(0,a.kt)("p",null,"This will forward the traffic coming from ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost:9229")," to the remote ",(0,a.kt)("inlineCode",{parentName:"p"},":9229"),"."))}f.isMDXComponent=!0}}]);