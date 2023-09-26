"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[16658],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return k}});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),k=o,f=d["".concat(s,".").concat(k)]||d[k]||p[k]||r;return n?i.createElement(f,a(a({ref:t},u),{},{components:n})):i.createElement(f,a({ref:t},u))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<r;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},36647:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var i=n(83117),o=n(80102),r=(n(67294),n(3905)),a=["components"],l={sidebar_label:"Installing Epinio on a local K3d",sidebar_position:21,title:"Installing Epinio on a local K3d",description:"How to install Epinio on a locally hosted K3d system.",keywords:["kubernetes","k3d","epinio","installation"]},s=void 0,c={unversionedId:"installation/other_inst_scenarios/install_epinio_on_k3d",id:"version-1.10.0/installation/other_inst_scenarios/install_epinio_on_k3d",title:"Installing Epinio on a local K3d",description:"How to install Epinio on a locally hosted K3d system.",source:"@site/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_k3d.md",sourceDirName:"installation/other_inst_scenarios",slug:"/installation/other_inst_scenarios/install_epinio_on_k3d",permalink:"/installation/other_inst_scenarios/install_epinio_on_k3d",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_k3d.md",tags:[],version:"1.10.0",sidebarPosition:21,frontMatter:{sidebar_label:"Installing Epinio on a local K3d",sidebar_position:21,title:"Installing Epinio on a local K3d",description:"How to install Epinio on a locally hosted K3d system.",keywords:["kubernetes","k3d","epinio","installation"]},sidebar:"docs",previous:{title:"Installing Epinio on a local K3s",permalink:"/installation/other_inst_scenarios/install_epinio_on_k3s"},next:{title:"Installing Epinio on public clouds",permalink:"/installation/other_inst_scenarios/install_epinio_on_public_cloud"}},u={},p=[{value:"Install a K3d Kubernetes cluster",id:"install-a-k3d-kubernetes-cluster",level:2},{value:"Create a K3d Kubernetes cluster",id:"create-a-k3d-kubernetes-cluster",level:3},{value:"Create a K3d Kubernetes cluster inside a VM",id:"create-a-k3d-kubernetes-cluster-inside-a-vm",level:3},{value:"Install Epinio on the cluster",id:"install-epinio-on-the-cluster",level:3},{value:"Troubleshooting",id:"troubleshooting",level:3},{value:"Kubeconfig",id:"kubeconfig",level:4},{value:"Traefik",id:"traefik",level:4}],d={toc:p};function k(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This How-to uses these versions:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1"},"epinio helm chart 0.7.1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://k3d.io/"},"k3d")," version v5.3.0")),(0,r.kt)("h2",{id:"install-a-k3d-kubernetes-cluster"},"Install a K3d Kubernetes cluster"),(0,r.kt)("p",null,"Follow the ",(0,r.kt)("a",{parentName:"p",href:"https://k3d.io/"},"K3d instructions")," to install K3d on your system."),(0,r.kt)("h3",{id:"create-a-k3d-kubernetes-cluster"},"Create a K3d Kubernetes cluster"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ k3d cluster create epinio\n")),(0,r.kt)("h3",{id:"create-a-k3d-kubernetes-cluster-inside-a-vm"},"Create a K3d Kubernetes cluster inside a VM"),(0,r.kt)("p",null,"Epinio needs to connect to pods inside the cluster.\nThe default installation uses the internal docker IP for this.\nIf docker is running in a VM, for example,\nwith Docker Desktop, that IP won't be reachable."),(0,r.kt)("p",null,"As a workaround, use the IP of the host instead, together with port-forwardings:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"k3d cluster create epinio -p '80:80@loadbalancer' -p '443:443@loadbalancer'\n")),(0,r.kt)("p",null,"After this, ",(0,r.kt)("inlineCode",{parentName:"p"},"kubectl")," should be talking to your new cluster:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ kubectl get nodes\nNAME                  STATUS   ROLES                  AGE   VERSION\nk3d-epinio-server-0   Ready    control-plane,master   38s   v1.22.6+k3s1\n")),(0,r.kt)("h3",{id:"install-epinio-on-the-cluster"},"Install Epinio on the cluster"),(0,r.kt)("p",null,"Follow ",(0,r.kt)("a",{parentName:"p",href:"/installation/wildcardDNS_setup"},"wildcard DNS setup")," to define the domain name you want to use for Epinio."),(0,r.kt)("p",null,"Then, continue with the ",(0,r.kt)("a",{parentName:"p",href:"/installation/install_epinio"},"Epinio installation process"),"."),(0,r.kt)("h3",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("h4",{id:"kubeconfig"},"Kubeconfig"),(0,r.kt)("p",null,"To get ",(0,r.kt)("inlineCode",{parentName:"p"},"kubeconfig")," to access the cluster:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"k3d kubeconfig get epinio\n")),(0,r.kt)("h4",{id:"traefik"},"Traefik"),(0,r.kt)("p",null,"In case of issues with Epinio's Traefik component or Ingress controllers, refer to the ",(0,r.kt)("a",{parentName:"p",href:"/explanations/advanced#traefik"},"Traefik")," section in the\n",(0,r.kt)("a",{parentName:"p",href:"/explanations/advanced"},"Advanced Topics")," document."))}k.isMDXComponent=!0}}]);