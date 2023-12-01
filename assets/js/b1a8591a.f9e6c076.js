"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[87748],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return h}});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=i.createContext({}),p=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return i.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),h=r,m=d["".concat(l,".").concat(h)]||d[h]||u[h]||o;return t?i.createElement(m,a(a({ref:n},c),{},{components:t})):i.createElement(m,a({ref:n},c))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var p=2;p<o;p++)a[p]=t[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},763:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var i=t(83117),r=t(80102),o=(t(67294),t(3905)),a=["components"],s={sidebar_label:"Installing Epinio on Rancher Desktop (RD)",sidebar_position:1,title:"Installing Epinio on Rancher Desktop (RD)",description:"How to install Epinio using a local Rancher Desktop installation.",keywords:["epinio","kubernetes","rancher","rancher desktop"]},l=void 0,p={unversionedId:"installation/other_inst_scenarios/install_epinio_on_rancher_desktop",id:"version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher_desktop",title:"Installing Epinio on Rancher Desktop (RD)",description:"How to install Epinio using a local Rancher Desktop installation.",source:"@site/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md",sourceDirName:"installation/other_inst_scenarios",slug:"/installation/other_inst_scenarios/install_epinio_on_rancher_desktop",permalink:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher_desktop",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md",tags:[],version:"1.10.0",sidebarPosition:1,frontMatter:{sidebar_label:"Installing Epinio on Rancher Desktop (RD)",sidebar_position:1,title:"Installing Epinio on Rancher Desktop (RD)",description:"How to install Epinio using a local Rancher Desktop installation.",keywords:["epinio","kubernetes","rancher","rancher desktop"]},sidebar:"docs",previous:{title:"Uninstall Epinio",permalink:"/1.10.0/installation/uninstall_epinio"},next:{title:"Installing Epinio on Rancher",permalink:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher"}},c={},u=[{value:"Rancher Desktop prerequisites",id:"rancher-desktop-prerequisites",level:2},{value:"Install Rancher Desktop",id:"install-rancher-desktop",level:3},{value:"Setup Kubernetes",id:"setup-kubernetes",level:2},{value:"Install epinio",id:"install-epinio",level:2}],d={toc:u};function h(e){var n=e.components,t=(0,r.Z)(e,a);return(0,o.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This How-to uses the following versions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/epinio/helm-charts/releases/tag/epinio-1.0.0"},"epinio helm chart 1.0.0")),(0,o.kt)("li",{parentName:"ul"},"Rancher Desktop 1.4.1")),(0,o.kt)("h2",{id:"rancher-desktop-prerequisites"},"Rancher Desktop prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Running on Windows needs Windows Subsystem for Linux (WSL).\nIt's installed by RD as a prerequisite."),(0,o.kt)("li",{parentName:"ul"},"Epinio currently only supports x86 so won't work with RD for Mac on the M1 chip.")),(0,o.kt)("h3",{id:"install-rancher-desktop"},"Install Rancher Desktop"),(0,o.kt)("p",null,"Install the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rancher-sandbox/rancher-desktop/releases"},"latest version")," of RD for your operating system."),(0,o.kt)("h2",{id:"setup-kubernetes"},"Setup Kubernetes"),(0,o.kt)("p",null,"When running RD for the first time, wait until the initialization is complete. It may take some time to download and install the necessary components."),(0,o.kt)("p",null,"Check that Kubernetes is enabled in RD and a supported version is selected.\nLook under ",(0,o.kt)("inlineCode",{parentName:"p"},"Kubernetes Settings")," in RD (Epinio has been tested on ",(0,o.kt)("strong",{parentName:"p"},"v1.22.7"),", ",(0,o.kt)("strong",{parentName:"p"},"v1.21.10")," and ",(0,o.kt)("strong",{parentName:"p"},"v1.20.15"),")."),(0,o.kt)("p",null,"Ensure Traefik is enabled, or you are using a different Ingress controller."),(0,o.kt)("h2",{id:"install-epinio"},"Install epinio"),(0,o.kt)("p",null,"Make sure Rancher Desktop is running."),(0,o.kt)("p",null,"RD can report Kubernetes as running when some pods aren't ready yet.\nYou can check this by running the command ",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl get pods -A")," in a terminal session.\nCheck that all pods report either a ",(0,o.kt)("inlineCode",{parentName:"p"},"Running")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Completed")," status."),(0,o.kt)("p",null,"RD configures its own load-balancer which exposes Traefik on ",(0,o.kt)("inlineCode",{parentName:"p"},"127.0.0.1"),".\nUse this with a wildcard DNS to get a system domain of ",(0,o.kt)("inlineCode",{parentName:"p"},"127.0.0.1.sslip.io")),(0,o.kt)("p",null,"The Epinio installation is similar on Linux, macOS and Windows:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Start a shell. Use ",(0,o.kt)("inlineCode",{parentName:"p"},"cmd")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"powershell")," on Windows and your preferred shell on Linux/MacOS.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install the ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/installation/install_epinio_cli"},"Epinio CLI"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Follow the ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/installation/install_epinio"},"Epinio installation process"),". It uses:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.yaml\n\n# Wait for cert-manager to stabilize\n\nhelm repo add epinio https://epinio.github.io/helm-charts\nhelm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io\n\nepinio login -u admin https://epinio.127.0.0.1.sslip.io\n\n")),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"For RD on Linux, you need to be able to open ports from ",(0,o.kt)("inlineCode",{parentName:"p"},"80")," (and above).\nThis allows access to the URL set in ",(0,o.kt)("inlineCode",{parentName:"p"},"global.domain")," (that is, 127.0.0.1.sslip.io).\nYou need to set the start port of the ",(0,o.kt)("inlineCode",{parentName:"p"},"unprivileged")," list to a lower number."),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("a",{parentName:"p",href:"https://docs.rancherdesktop.io/getting-started/installation/#traefik-port-binding-access"},"RD installation")," needs ports open from 80 so:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"\n# [Optional] Check the current unprivileged port start\nsysctl -n net.ipv4.ip_unprivileged_port_start\n\n# Temporary modification of the unprivileged port start\nsudo sysctl -w net.ipv4.ip_unprivileged_port_start=80\n\n# Permanent modification of the unprivileged port start can be done\n# with something like this\nsudo sh -c 'echo \"net.ipv4.ip_unprivileged_port_start=80\" >> /etc/sysctl.d/50-unprivileged-ports.conf'\n\n# Check the current unprivileged port start\nsysctl -n net.ipv4.ip_unprivileged_port_start\n\n")),(0,o.kt)("p",{parentName:"admonition"},"You can find more information in this ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rancher-sandbox/rancher-desktop/issues/576"},"issue"),".")))))}h.isMDXComponent=!0}}]);