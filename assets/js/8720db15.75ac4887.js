"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[55820],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return t?r.createElement(h,o(o({ref:n},c),{},{components:t})):r.createElement(h,o({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},83150:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var r=t(83117),a=t(80102),i=(t(67294),t(3905)),o=["components"],s={sidebar_label:"Installing Epinio on RKE2",sidebar_position:19,title:"Installing Epinio on RKE2",description:"Installing Epinio with RKE2. The needed environment and prerequisites.",keywords:["epinio","k8s","kubernetes","rke2","installation"]},l=void 0,p={unversionedId:"installation/other_inst_scenarios/install_epinio_on_rke",id:"version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rke",title:"Installing Epinio on RKE2",description:"Installing Epinio with RKE2. The needed environment and prerequisites.",source:"@site/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rke.md",sourceDirName:"installation/other_inst_scenarios",slug:"/installation/other_inst_scenarios/install_epinio_on_rke",permalink:"/installation/other_inst_scenarios/install_epinio_on_rke",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/installation/other_inst_scenarios/install_epinio_on_rke.md",tags:[],version:"1.10.0",sidebarPosition:19,frontMatter:{sidebar_label:"Installing Epinio on RKE2",sidebar_position:19,title:"Installing Epinio on RKE2",description:"Installing Epinio with RKE2. The needed environment and prerequisites.",keywords:["epinio","k8s","kubernetes","rke2","installation"]},sidebar:"docs",previous:{title:"Installing Epinio on Rancher",permalink:"/installation/other_inst_scenarios/install_epinio_on_rancher"},next:{title:"Installing Epinio on a local K3s",permalink:"/installation/other_inst_scenarios/install_epinio_on_k3s"}},c={},u=[{value:"Install RKE2 Kubernetes cluster",id:"install-rke2",level:2},{value:"RKE2 cluster prerequisities",id:"rke2-cluster-prerequisities",level:2},{value:"Installation",id:"installation",level:2}],d={toc:u};function m(e){var n=e.components,t=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This guide will help you to deploy a suitable RKE2 Kubernetes cluster for Epinio.\nMore details for installing RKE2 can be found in the RKE2 ",(0,i.kt)("a",{parentName:"p",href:"https://docs.rke2.io/install/quickstart/"},"quickstart")," guide."),(0,i.kt)("h2",{id:"install-rke2"},"Install RKE2 Kubernetes cluster"),(0,i.kt)("p",null,"We're using a dedicated machine for the RKE2 server node.\nThe following steps are performed using the ",(0,i.kt)("inlineCode",{parentName:"p"},"root")," account on that machine."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Run the installer, start and enable the rke2-server systemd service."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl -sfL https://get.rke2.io | sh -\nsystemctl enable --now rke2-server.service\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Configure environment variables for operating the RKE2 cluster.\nExecute these commands. Then add them to ",(0,i.kt)("inlineCode",{parentName:"p"},"/root/.bashrc")," for persistence."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"export PATH=$PATH:/var/lib/rancher/rke2/bin:/opt/rke2/bin\nexport KUBECONFIG=/etc/rancher/rke2/rke2.yaml\n")))),(0,i.kt)("p",null,"Make sure that you can communicate with your new RKE2 cluster by running:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl get pods --all-namespaces\n")),(0,i.kt)("h2",{id:"rke2-cluster-prerequisities"},"RKE2 cluster prerequisities"),(0,i.kt)("p",null,"Perform the following steps on your RKE2 node before installing Epinio:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Install the helm CLI."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Configure rke2-ingress-nginx-controller.\nWhile the ",(0,i.kt)("inlineCode",{parentName:"p"},"rke2-ingress-nginx-controller")," cluster is installed by default on RKE2 clusters, we need to set the IngressClass ",(0,i.kt)("inlineCode",{parentName:"p"},"nginx")," up as the ",(0,i.kt)("inlineCode",{parentName:"p"},"default")," class.\nThis is done by running:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl patch ingressClass nginx -p \'{"metadata": {"annotations":{"ingressclass.kubernetes.io/is-default-class": "true"}}}\'\n')),(0,i.kt)("admonition",{parentName:"li",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"If required, you can specify a non-default IngressClass during the installation of Epinio with the helm argument ",(0,i.kt)("inlineCode",{parentName:"p"},"--set ingress.ingressClassName=<className>"),"."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Deploy a dynamic storage provisioner.\nRKE2 clusters have no storage provisioner installed by default.\nTo support Epinio a storage provisioner is needed.\nYou can use any storage provisioner which provides, ",(0,i.kt)("inlineCode",{parentName:"p"},"ReadWriteMany")," (RWX) Access Mode and a ",(0,i.kt)("strong",{parentName:"p"},"default StorageClass")," resource for dynamic storage provisioning."),(0,i.kt)("admonition",{parentName:"li",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"To verify that your cluster provides a default StorageClass run the command  ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl get storageclass"),". The default StorageClass is marked with the string ",(0,i.kt)("inlineCode",{parentName:"p"},"(default)")," next to its name in the output list.")),(0,i.kt)("p",{parentName:"li"},"As an example, you can deploy and configure a ",(0,i.kt)("inlineCode",{parentName:"p"},"local-path")," dynamic storage provisioner by running:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml\nkubectl patch storageclass local-path -p \'{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}\'\n')))),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"For evaluation environments we recommend that you setup Epinio Ingress resources with a wildcard DNS service such as ",(0,i.kt)("inlineCode",{parentName:"p"},"omg.howdoi.website"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"sslip.io"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"nip.io")," that points to the ",(0,i.kt)("inlineCode",{parentName:"p"},"INTERNAL-IP")," address of your kubernetes node."),(0,i.kt)("p",null,"For production environments you should configure an external load-balancer solution.\nIt should listen on a public IP with an associated public FQDN domain.\nThe load-balancer's role is to redirect HTTP(S) traffic, from the load-balancer endpoint to the internal Ingress resources of the kubernetes cluster."),(0,i.kt)("p",null,"There are two ways of installing DNS for Epinio:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/installation/wildcardDNS_setup"},"Wildcard DNS Service")),(0,i.kt)("p",{parentName:"li"},"For test environments.\nThis should work on any kubernetes distribution.\nEpinio will try to create a magic wildcard DNS domain, for example, ",(0,i.kt)("strong",{parentName:"p"},"10.0.0.1.omg.howdoi.website"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/installation/dns_setup"},"DNS setup")),(0,i.kt)("p",{parentName:"li"},"For test and production environments.\nYou'll define a system domain, for example, ",(0,i.kt)("strong",{parentName:"p"},"test.example.com"),"."))),(0,i.kt)("p",null,"Then continue with the ",(0,i.kt)("a",{parentName:"p",href:"/installation/install_epinio"},"Epinio installation process"),"."))}m.isMDXComponent=!0}}]);