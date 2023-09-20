"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[66474],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return k}});var i=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(t),k=o,m=d["".concat(s,".").concat(k)]||d[k]||u[k]||r;return t?i.createElement(m,a(a({ref:n},c),{},{components:t})):i.createElement(m,a({ref:n},c))}));function k(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,a=new Array(r);a[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<r;p++)a[p]=t[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},88583:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var i=t(83117),o=t(80102),r=(t(67294),t(3905)),a=["components"],l={sidebar_label:"Installing Epinio on a local K3s",sidebar_position:20,title:"Installing Epinio on a local K3s",description:"Information about installing Epinio on a local K3s cluster.",keywords:["kubernetes","epinio","k3s"]},s=void 0,p={unversionedId:"installation/other_inst_scenarios/install_epinio_on_k3s",id:"installation/other_inst_scenarios/install_epinio_on_k3s",title:"Installing Epinio on a local K3s",description:"Information about installing Epinio on a local K3s cluster.",source:"@site/docs/installation/other_inst_scenarios/install_epinio_on_k3s.md",sourceDirName:"installation/other_inst_scenarios",slug:"/installation/other_inst_scenarios/install_epinio_on_k3s",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_k3s",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/installation/other_inst_scenarios/install_epinio_on_k3s.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Installing Epinio on a local K3s",sidebar_position:20,title:"Installing Epinio on a local K3s",description:"Information about installing Epinio on a local K3s cluster.",keywords:["kubernetes","epinio","k3s"]},sidebar:"docs",previous:{title:"Installing Epinio on RKE2",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_rke"},next:{title:"Installing Epinio On K3d (local)",permalink:"/next/installation/other_inst_scenarios/install_epinio_on_k3d"}},c={},u=[{value:"Install a K3s cluster",id:"install-a-k3s-cluster",level:2},{value:"Install Epinio on the K3s cluster",id:"install-epinio-on-the-k3s-cluster",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"DNS Issues",id:"dns-issues",level:3},{value:"Traefik",id:"traefik",level:3}],d={toc:u};function k(e){var n=e.components,t=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This How-to was written with these versions:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1"},"epinio helm chart 0.7.1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://k3s.io/"},"k3s")," version v1.23.4+k3s1 and v1.22.7+k3s1"),(0,r.kt)("li",{parentName:"ul"},"openSUSE Leap 15.3 and Tumbleweed")),(0,r.kt)("h2",{id:"install-a-k3s-cluster"},"Install a K3s cluster"),(0,r.kt)("p",null,"Follow the ",(0,r.kt)("a",{parentName:"p",href:"https://k3s.io/"},"K3s instructions")," to install K3s."),(0,r.kt)("h2",{id:"install-epinio-on-the-k3s-cluster"},"Install Epinio on the K3s cluster"),(0,r.kt)("p",null,"Export the K3s cluster configuration file in the ",(0,r.kt)("inlineCode",{parentName:"p"},"KUBECONFIG")," environment variable:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"export KUBECONFIG=/etc/rancher/k3s/k3s.yaml\n")),(0,r.kt)("p",null,"Follow the ",(0,r.kt)("a",{parentName:"p",href:"../../installation/wildcardDNS_setup"},"wildcard DNS setup")," to install DNS for Epinio in your environment."),(0,r.kt)("p",null,"You find the ",(0,r.kt)("inlineCode",{parentName:"p"},"<IP>")," address with the next command. Example output is shown:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl get svc -n kube-system traefik -o jsonpath="{.status.loadBalancer.ingress[0]}" | jq .\n{\n  "ip": "192.168.5.15"\n}\n')),(0,r.kt)("p",null,"Then, continue with the ",(0,r.kt)("a",{parentName:"p",href:"/next/installation/install_epinio"},"Epinio installation process"),"."),(0,r.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("h3",{id:"dns-issues"},"DNS Issues"),(0,r.kt)("p",null,"If you experience issues with DNS resolution, if, for example, you have something like this in your logs:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"dial tcp: lookup epinio-registry.192.168.1.10.omg.howdoi.website on 10.43.0.10:53: no such host\n")),(0,r.kt)("p",null,"You can try to install K3s with this known-to-work DNS server:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"curl -sfL https://get.k3s.io | K3S_RESOLV_CONF=/etc/my-good-resolv.conf sh -\n")),(0,r.kt)("p",null,"With ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/my-good-resolv.conf")," containing:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"nameserver 1.1.1.1\n")),(0,r.kt)("p",null,"This issue may happen with multiple DNS servers and some can't resolve some domain names."),(0,r.kt)("h3",{id:"traefik"},"Traefik"),(0,r.kt)("p",null,"In case of trouble with Epinio's Traefik component refer to the ",(0,r.kt)("a",{parentName:"p",href:"/next/explanations/advanced#traefik"},"Traefik")," section in the ",(0,r.kt)("a",{parentName:"p",href:"/next/explanations/advanced"},"Advanced Topics")," document."))}k.isMDXComponent=!0}}]);