"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[8361],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=u(n),m=i,h=c["".concat(l,".").concat(m)]||c[m]||p[m]||o;return n?r.createElement(h,a(a({ref:t},d),{},{components:n})):r.createElement(h,a({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},35949:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return p}});var r=n(83117),i=n(80102),o=(n(67294),n(3905)),a=["components"],s={sidebar_label:"Wildcard DNS setup",sidebar_position:4,title:""},l="Wildcard DNS setup",u={unversionedId:"installation/wildcardDNS_setup",id:"version-1.8.1/installation/wildcardDNS_setup",title:"",description:'A working system domain is needed for Epinio to work, as explained in the "DNS setup" page.',source:"@site/versioned_docs/version-1.8.1/installation/wildcardDNS_setup.md",sourceDirName:"installation",slug:"/installation/wildcardDNS_setup",permalink:"/installation/wildcardDNS_setup",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.8.1/installation/wildcardDNS_setup.md",tags:[],version:"1.8.1",sidebarPosition:4,frontMatter:{sidebar_label:"Wildcard DNS setup",sidebar_position:4,title:""},sidebar:"docs",previous:{title:"DNS setup",permalink:"/installation/dns_setup"},next:{title:"Uninstall Epinio",permalink:"/installation/uninstall_epinio"}},d={},p=[{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"DNS Rebind Protection",id:"dns-rebind-protection",level:3},{value:"Cluster running in a VM",id:"cluster-running-in-a-vm",level:3}],c={toc:p};function m(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"wildcard-dns-setup"},"Wildcard DNS setup"),(0,o.kt)("p",null,"A working system domain is needed for Epinio to work, as explained in the ",(0,o.kt)("a",{parentName:"p",href:"/installation/dns_setup"},'"DNS setup" page'),'.\nThis is a step that takes some time and needs you to own a domain which you can use. If you are just trying out Epinio, you can use a "magic" wildcard domain to get running faster.'),(0,o.kt)("p",null,'By "magic" we mean a domain that will always resolve to the IP address that is part of the domain itself. There are various free\nservices online that do that:'),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"omg.howdoi.website"),(0,o.kt)("li",{parentName:"ul"},"sslip.io"),(0,o.kt)("li",{parentName:"ul"},"nip.io")),(0,o.kt)("p",null,"The way they work is better shown with some examples. All the following domains\nresolve to ",(0,o.kt)("inlineCode",{parentName:"p"},"127.0.0.1"),":"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"127.0.0.1.omg.howdoi.website")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"subdomain.127.0.0.1.omg.howdoi.website")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"subsub.subdomain.127.0.0.1.omg.howdoi.website"))),(0,o.kt)("p",null,"This allows us to use a domain like that as a wildcard system domain for Epinio."),(0,o.kt)("p",null,"Follow the instructions on the ",(0,o.kt)("a",{parentName:"p",href:"/installation/dns_setup#ingress-controller-ip-address"},'"DNS setup" page')," to find the IP address of your ingress controller.\nThen use that IP address to construct a domain with one of the above services.\nPass that as ",(0,o.kt)("inlineCode",{parentName:"p"},"global.domain")," value when installing Epinio."),(0,o.kt)("p",null,"This should work for as long as the IP address is still valid, pointing to the ingress controller service."),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("h3",{id:"dns-rebind-protection"},"DNS Rebind Protection"),(0,o.kt)("p",null,"Some routers filter queries where the answer consists of IP addresses from the private range, like ",(0,o.kt)("strong",{parentName:"p"},"10.0.0.1"),"."),(0,o.kt)("p",null,"This stops a malicious website from probing the local network for hosts."),(0,o.kt)("p",null,"Amongst those routers is the AVM FRITZBox and everything that uses ",(0,o.kt)("a",{parentName:"p",href:"https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html"},"dnsmasq")," with ",(0,o.kt)("inlineCode",{parentName:"p"},"stop-dns-rebind"),", like ",(0,o.kt)("a",{parentName:"p",href:"https://docs.netgate.com/pfsense/en/latest/services/dns/rebinding.html"},"pfSense")," or NetworkManager."),(0,o.kt)("p",null,"If you still want to use the default magic DNS, you'll have to whitelist ",(0,o.kt)("inlineCode",{parentName:"p"},"omg.howdoi.website")," in your local DNS server."),(0,o.kt)("h3",{id:"cluster-running-in-a-vm"},"Cluster running in a VM"),(0,o.kt)("p",null,"Sometimes the IP address of the ingress controller may not be accessible by your browser and thus you may need to set the domain to another IP. This is the case for example when you run a Kubernetes cluster with docker (e.g. ",(0,o.kt)("a",{parentName:"p",href:"https://k3d.io/"},"k3d")," or ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/kind"},"kind"),") inside a VM (for example when using docker on Mac). Then the IP address assigned to the ingress controller is the IP address of the docker container but that is not accessible from your host. You will need to bind the container's ports ",(0,o.kt)("inlineCode",{parentName:"p"},"80")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"443")," to the VMs ports ",(0,o.kt)("inlineCode",{parentName:"p"},"80")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"443"),' and then use the VMs IP address when constructing the "magic" domain.'))}m.isMDXComponent=!0}}]);