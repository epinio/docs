"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[65698],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return f}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(t),f=a,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||o;return t?r.createElement(d,i(i({ref:n},l),{},{components:t})):r.createElement(d,i({ref:n},l))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},27935:function(e,n,t){t.r(n),t.d(n,{assets:function(){return l},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var r=t(83117),a=t(80102),o=(t(67294),t(3905)),i=["components"],s={sidebar_label:"Namespaces",title:""},c="Namespaces",p={unversionedId:"references/namespaces",id:"version-1.7.1/references/namespaces",title:"",description:"Epinio has the same concept of namespaces as the underlying Kubernetes, i.e.",source:"@site/versioned_docs/version-1.7.1/references/namespaces.md",sourceDirName:"references",slug:"/references/namespaces",permalink:"/references/namespaces",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.7.1/references/namespaces.md",tags:[],version:"1.7.1",frontMatter:{sidebar_label:"Namespaces",title:""},sidebar:"docs",previous:{title:"Application Manifests",permalink:"/references/manifests"},next:{title:"Services",permalink:"/references/services"}},l={},u=[],m={toc:u};function f(e){var n=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"namespaces"},"Namespaces"),(0,o.kt)("p",null,"Epinio has the same concept of namespaces as the underlying Kubernetes, i.e.\na means of grouping applications, configurations, and services into some kind\nof related sets."),(0,o.kt)("p",null,"In contrast to Kubernetes the Epinio client however maintains local state, the\n",(0,o.kt)("strong",{parentName:"p"},"current namespace"),", often also called the ",(0,o.kt)("strong",{parentName:"p"},"targeted namespace"),"."),(0,o.kt)("p",null,"Where users of Kubernetes's client (",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl"),") have to explicitly specify the\nnamespace to work with with each command, users of Epinio's client (",(0,o.kt)("inlineCode",{parentName:"p"},"epinio"),")\nhave one command to set and query the current namespace, and all other commands\nof the client use that namespace in their operation."),(0,o.kt)("p",null,"The relevant command is ",(0,o.kt)("a",{parentName:"p",href:"/references/commands/cli/epinio_target"},"epinio target"),"."),(0,o.kt)("p",null,"All other namespace management (creation, inspection, deletion) is done through\nthe ",(0,o.kt)("a",{parentName:"p",href:"/references/commands/cli/namespace/epinio_namespace"},"epinio namespace")," ensemble. "),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/next/tutorials/namespace-tutorial"},"namespace tutorial")," contains a full set of examples for working with namespaces."))}f.isMDXComponent=!0}}]);