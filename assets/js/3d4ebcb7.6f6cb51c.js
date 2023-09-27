"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[38849],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return d}});var i=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},h=i.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=p(t),d=o,m=h["".concat(s,".").concat(d)]||h[d]||u[d]||r;return t?i.createElement(m,a(a({ref:n},c),{},{components:t})):i.createElement(m,a({ref:n},c))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,a=new Array(r);a[0]=h;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<r;p++)a[p]=t[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}h.displayName="MDXCreateElement"},60883:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var i=t(83117),o=t(80102),r=(t(67294),t(3905)),a=["components"],l={sidebar_label:"Installing Epinio on Rancher",sidebar_position:17,title:"Installing Epinio on Rancher",description:"How to install Epinio on Rancher",keywords:["epinio","kubernetes","rancher"]},s=void 0,p={unversionedId:"installation/other_inst_scenarios/install_epinio_on_rancher",id:"installation/other_inst_scenarios/install_epinio_on_rancher",title:"Installing Epinio on Rancher",description:"How to install Epinio on Rancher",source:"@site/docs/installation/other_inst_scenarios/install_epinio_on_rancher.md",sourceDirName:"installation/other_inst_scenarios",slug:"/installation/other_inst_scenarios/install_epinio_on_rancher",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_rancher",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/installation/other_inst_scenarios/install_epinio_on_rancher.md",tags:[],version:"current",sidebarPosition:17,frontMatter:{sidebar_label:"Installing Epinio on Rancher",sidebar_position:17,title:"Installing Epinio on Rancher",description:"How to install Epinio on Rancher",keywords:["epinio","kubernetes","rancher"]},sidebar:"docs",previous:{title:"Installing Epinio on Rancher Desktop (RD)",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_rancher_desktop"},next:{title:"Installing Epinio on RKE2",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_rke"}},c={},u=[{value:"Kubernetes cluster",id:"kubernetes-cluster",level:2},{value:"Epinio Prerequisites",id:"epinio-prerequisites",level:2},{value:"Install an Ingress controller",id:"install-an-ingress-controller",level:3},{value:"Install Epinio",id:"install-epinio",level:2},{value:"Access the Epinio menu",id:"access-the-epinio-menu",level:2}],h={toc:u};function d(e){var n=e.components,t=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},h,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Before installing Epinio you need a running Rancher instance.\nYou can follow the Rancher ",(0,r.kt)("a",{parentName:"p",href:"https://rancher.com/docs"},"installation guides")," to set one up."),(0,r.kt)("p",null,"This How-to uses:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/epinio/helm-charts/releases/tag/epinio-1.7.1"},"epinio helm chart 1.7.1")),(0,r.kt)("li",{parentName:"ul"},"Rancher 2.7.1")),(0,r.kt)("h2",{id:"kubernetes-cluster"},"Kubernetes cluster"),(0,r.kt)("p",null,"You can deploy a new cluster or import an existing one into Rancher.\nThe steps for either method are in the Rancher ",(0,r.kt)("a",{parentName:"p",href:"https://ranchermanager.docs.rancher.com/pages-for-subheaders/kubernetes-clusters-in-rancher-setup"},"documentation"),"."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"For development it's possible to deploy Epinio on the same node as Rancher.\nIt is not a supported configuration, so there may be issues.")),(0,r.kt)("h2",{id:"epinio-prerequisites"},"Epinio Prerequisites"),(0,r.kt)("h3",{id:"install-an-ingress-controller"},"Install an Ingress controller"),(0,r.kt)("p",null,"If there's no Ingress controller running yet on the cluster, you need to install one.\nWe use Traefik in the example below."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"If using the Rancher dashboard there already will be an Ingress controller installed. This will be due to the installation process for Rancher.")),(0,r.kt)("p",null,"Go to ",(0,r.kt)("inlineCode",{parentName:"p"},"Apps")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Repositories")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Create")," in the Rancher dashboard."),(0,r.kt)("p",null,"Give a name to the repo and use ",(0,r.kt)("inlineCode",{parentName:"p"},"https://helm.traefik.io/traefik")," as the index URL."),(0,r.kt)("p",null,"Then go to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Charts")," menu and install the ",(0,r.kt)("inlineCode",{parentName:"p"},"traefik")," chart."),(0,r.kt)("p",null,"You'll see a screen where you can edit the Traefik Helm YAML file.\nNow make sure to set the following settings:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"ingressClass.enabled: true\ningressClass.isDefaultClass: true\nports.web.redirectTo: websecure\nservice.spec.loadBalancerIP: # Set this to the IP of your load balancer\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"/next/installation/install_epinio#ingress-controller"},"Install Epinio")," page has more details."),(0,r.kt)("h2",{id:"install-epinio"},"Install Epinio"),(0,r.kt)("p",null,"In the Rancher Dashboard, go to the cluster on where you want to install Epinio."),(0,r.kt)("p",null,"Add the Epinio Helm repo in ",(0,r.kt)("inlineCode",{parentName:"p"},"Apps")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Repositories")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Create")),(0,r.kt)("p",null,"Give a name to the repo and use ",(0,r.kt)("inlineCode",{parentName:"p"},"https://epinio.github.io/helm-charts")," as the index URL."),(0,r.kt)("p",null,'Once done, go to the "Charts" menu and install the ',(0,r.kt)("inlineCode",{parentName:"p"},"epinio")," chart."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"While you can select any version, it's best to use the latest one.")),(0,r.kt)("p",null,"Click install in the top right corner."),(0,r.kt)("p",null,"On the next screen, you can select a namespace for the deployment.\nYou also have to set a name for the deployment."),(0,r.kt)("p",null,"The following screen is to configure Epinio as needed."),(0,r.kt)("p",null,"The most important setting is ",(0,r.kt)("inlineCode",{parentName:"p"},"Domain"),", explained ",(0,r.kt)("a",{parentName:"p",href:"/next/installation/dns_setup"},"here")," in DNS setup."),(0,r.kt)("p",null,"When everything is configured, click on the install button.\nWait until the installation is complete.\nFollow the instructions given by the Helm install command output."),(0,r.kt)("h2",{id:"access-the-epinio-menu"},"Access the Epinio menu"),(0,r.kt)("p",null,"There are several ways to access Epinio from the Rancher dashboard menu."),(0,r.kt)("p",null,"The first is going to ",(0,r.kt)("inlineCode",{parentName:"p"},"Networking")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Ingresses")," and select the target URL preceding ",(0,r.kt)("inlineCode",{parentName:"p"},"epinio-ui"),"."),(0,r.kt)("p",null,"You also access Epinio by clicking on ",(0,r.kt)("inlineCode",{parentName:"p"},"Workloads")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"Deployments"),".\nOn the right panel displayed click on ",(0,r.kt)("inlineCode",{parentName:"p"},"epinio-server:installed_version"),".\nNow select the tab ",(0,r.kt)("inlineCode",{parentName:"p"},"Ingreses")," and then the target URL preceding ",(0,r.kt)("inlineCode",{parentName:"p"},"epinio-ui"),"."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"If you use an untrusted certificate, when selecting the URL, you need to accept the security exception.\nThen use the refresh button below the page title.\nNow the state is available and you access the instance by clicking on its name.")),(0,r.kt)("p",null,"Once using your Epinio instance, you can deploy and delete:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"applications"),(0,r.kt)("li",{parentName:"ul"},"namespaces"),(0,r.kt)("li",{parentName:"ul"},"configurations.")))}d.isMDXComponent=!0}}]);