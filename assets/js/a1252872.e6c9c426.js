"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[73406],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,g=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},64877:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u}});var r=n(83117),o=n(80102),a=(n(67294),n(3905)),i=["components"],p={sidebar_label:"Exporting applications to an OCI registry",sidebar_position:8,title:""},s=void 0,l={unversionedId:"howtos/customization/export_to_oci_registries",id:"version-1.10.0/howtos/customization/export_to_oci_registries",title:"",description:"Do not confuse this topic with external Epinio registries.",source:"@site/versioned_docs/version-1.10.0/howtos/customization/export_to_oci_registries.md",sourceDirName:"howtos/customization",slug:"/howtos/customization/export_to_oci_registries",permalink:"/1.10.0/howtos/customization/export_to_oci_registries",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/howtos/customization/export_to_oci_registries.md",tags:[],version:"1.10.0",sidebarPosition:8,frontMatter:{sidebar_label:"Exporting applications to an OCI registry",sidebar_position:8,title:""},sidebar:"docs",previous:{title:"Setting Up External S3 Storage",permalink:"/1.10.0/howtos/customization/setup_external_s3"},next:{title:"Setting Up An Export Destination Registry",permalink:"/1.10.0/howtos/customization/setup_export_registry"}},c={},u=[{value:"How to export applications to an OCI registry",id:"how-to-export-applications-to-an-oci-registry",level:2}],m={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Do not confuse this topic with external Epinio registries.\nThese are where Epinio stashes the images of staged applications for its own use.\nSee ",(0,a.kt)("a",{parentName:"p",href:"/1.10.0/howtos/customization/setup_external_registry"},"Setting Up An External Container Registry")," for more information."),(0,a.kt)("p",{parentName:"admonition"},"Export destination registries on the other hand are where a user saves active applications to for\npickup by and use with ",(0,a.kt)("inlineCode",{parentName:"p"},"helm")," and other kubernetes tools."),(0,a.kt)("p",{parentName:"admonition"},"It does not help that it is perfectly ok to configure the same registry both as external registry\nand as export target.")),(0,a.kt)("h2",{id:"how-to-export-applications-to-an-oci-registry"},"How to export applications to an OCI registry"),(0,a.kt)("p",null,"Invoke"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"epinio export-registries\n")),(0,a.kt)("p",null,"to see the list of valid destinations."),(0,a.kt)("p",null,"Then invoke"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"epinio app export --registry destination appname\n")),(0,a.kt)("p",null,"to perform the export."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Replace ",(0,a.kt)("inlineCode",{parentName:"p"},"destination")," with the name of the desired target.\nFurther replace ",(0,a.kt)("inlineCode",{parentName:"p"},"appname")," with the name of the application to export.")),(0,a.kt)("p",null,"As given above the command uses defaults for the names, versions, and tags of helm chart and\ncontainer image. These are:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Component"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Version/Tag"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Helm chart"),(0,a.kt)("td",{parentName:"tr",align:null},"(namespace)-(appname)-chart"),(0,a.kt)("td",{parentName:"tr",align:null},"0.0.0")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Container image"),(0,a.kt)("td",{parentName:"tr",align:null},"(namespace)-(appname)-image"),(0,a.kt)("td",{parentName:"tr",align:null},"(stageID)")))),(0,a.kt)("p",null,"Use the command ",(0,a.kt)("inlineCode",{parentName:"p"},"epinio app show (the-app-name)")," to see the stageID of the application."),(0,a.kt)("p",null,"All parts can be changed with the command flags"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--chart-name")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--chart-version")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--image-name")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--image-tag"))))}d.isMDXComponent=!0}}]);