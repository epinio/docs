"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[93526],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return h}});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(t),h=i,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||o;return t?r.createElement(m,a(a({ref:n},c),{},{components:t})):r.createElement(m,a({ref:n},c))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var p=2;p<o;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},71615:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var r=t(83117),i=t(80102),o=(t(67294),t(3905)),a=["components"],l={sidebar_label:"Installing Epinio On Rancher Desktop (local)",sidebar_position:18,title:""},s=void 0,p={unversionedId:"howtos/install_epinio_on_rancher_desktop",id:"version-1.8.1/howtos/install_epinio_on_rancher_desktop",title:"",description:"Rancher Desktop configuration",source:"@site/versioned_docs/version-1.8.1/howtos/install_epinio_on_rancher_desktop.md",sourceDirName:"howtos",slug:"/howtos/install_epinio_on_rancher_desktop",permalink:"/1.8.1/howtos/install_epinio_on_rancher_desktop",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.8.1/howtos/install_epinio_on_rancher_desktop.md",tags:[],version:"1.8.1",sidebarPosition:18,frontMatter:{sidebar_label:"Installing Epinio On Rancher Desktop (local)",sidebar_position:18,title:""},sidebar:"docs",previous:{title:"Installing Epinio On Rancher",permalink:"/1.8.1/howtos/install_epinio_on_rancher"},next:{title:"Installing Epinio On RKE2",permalink:"/1.8.1/howtos/install_epinio_on_rke"}},c={},u=[{value:"Rancher Desktop configuration",id:"rancher-desktop-configuration",level:2},{value:"Rancher Desktop Prerequisites",id:"rancher-desktop-prerequisites",level:2},{value:"Install Rancher Desktop",id:"install-rancher-desktop",level:3},{value:"Setup Kubernetes",id:"setup-kubernetes",level:2},{value:"Install epinio",id:"install-epinio",level:2}],d={toc:u};function h(e){var n=e.components,t=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"rancher-desktop-configuration"},"Rancher Desktop configuration"),(0,o.kt)("p",null,"This how-to was written using the following versions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/epinio/helm-charts/releases/tag/epinio-1.0.0"},"epinio helm chart 1.0.0")),(0,o.kt)("li",{parentName:"ul"},"Rancher desktop 1.4.1")),(0,o.kt)("h2",{id:"rancher-desktop-prerequisites"},"Rancher Desktop Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop."),(0,o.kt)("li",{parentName:"ul"},"Epinio currently only supports x86 and will not work with Rancher Desktop for Mac on the M1 chip.")),(0,o.kt)("h3",{id:"install-rancher-desktop"},"Install Rancher Desktop"),(0,o.kt)("p",null,"Install the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rancher-sandbox/rancher-desktop/releases"},"latest version")," of Rancher Desktop for your operating system."),(0,o.kt)("h2",{id:"setup-kubernetes"},"Setup Kubernetes"),(0,o.kt)("p",null,"When running Rancher Desktop for the first time, wait until the initialization is completed."),(0,o.kt)("p",null,"Make sure that Kubernetes is enabled and a supported version is selected under ",(0,o.kt)("inlineCode",{parentName:"p"},"Kubernetes Settings")," (Epinio has been tested on ",(0,o.kt)("strong",{parentName:"p"},"v1.22.7"),", ",(0,o.kt)("strong",{parentName:"p"},"v1.21.10")," and ",(0,o.kt)("strong",{parentName:"p"},"v1.20.15"),")."),(0,o.kt)("p",null,"Make sure that Traefik is enabled or you have otherwise installed a Ingress controller."),(0,o.kt)("h2",{id:"install-epinio"},"Install epinio"),(0,o.kt)("p",null,"Make sure Rancher Desktop is running."),(0,o.kt)("p",null,"Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.\nManual verification is possible by executing the command ",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl get pods -A")," in a terminal and checking that all pods report either ",(0,o.kt)("inlineCode",{parentName:"p"},"Running")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Completed")," as their status."),(0,o.kt)("p",null,"Rancher Desktop configures it's own load-balancer to expose Traefik on ",(0,o.kt)("inlineCode",{parentName:"p"},"127.0.0.1"),". We can use this with a wildcard DNS to get a system domain of ",(0,o.kt)("inlineCode",{parentName:"p"},"127.0.0.1.sslip.io")),(0,o.kt)("p",null,"The Epinio installation is pretty much identical on Linux, MacOS and Windows:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Start a shell, use ",(0,o.kt)("inlineCode",{parentName:"p"},"cmd")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"powershell")," on Windows (latest one is preferred) and your preferred one on Linux/MacOS.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install the ",(0,o.kt)("a",{parentName:"p",href:"/1.8.1/installation/install_epinio_cli"},"Epinio CLI"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Follow the ",(0,o.kt)("a",{parentName:"p",href:"/1.8.1/installation/install_epinio"},"Epinio installation process"),". Copied here:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"\nkubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.yaml  \n\n# Wait for cert-manager to stabilize\n\nhelm repo add epinio https://epinio.github.io/helm-charts\nhelm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io\n\nepinio login -u admin https://epinio.127.0.0.1.sslip.io\n\n")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"For RancherDesktop on Linux, in order to be able to open ports from ",(0,o.kt)("inlineCode",{parentName:"p"},"443")," (and above), in order to access the URL set in ",(0,o.kt)("inlineCode",{parentName:"p"},"global.domain")," (i.e. 127.0.0.1.sslip.io), you need to set the start port of the ",(0,o.kt)("inlineCode",{parentName:"p"},"unprivileged")," list to a lower number:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"\n# [Optional] Check the current unprivileged port start\nsysctl -n net.ipv4.ip_unprivileged_port_start\n\n# Temporary modification of the unprivileged port start\nsudo sysctl -w net.ipv4.ip_unprivileged_port_start=443\n\n# Permanent modification of the unprivileged port start\nsudo sh -c 'echo \"net.ipv4.ip_unprivileged_port_start=443\" >> /etc/sysctl.d/50-unprivileged-ports.conf'\n\n# [Optional] Check the current unprivileged port start\nsysctl -n net.ipv4.ip_unprivileged_port_start\n\n")),(0,o.kt)("p",{parentName:"admonition"},"You can find more information in this ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rancher-sandbox/rancher-desktop/issues/576"},"issue"),".")))}h.isMDXComponent=!0}}]);