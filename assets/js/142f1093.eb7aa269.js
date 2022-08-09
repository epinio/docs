"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[22364],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return f}});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(t),f=o,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||i;return t?r.createElement(m,a(a({ref:n},p),{},{components:t})):r.createElement(m,a({ref:n},p))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},54713:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return u}});var r=t(83117),o=t(80102),i=(t(67294),t(3905)),a=["components"],l={sidebar_label:"Provision external IP address for local Kubernetes"},s=void 0,c={unversionedId:"howtos/provision_external_ip_for_local_kubernetes",id:"version-0.6.2/howtos/provision_external_ip_for_local_kubernetes",title:"provision_external_ip_for_local_kubernetes",description:"Provision of External IP for LoadBalancer service type in Kubernetes",source:"@site/versioned_docs/version-0.6.2/howtos/provision_external_ip_for_local_kubernetes.md",sourceDirName:"howtos",slug:"/howtos/provision_external_ip_for_local_kubernetes",permalink:"/0.6.2/howtos/provision_external_ip_for_local_kubernetes",draft:!1,editUrl:"https://github.com/epinio/docs/versioned_docs/version-0.6.2/howtos/provision_external_ip_for_local_kubernetes.md",tags:[],version:"0.6.2",frontMatter:{sidebar_label:"Provision external IP address for local Kubernetes"},sidebar:"docs",previous:{title:"Debug application",permalink:"/0.6.2/howtos/debug"},next:{title:"Push with gitjob",permalink:"/0.6.2/howtos/gitjob_push"}},p={},u=[{value:"Provision of External IP for LoadBalancer service type in Kubernetes",id:"provision-of-external-ip-for-loadbalancer-service-type-in-kubernetes",level:2},{value:"K3s/K3d",id:"k3sk3d",level:3},{value:"Minikube",id:"minikube",level:3},{value:"Kind",id:"kind",level:3},{value:"MicroK8s",id:"microk8s",level:3},{value:"Digital Ocean",id:"digital-ocean",level:3}],d={toc:u};function f(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"provision-of-external-ip-for-loadbalancer-service-type-in-kubernetes"},"Provision of External IP for LoadBalancer service type in Kubernetes"),(0,i.kt)("p",null,"Some local kubernetes platforms do not have the ability to provide external IP address when you create a kubernetes service with ",(0,i.kt)("inlineCode",{parentName:"p"},"LoadBalancer")," service type. The following steps will enable this ability for different local kubernetes platforms. Follow these steps before installing epinio."),(0,i.kt)("h3",{id:"k3sk3d"},"K3s/K3d"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Provision of LoadBalancer IP is enabled by default in K3s/K3d.")),(0,i.kt)("h3",{id:"minikube"},"Minikube"),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/0.6.2/howtos/install_epinio_on_minikube"},"Install Epinio on Minikube")," on how to\nconfigure minikube."),(0,i.kt)("h3",{id:"kind"},"Kind"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Install JQ from ",(0,i.kt)("a",{parentName:"p",href:"https://stedolan.github.io/jq/download/"},"https://stedolan.github.io/jq/download/"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Install and configure MetalLB "))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/namespace.yaml\nkubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/metallb.yaml\nkubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"\n\nSUBNET_IP=`docker network inspect kind | jq -r \'.[0].IPAM.Config[0].Gateway\'`\n## Use the last few IP addresses\nIP_ARRAY=(${SUBNET_IP//./ })\nSUBNET_IP="${IP_ARRAY[0]}.${IP_ARRAY[1]}.255.255"\n\ncat <<EOF | kubectl apply -f -\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  namespace: metallb-system\n  name: config\ndata:\n  config: |\n    address-pools:\n    - name: default\n      protocol: layer2\n      addresses:\n      - ${SUBNET_IP}/28\nEOF\n')),(0,i.kt)("h3",{id:"microk8s"},"MicroK8s"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Install and configure MetalLB")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"INTERFACE=`ip route | grep default | awk '{print $5}'`\nIP=`ifconfig $INTERFACE | sed -n '2 p' | awk '{print $2}'`\nmicrok8s enable metallb:${IP}/16\n")),(0,i.kt)("h3",{id:"digital-ocean"},"Digital Ocean"),(0,i.kt)("p",null,"When installing Epinio on Rancher-provisioned RKE2 or RKE1\nclusters on Digital Ocean, you might see this error message:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"error installing Epinio:\ntimed out waiting for LoadBalancer IP on traefik service\nEnsure your kubernetes platform has the ability to provision a LoadBalancer IP address.\n")),(0,i.kt)("p",null,"In this case you need to configure RKE/RKE2 with an external cloud\nprovider as ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/digitalocean/digitalocean-cloud-controller-manager"},"this one"),"."))}f.isMDXComponent=!0}}]);