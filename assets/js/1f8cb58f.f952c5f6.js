"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[39192],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,f=c["".concat(l,".").concat(d)]||c[d]||m[d]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},20364:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return m}});var r=n(83117),a=n(80102),i=(n(67294),n(3905)),o=["components"],s={sidebar_label:"System requirements",title:"System requirements",description:"System requirements for the Epinio Kubernetes development environment.",keywords:["epinio","kubernetes","global system requirements","development environment"],"doc-type":["reference"],"doc-topic":["epinio/reference/sys-req"],"doc-persona":["epinio-developer","epinio-operator"]},l=void 0,u={unversionedId:"references/system_requirements/global",id:"version-1.11.0/references/system_requirements/global",title:"System requirements",description:"System requirements for the Epinio Kubernetes development environment.",source:"@site/versioned_docs/version-1.11.0/references/system_requirements/global.md",sourceDirName:"references/system_requirements",slug:"/references/system_requirements/global",permalink:"/references/system_requirements/global",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.11.0/references/system_requirements/global.md",tags:[],version:"1.11.0",frontMatter:{sidebar_label:"System requirements",title:"System requirements",description:"System requirements for the Epinio Kubernetes development environment.",keywords:["epinio","kubernetes","global system requirements","development environment"],"doc-type":["reference"],"doc-topic":["epinio/reference/sys-req"],"doc-persona":["epinio-developer","epinio-operator"]},sidebar:"docs",previous:{title:"Epinio's MinIO service",permalink:"/howtos/other/minio"},next:{title:"Windows",permalink:"/references/system_requirements/windows"}},p={},m=[{value:"General requirements",id:"general-requirements",level:2},{value:"General installation requirements",id:"general-installation-requirements",level:3},{value:"Kubernetes requirements",id:"kubernetes-requirements",level:2},{value:"Default IngressClass",id:"default-ingressclass",level:3},{value:"Default StorageClass",id:"default-storageclass",level:3}],c={toc:m};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"general-requirements"},"General requirements"),(0,i.kt)("p",null,"Consider these system requirements to be minimal.\nIt's almost certain that you'll need more resources for typical development and production workloads."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Component"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"OS/Kubernetes ",(0,i.kt)("sup",null,"1")),(0,i.kt)("td",{parentName:"tr",align:null},"Linux: ",(0,i.kt)("a",{parentName:"td",href:"/installation/other_inst_scenarios/install_epinio_on_rke"},"RKE2"),", ",(0,i.kt)("a",{parentName:"td",href:"/installation/other_inst_scenarios/install_epinio_on_k3s"},"K3s"),",   ",(0,i.kt)("a",{parentName:"td",href:"/installation/other_inst_scenarios/install_epinio_on_k3d"},"K3d"),", ",(0,i.kt)("a",{parentName:"td",href:"/installation/other_inst_scenarios/install_epinio_on_rancher_desktop"},"Rancher Desktop"),(0,i.kt)("br",null),"Windows, macOS: ",(0,i.kt)("a",{parentName:"td",href:"/installation/other_inst_scenarios/install_epinio_on_rancher_desktop"},"Rancher Desktop"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"CPU"),(0,i.kt)("td",{parentName:"tr",align:null},"2\u20134 vCPUs")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Memory"),(0,i.kt)("td",{parentName:"tr",align:null},"8 GB RAM (system memory + 4 GB)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Storage"),(0,i.kt)("td",{parentName:"tr",align:null},"10 GB Disk space (system disk + 5 GB)")))),(0,i.kt)("sup",null,"1")," Linux: x86_64, arm64 and s390x; macOS: x86_64, arm64 (Epinio CLI only); Windows: x86_64",(0,i.kt)("h3",{id:"general-installation-requirements"},"General installation requirements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An installed ",(0,i.kt)("a",{parentName:"li",href:"https://kubernetes.io/docs/tasks/tools/#kubectl"},"kubectl")," CLI tool with access to the Kubernetes cluster via configured ",(0,i.kt)("a",{parentName:"li",href:"https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#the-kubeconfig-environment-variable"},"kubeconfig")," file"),(0,i.kt)("li",{parentName:"ul"},"An installed ",(0,i.kt)("a",{parentName:"li",href:"https://helm.sh/docs/intro/install/"},"Helm")," CLI tool")),(0,i.kt)("h2",{id:"kubernetes-requirements"},"Kubernetes requirements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A Kubernetes cluster v1.20-v1.28"),(0,i.kt)("li",{parentName:"ul"},"An optional, but recommended, deployed ",(0,i.kt)("a",{parentName:"li",href:"https://cert-manager.io/docs/installation/helm/"},"cert-manager")," resources"),(0,i.kt)("li",{parentName:"ul"},"A deployed ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/kubernetes-sigs/metrics-server#installation"},"metrics-server")," resources"),(0,i.kt)("li",{parentName:"ul"},"A deployed Ingress Controller as ",(0,i.kt)("a",{parentName:"li",href:"https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart"},"Traefik"),"\nor ",(0,i.kt)("a",{parentName:"li",href:"https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/"},"nginx-ingress")," with ",(0,i.kt)("inlineCode",{parentName:"li"},"default")," IngressClass set"),(0,i.kt)("li",{parentName:"ul"},"A deployed Persistent Volume Provisioner as ",(0,i.kt)("a",{parentName:"li",href:"https://longhorn.io"},"Longhorn"),"\nor ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/rancher/local-path-provisioner"},"local-path")," providing a ",(0,i.kt)("inlineCode",{parentName:"li"},"default")," StorageClass.\nFor preference, use access mode ",(0,i.kt)("inlineCode",{parentName:"li"},"ReadWriteMany")," (RWX)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Optional"),". You need an external load-balancer solution in conjunction with an Ingress controller for exposing Epinio HTTP(S) workload on the Internet.\nMore information ",(0,i.kt)("a",{parentName:"li",href:"../../howtos/customization/provision_external_ip_for_local_kubernetes"},"here"),".")),(0,i.kt)("h3",{id:"default-ingressclass"},"Default IngressClass"),(0,i.kt)("p",null,"Although there are ingress controllers that can work without the definition of a ",(0,i.kt)("inlineCode",{parentName:"p"},"default")," IngressClass,\nit's recommended to use the default IngressClass, with the annotation ",(0,i.kt)("inlineCode",{parentName:"p"},'ingressclass.kubernetes.io/is-default-class: "true"'),"."),(0,i.kt)("h3",{id:"default-storageclass"},"Default StorageClass"),(0,i.kt)("p",null,"You will need a default StorageClass, with annotation ",(0,i.kt)("inlineCode",{parentName:"p"},'storageclass.kubernetes.io/is-default-class: "true"'),"."))}d.isMDXComponent=!0}}]);