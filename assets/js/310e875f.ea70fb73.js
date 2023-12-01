"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[26522],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=o,k=c["".concat(s,".").concat(u)]||c[u]||m[u]||i;return n?a.createElement(k,r(r({ref:t},d),{},{components:n})):a.createElement(k,r({ref:t},d))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var p=2;p<i;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},18347:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return m}});var a=n(83117),o=n(80102),i=(n(67294),n(3905)),r=["components"],l={sidebar_label:"DNS setup",sidebar_position:3,title:"DNS setup",description:"How to setup DNS for Epinio and associated issues.",keywords:["epinio","kubernetes","k8s","DNS"]},s=void 0,p={unversionedId:"installation/dns_setup",id:"version-1.10.0/installation/dns_setup",title:"DNS setup",description:"How to setup DNS for Epinio and associated issues.",source:"@site/versioned_docs/version-1.10.0/installation/dns_setup.md",sourceDirName:"installation",slug:"/installation/dns_setup",permalink:"/1.10.0/installation/dns_setup",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/installation/dns_setup.md",tags:[],version:"1.10.0",sidebarPosition:3,frontMatter:{sidebar_label:"DNS setup",sidebar_position:3,title:"DNS setup",description:"How to setup DNS for Epinio and associated issues.",keywords:["epinio","kubernetes","k8s","DNS"]},sidebar:"docs",previous:{title:"Install the Epinio CLI",permalink:"/1.10.0/installation/install_epinio_cli"},next:{title:"Wildcard DNS setup",permalink:"/1.10.0/installation/wildcardDNS_setup"}},d={},m=[{value:"Find the IP address of the ingress controller",id:"find-ip-for-ic",level:2},{value:"Configure your DNS",id:"config-dns",level:2},{value:"DNS configuration examples",id:"dns-configuration-examples",level:2},{value:"Amazon Route53 &amp; AWS EKS",id:"amazon-route53--aws-eks",level:3},{value:"<code>test.example.com</code>",id:"testexamplecom",level:5},{value:"<code>*.test.example.com</code>",id:"testexamplecom-1",level:5},{value:"Azure AKS and &quot;example-domain&quot;",id:"azure-aks-and-example-domain",level:3},{value:"<code>test.example.com</code>",id:"testexamplecom-2",level:5},{value:"<code>*.test.example.com</code>",id:"testexamplecom-3",level:5},{value:"Bind DNS",id:"bind-dns",level:3}],c={toc:m};function u(e){var t=e.components,n=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"During an ",(0,i.kt)("a",{parentName:"p",href:"/1.10.0/installation/install_epinio"},"Epinio installation"),',\nyou need to specify a "system" domain in the ',(0,i.kt)("inlineCode",{parentName:"p"},"global.domain")," helm field.\nYou use this field for access to:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"an Epinio API server"),(0,i.kt)("li",{parentName:"ul"},"an Epinio WebUI"),(0,i.kt)("li",{parentName:"ul"},"a dex (OpenID Connect Provider)"),(0,i.kt)("li",{parentName:"ul"},"create default routes for the deployed applications.")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"global.domain")," field must be a wildcard domain.\nSo, any subdomain should resolve to the same IP address as the domain itself.\nThat domain IP address, should target your cluster's Ingress controller (for example, Traefik)"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Epinio will install successfully even if your DNS setup is not complete.\nAn exception is when the Lets Encrypt certificate issuer is used.\nIn this case, ",(0,i.kt)("inlineCode",{parentName:"p"},"cert-manager")," will fail to create certificates. When the domain becomes accessible certificates can be created.\nYou can read more about certificate issuers ",(0,i.kt)("a",{parentName:"p",href:"/1.10.0/howtos/other/certificate_issuers"},"here"),".\nEpinio will work after the DNS setup is correct and the domain becomes available.")),(0,i.kt)("p",null,"For simplicity finish your DNS setup before installing Epinio.\nYou need to point your desired domain to the IP address of your Ingress controller.\nThe two steps in the process are described in these sections:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#find-ip-for-ic"},"Find")," the IP address of the ingress controller"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#config-dns"},"Configure")," your DNS")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"For development or demo environments, an easy ",(0,i.kt)("a",{parentName:"p",href:"/1.10.0/installation/wildcardDNS_setup"},"wildcard")," DNS setup can be used.")),(0,i.kt)("h2",{id:"find-ip-for-ic"},"Find the IP address of the ingress controller"),(0,i.kt)("p",null,'Most Kubernetes clusters run a "load balancer" service.\nIt assigns IP addresses to load balanced services created on the cluster.\nIngress controllers are such services (for example, Traefik). They work only if they have an external accessible IP address.'),(0,i.kt)("p",null,"You can find the load balancer IP address of any service using ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl"),". For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get svc -n kube-system traefik -o jsonpath={@.status.loadBalancer.ingress}\n")),(0,i.kt)("p",null,"will return output containing:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"[map[ip:172.18.0.4]]\n")),(0,i.kt)("p",null,"You use the IP field in the next step to configure your DNS."),(0,i.kt)("h2",{id:"config-dns"},"Configure your DNS"),(0,i.kt)("p",null,"If you own the domain ",(0,i.kt)("inlineCode",{parentName:"p"},"example.com"),", you configure a subdomain, for example, ",(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com")," for Epinio.\nYou can now configure your DNS so that any request for ",(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com")," resolves to the address you got in the previous section."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'test.example.com => "INGRESS-IP"')),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'*.test.example.com => "INGRESS-IP"'))),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The setup of a wildcard entry is important. It allows automatic routing for applications to work in Epinio.")),(0,i.kt)("p",null,"We have some DNS configuration examples in the next section"),(0,i.kt)("h2",{id:"dns-configuration-examples"},"DNS configuration examples"),(0,i.kt)("h3",{id:"amazon-route53--aws-eks"},"Amazon Route53 & AWS EKS"),(0,i.kt)("p",null,"We will use the ",(0,i.kt)("a",{parentName:"p",href:"https://aws.amazon.com/route53/"},"Amazon Route53"),' to create a wildcard domain within an existing "Hosted zone", like ',(0,i.kt)("inlineCode",{parentName:"p"},"example.com"),"."),(0,i.kt)("p",null,"If an Epinio ingress installation has provided you with the following hostname:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'Traefik Ingress info: [{"hostname":"abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com"}]\n')),(0,i.kt)("p",null,"That hostname is in a AWS format.\nBelow, for brevity, we will use the hostname ",(0,i.kt)("inlineCode",{parentName:"p"},"abcd.aws.com"),"."),(0,i.kt)("p",null,"You need to add two ",(0,i.kt)("inlineCode",{parentName:"p"},"CNAME"),' records, for the subdomain and the wildcard. So, "test" for ',(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"*.test.example.com")," for the wildcard."),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"abcd.aws.com")," with your EKS FQDN, and ",(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com")," with your custom domain."),(0,i.kt)("h5",{id:"testexamplecom"},(0,i.kt)("inlineCode",{parentName:"h5"},"test.example.com")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"Record name: test\nRecord type: CNAME - Routes traffic to another domain name and some AWS resources\nValue: abcd.aws.com\n")),(0,i.kt)("h5",{id:"testexamplecom-1"},(0,i.kt)("inlineCode",{parentName:"h5"},"*.test.example.com")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"Record name: *.test\nRecord type: CNAME - Routes traffic to another domain name and some AWS resources\nValue: abcd.aws.com\n")),(0,i.kt)("p",null,"Now, the commands:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"host test.example.com\n")),(0,i.kt)("p",null,"or"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"> host epinio.test.example.com\n")),(0,i.kt)("p",null,"should resolve to something like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"abcd.aws.com\n")),(0,i.kt)("h3",{id:"azure-aks-and-example-domain"},'Azure AKS and "example-domain"'),(0,i.kt)("p",null,"For this example we use the Azure resource group ",(0,i.kt)("inlineCode",{parentName:"p"},"example-domain"),", with the zone ",(0,i.kt)("inlineCode",{parentName:"p"},"example.com"),"."),(0,i.kt)("p",null,"If the Epinio Ingress installation provides you with the following hostname:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'Traefik Ingress info: [{"ip":"10.0.0.1"}]\n')),(0,i.kt)("p",null,'You need to add two A records, for the subdomain and wildcard.\nSo, "test" to have ',(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"*.test.example.com")," added to the DNS zone ",(0,i.kt)("inlineCode",{parentName:"p"},"example.com"),'.\nReplace "10.0.0.1" with the IP from "Traefik Ingress info", and "test.example.com" with your custom domain.'),(0,i.kt)("h5",{id:"testexamplecom-2"},(0,i.kt)("inlineCode",{parentName:"h5"},"test.example.com")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"Record name: test.example.com\nRecord type: A\nIP address: 10.0.0.1\n")),(0,i.kt)("h5",{id:"testexamplecom-3"},(0,i.kt)("inlineCode",{parentName:"h5"},"*.test.example.com")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"Record name: *.test.example.com\nRecord type: A\nIP address: 10.0.0.1\n")),(0,i.kt)("p",null,"Now, running:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"host test.example.com\n")),(0,i.kt)("p",null,"or"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"host epinio.test.example.com\n")),(0,i.kt)("p",null,"should resolve to ",(0,i.kt)("inlineCode",{parentName:"p"},"10.0.0.1"),"."),(0,i.kt)("h3",{id:"bind-dns"},"Bind DNS"),(0,i.kt)("p",null,"If an Epinio ingress installation has provided you with the following hostname:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'Traefik Ingress info: [{"ip":"10.0.0.1"}]\n')),(0,i.kt)("p",null,'You need to add two A records, for the subdomain and wildcard, so "test" to have ',(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"*.test.example.com")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"/var/lib/named/master/forward/example.com"),".\nThis path will differ depending on distribution.\nReplace ",(0,i.kt)("inlineCode",{parentName:"p"},"10.0.0.1"),' with the IP address from "Traefik Ingress info", and ',(0,i.kt)("inlineCode",{parentName:"p"},"test.example.com")," with your custom domain."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ORIGIN example.com.\ntest        A   10.0.0.1\n$ORIGIN test.example.com.\n*           A   10.0.0.1\n")),(0,i.kt)("p",null,"Restart bind and verify that these commands resolve to ",(0,i.kt)("inlineCode",{parentName:"p"},"10.0.0.1"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"host test.example.com\n")),(0,i.kt)("p",null,"or"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"host epinio.test.example.com\n")))}u.isMDXComponent=!0}}]);