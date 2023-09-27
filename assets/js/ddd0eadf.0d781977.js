"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[75460],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=l(t),m=a,h=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return t?r.createElement(h,s(s({ref:n},u),{},{components:t})):r.createElement(h,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<i;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},52706:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return c}});var r=t(83117),a=t(80102),i=(t(67294),t(3905)),s=["components"],o={sidebar_label:"Authorization",title:""},p="Authorization",l={unversionedId:"references/authorization",id:"version-0.8.0/references/authorization",title:"",description:"Since version 0.8.0 Epinio is shipped with an authorization layer recognizing two basic roles: admin and user.",source:"@site/versioned_docs/version-0.8.0/references/authorization.md",sourceDirName:"references",slug:"/references/authorization",permalink:"/0.8.0/references/authorization",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-0.8.0/references/authorization.md",tags:[],version:"0.8.0",frontMatter:{sidebar_label:"Authorization",title:""},sidebar:"docs",previous:{title:"Configurations",permalink:"/0.8.0/references/configurations"},next:{title:"API",permalink:"/0.8.0/references/api"}},u={},c=[{value:"Switch user",id:"switch-user",level:2},{value:"List the Epinio users",id:"list-the-epinio-users",level:2},{value:"Add a new user",id:"add-a-new-user",level:2},{value:"Assign namespaces",id:"assign-namespaces",level:2}],d={toc:c};function m(e){var n=e.components,t=(0,a.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"authorization"},"Authorization"),(0,i.kt)("p",null,"Since version ",(0,i.kt)("strong",{parentName:"p"},"0.8.0")," Epinio is shipped with an authorization layer recognizing two basic roles: ",(0,i.kt)("strong",{parentName:"p"},"admin")," and ",(0,i.kt)("strong",{parentName:"p"},"user"),".\nA user with the admin role will have access to every resource, while a standard user will have access only to the resources created on its namespaces.\nWhen a user creates a namespace, it will have automatically permission for it."),(0,i.kt)("p",null,"After the installation two users are available: ",(0,i.kt)("inlineCode",{parentName:"p"},"admin")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"epinio"),", both with the password ",(0,i.kt)("inlineCode",{parentName:"p"},"password"),"."),(0,i.kt)("h2",{id:"switch-user"},"Switch user"),(0,i.kt)("p",null,"To switch users you need to set the ",(0,i.kt)("inlineCode",{parentName:"p"},"user")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"pass")," keys of the Epinio settings file, located at ",(0,i.kt)("inlineCode",{parentName:"p"},"~/.config/epinio/settings.yaml")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'api: https://epinio.mydomain.com\nappchart: ""\ncerts: |\n  -----BEGIN CERTIFICATE-----\n  MIICUTCCAfigAwIBAgIQXJq3y/ouo90Db7BWy34gbDAKBggqhkjOPQQDAjAUMRIw\n  ****************************************************************\n  ****************************************************************\n  ****************************************************************\n  qCPZOyTsHKnjmj7zxg57+Kq2KLFT\n  -----END CERTIFICATE-----\ncolors: true\nnamespace: workspace\npass: password\nuser: epinio\nwss: wss://epinio.mydomain.com\n')),(0,i.kt)("h2",{id:"list-the-epinio-users"},"List the Epinio users"),(0,i.kt)("p",null,"An Epinio user is a BasicAuth Kubernetes Secret, with two reserved labels:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"epinio.suse.org/api-user-credentials")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"epinio.suse.org/role")," used to get the assigned role")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Secret\ntype: BasicAuth\nmetadata:\n  labels:\n    epinio.suse.org/api-user-credentials: "true"\n    epinio.suse.org/role: "admin"\n  name: my-epinio-user\n  namespace: epinio\nstringData:\n  username: myuser\n  password: mypassword\n')),(0,i.kt)("p",null,"To list the available users you can get the secrets from your cluster with ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl"),", filtering them with the proper labels:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# list all the users\nkubectl get secrets -n epinio -l 'epinio.suse.org/api-user-credentials'\nNAME                  TYPE        DATA   AGE\ndefault-epinio-user   BasicAuth   3      5m10s\nadmin-epinio-user     BasicAuth   2      5m10s\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# list all the admins\nkubectl get secrets -n epinio -l 'epinio.suse.org/api-user-credentials,epinio.suse.org/role=admin'\nNAME                TYPE        DATA   AGE\nadmin-epinio-user   BasicAuth   2      5m24s\n")),(0,i.kt)("h2",{id:"add-a-new-user"},"Add a new user"),(0,i.kt)("p",null,"Since a user is simply a Kubernetes Secret you can create a new user with a ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl apply"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'cat <<EOF | kubectl apply -f -\napiVersion: v1\nkind: Secret\ntype: BasicAuth\nmetadata:\n  labels:\n    epinio.suse.org/api-user-credentials: "true"\n    epinio.suse.org/role: "user"\n  name: my-epinio-user\n  namespace: epinio\nstringData:\n  username: myuser\n  password: mypassword\nEOF\n')),(0,i.kt)("h2",{id:"assign-namespaces"},"Assign namespaces"),(0,i.kt)("p",null,"The authorized user's namespaces are an additional ",(0,i.kt)("inlineCode",{parentName:"p"},"namespaces")," field in the Secret data, separated by a newline ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n"),".",(0,i.kt)("br",{parentName:"p"}),"\n","To modify them edit just that field:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'cat <<EOF | kubectl apply -f -\napiVersion: v1\nkind: Secret\ntype: BasicAuth\nmetadata:\n  labels:\n    epinio.suse.org/api-user-credentials: "true"\n    epinio.suse.org/role: "user"\n  name: my-epinio-user\n  namespace: epinio\nstringData:\n  username: myuser\n  password: mypassword\n  namespaces: |\n    workspace\n    workspace2\nEOF\n')))}m.isMDXComponent=!0}}]);