"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[75774],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(t),m=i,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return t?a.createElement(h,r(r({ref:n},u),{},{components:t})):a.createElement(h,r({ref:n},u))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,r=new Array(o);r[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=t[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},61422:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return c}});var a=t(83117),i=t(80102),o=(t(67294),t(3905)),r=["components"],l={sidebar_label:"Install Epinio",sidebar_position:1,title:"Installing Epinio",description:"How to install Epinio",keywords:["epinio","kubernetes","k8s","installation","install"]},s=void 0,p={unversionedId:"installation/install_epinio",id:"version-1.10.0/installation/install_epinio",title:"Installing Epinio",description:"How to install Epinio",source:"@site/versioned_docs/version-1.10.0/installation/install_epinio.md",sourceDirName:"installation",slug:"/installation/install_epinio",permalink:"/1.10.0/installation/install_epinio",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/installation/install_epinio.md",tags:[],version:"1.10.0",sidebarPosition:1,frontMatter:{sidebar_label:"Install Epinio",sidebar_position:1,title:"Installing Epinio",description:"How to install Epinio",keywords:["epinio","kubernetes","k8s","installation","install"]},sidebar:"docs",previous:{title:"Introduction",permalink:"/1.10.0/"},next:{title:"Install the Epinio CLI",permalink:"/1.10.0/installation/install_epinio_cli"}},u={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Ingress Controller",id:"ingress-controller",level:3},{value:"Cert Manager",id:"cert-manager",level:3},{value:"Dynamic storage provisioner",id:"dynamic-storage-provisioner",level:3},{value:"Install Epinio",id:"install-epinio",level:3},{value:"Verify Helm Chart Images",id:"verify-helm-chart-images",level:3},{value:"Installation on Specific Kubernetes Offerings",id:"installation-on-specific-kubernetes-offerings",level:2},{value:"Internal Epinio components",id:"internal-epinio-components",level:2},{value:"Kubed",id:"kubed",level:3},{value:"S3 storage",id:"s3-storage",level:3},{value:"Dex",id:"dex",level:3},{value:"Container Registry",id:"container-registry",level:3}],d={toc:c};function m(e){var n=e.components,t=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Epinio is installed from a single Helm chart.\nThis also installs ",(0,o.kt)("a",{parentName:"p",href:"#kubed"},(0,o.kt)("inlineCode",{parentName:"a"},"Kubed")),", ",(0,o.kt)("a",{parentName:"p",href:"#s3-storage"},(0,o.kt)("inlineCode",{parentName:"a"},"MinIO")),", ",(0,o.kt)("a",{parentName:"p",href:"#dex"},(0,o.kt)("inlineCode",{parentName:"a"},"Dex"))," and a ",(0,o.kt)("a",{parentName:"p",href:"#container-registry"},"container registry"),' in your Kubernetes cluster.\nYou can disable the installation of these additional "sub" charts by changing the settings as described in their sections below.'),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/references/system_requirements/global"},"system requirements")," for dependencies your Kubernetes cluster requires for an Epinio installation."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("h3",{id:"ingress-controller"},"Ingress Controller"),(0,o.kt)("p",null,"During installation using ",(0,o.kt)("inlineCode",{parentName:"p"},"helm")," Epinio creates some Ingress resources for its internal components.\nThese components depend on a running ingress controller providing a default ",(0,o.kt)("inlineCode",{parentName:"p"},"IngressClass"),"."),(0,o.kt)("p",null,"You can install ",(0,o.kt)("inlineCode",{parentName:"p"},"nginx-ingress-controller")," using the ",(0,o.kt)("inlineCode",{parentName:"p"},"LoadBalancer")," service type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add nginx-stable https://helm.nginx.com/stable\nhelm repo update\nhelm upgrade --install nginx-ingress --namespace nginx-ingress nginx-stable/nginx-ingress \\\n    --set controller.setAsDefaultIngress=true \\\n    --create-namespace\n")),(0,o.kt)("p",null,"You can use Traefik instead of Nginx by following the official ",(0,o.kt)("a",{parentName:"p",href:"https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart"},"documentation"),"."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"You should verify if the service of the ingress controller you have just deployed has at least one ",(0,o.kt)("inlineCode",{parentName:"p"},"EXTERNAL-IP")," address assigned from the external load-balancer provider (such as AWS ELB or similar)."),(0,o.kt)("details",null,(0,o.kt)("summary",null,"How to verify your `EXTERNAL-IP` address"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl get svc nginx-ingress-controller --namespace nginx-ingress\n> NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP\n> nginx-ingress-controller   LoadBalancer   10.43.223.228   <pending>\n")),(0,o.kt)("p",{parentName:"admonition"},"If you have the ",(0,o.kt)("inlineCode",{parentName:"p"},"<pending>")," value in the ",(0,o.kt)("inlineCode",{parentName:"p"},"EXTERNAL-IP")," column you can try one of the following steps:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Enable the relevant cloud provider resources for your cluster"),(0,o.kt)("li",{parentName:"ul"},"Install the ",(0,o.kt)("a",{parentName:"li",href:"https://metallb.universe.tf"},"MetalLB")," load balancer into your cluster"),(0,o.kt)("li",{parentName:"ul"},"Append ",(0,o.kt)("inlineCode",{parentName:"li"},'--set "controller.service.externalIPs={<node1-ip>,<node2-ip>}"')," to the ",(0,o.kt)("inlineCode",{parentName:"li"},"helm upgrade --install")," command above, or perform ",(0,o.kt)("inlineCode",{parentName:"li"},"kubectl edit service nginx-ingress-controller -n nginx-ingress")," and add:",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"spec:\n  externalIPs:\n  - <node1-ip>\n  - <node2-ip>\n")))),(0,o.kt)("p",{parentName:"admonition"},"There is more about this in the ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.github.io/ingress-nginx/deploy/baremetal"},"NGINX documentation"),"."))),(0,o.kt)("h3",{id:"cert-manager"},"Cert Manager"),(0,o.kt)("p",null,"Epinio needs ",(0,o.kt)("a",{parentName:"p",href:"https://cert-manager.io/"},"cert-manager")," to create TLS\ncertificates for the various ingresses."),(0,o.kt)("p",null,"If you do not have cert-manager installed on the cluster, you can install it:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add jetstack https://charts.jetstack.io\nhelm repo update\nhelm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager  \\\n    --set installCRDs=true \\\n    --set extraArgs={--enable-certificate-owner-ref=true} \\\n    --create-namespace\n")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"If ",(0,o.kt)("inlineCode",{parentName:"p"},"cert-manager")," isn't installed in the namespace ",(0,o.kt)("inlineCode",{parentName:"p"},"cert-manager"),",\nyou have to set ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.certManagerNamespace")," to the namespace it is installed in.\nEpinio installation will fail without this as it will not know how to use ",(0,o.kt)("inlineCode",{parentName:"p"},"cert-manager"),".")),(0,o.kt)("h3",{id:"dynamic-storage-provisioner"},"Dynamic storage provisioner"),(0,o.kt)("p",null,"To support Epinio a storage provisioner is needed.\nYou can use any storage provisioner which provides ",(0,o.kt)("inlineCode",{parentName:"p"},"ReadWriteMany")," (RWX) Access Mode and a ",(0,o.kt)("strong",{parentName:"p"},"default StorageClass")," resource for dynamic storage provisioning."),(0,o.kt)("p",null,"To verify that your cluster provides a default StorageClass run the command ",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl get storageclass"),". The default StorageClass is marked with the string ",(0,o.kt)("inlineCode",{parentName:"p"},"(default)")," next to its name in the output list."),(0,o.kt)("p",null,"For example, you can deploy and configure the ",(0,o.kt)("inlineCode",{parentName:"p"},"local-path")," dynamic storage provisioner by:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml\nkubectl patch storageclass local-path -p \'{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}\'\n')),(0,o.kt)("h3",{id:"install-epinio"},"Install Epinio"),(0,o.kt)("p",null,"If the above dependencies are available or going to be installed by this chart,\nEpinio can be installed with the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add epinio https://epinio.github.io/helm-charts\nhelm repo update\nhelm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \\\n    --set global.domain=myepiniodomain.org\n")),(0,o.kt)("p",null,'Or you can install using "Let\'s Encrypt" certificates.'),(0,o.kt)("p",null,'To generate trusted TLS certificates with "Let\'s Encrypt" for your public domain set ',(0,o.kt)("inlineCode",{parentName:"p"},".Values.global.tlsIssuer")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"letsencrypt-production")," and the value for the ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.global.tlsIssuerEmail")," key to your e-mail address. Then:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add epinio https://epinio.github.io/helm-charts\nhelm repo update\n helm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \\\n    --set global.domain=myepiniodomain.org \\\n    --set global.tlsIssuer=letsencrypt-production \\\n    --set global.tlsIssuerEmail=user@company.org\n")),(0,o.kt)("p",null,"The only mandatory field is the ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.global.domain")," which should have the value of a wildcard ",(0,o.kt)("inlineCode",{parentName:"p"},"*.")," enabled domain.\nIt should point to the IP address of your running Ingress controller."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"To use a non-default IngressClass you need to specify it using ",(0,o.kt)("inlineCode",{parentName:"p"},"--set ingress.ingressClassName=<className>"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"If you receive ",(0,o.kt)("inlineCode",{parentName:"p"},"Entity Too Large")," errors when ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size"},"uploading")," application source code into Epinio, you need to increase the ",(0,o.kt)("inlineCode",{parentName:"p"},"proxy-body-size")," with ",(0,o.kt)("inlineCode",{parentName:"p"},"--set 'ingress.annotations.nginx\\.ingress\\.kubernetes\\.io/proxy-body-size=1000m'"))))),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Read more on how to setup DNS here: ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/installation/dns_setup"},"DNS setup"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},'If you\'re deploying Epinio in a "localhost" environment, you can use a ',(0,o.kt)("a",{parentName:"p",href:"/1.10.0/installation/wildcardDNS_setup"},"wildcard DNS service")," to ease setup.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"If installation fails due to an expired certificate then run ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio settings update-ca"),".  There is more information ",(0,o.kt)("a",{parentName:"p",href:"https://docs.epinio.io/references/commands/cli/settings/epinio_settings_update-ca#epinio-settings-update-ca"},"here"),".")))),(0,o.kt)("h3",{id:"verify-helm-chart-images"},"Verify Helm Chart Images"),(0,o.kt)("p",null,"This is done using the ",(0,o.kt)("inlineCode",{parentName:"p"},"cosign")," tool.\nThe following commands were tested using cosign version 2.1.1."),(0,o.kt)("p",null,"The three core Epinio images are ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio-server"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio-unpacker"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio-ui"),".\nThe command to verify any of them is"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'cosign verify \\\n       --certificate-identity-regexp "https://github.com/epinio/epinio" \\\n       --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \\\n       ghcr.io/epinio/<IMAGE>:v1.8.1\n')),(0,o.kt)("p",null,"where ",(0,o.kt)("inlineCode",{parentName:"p"},"<IMAGE>")," is the name of the image to verify."),(0,o.kt)("h2",{id:"installation-on-specific-kubernetes-offerings"},"Installation on Specific Kubernetes Offerings"),(0,o.kt)("p",null,"Installing Epinio, as described above, is a standard process, however you might need to configure it in a specific Kubernetes cluster."),(0,o.kt)("p",null,"To help you, see the following documents for some well-known clusters:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher"},"Install on Rancher")," \u2014 Install Epinio on Rancher"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_public_cloud"},"Install on Public Cloud")," \u2014 Install Epinio on Public Cloud cluster"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_rke"},"Install on RKE2")," \u2014 Install Epinio on Rancher RKE2 cluster"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_k3d"},"Install on K3d")," \u2014 Install Epinio on K3d cluster"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_k3s"},"Install on K3s")," \u2014 Install Epinio on K3s cluster"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_rancher_desktop"},"Install on Rancher Desktop")," \u2014 Install Epinio on Rancher Desktop"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_eks"},"Install on EKS")," \u2014 Install Epinio on AWS EKS cluster")),(0,o.kt)("p",null,"The Public Cloud ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/installation/other_inst_scenarios/install_epinio_on_public_cloud"},"installation")," describes the three major cloud providers but Epinio can run on any Kubernetes cluster."),(0,o.kt)("h2",{id:"internal-epinio-components"},"Internal Epinio components"),(0,o.kt)("h3",{id:"kubed"},"Kubed"),(0,o.kt)("p",null,"Kubed is installed as a subchart when ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.kubed.enabled")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," (default).\nIf you already have ",(0,o.kt)("inlineCode",{parentName:"p"},"kubed"),", you can skip installation by setting\nthe helm value ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.kubed.enabled")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("h3",{id:"s3-storage"},"S3 storage"),(0,o.kt)("p",null,"Epinio uses an S3 compatible storage to store the application source code.\nThis chart will install ",(0,o.kt)("a",{parentName:"p",href:"https://min.io/"},"Minio")," when ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.minio.enabled")," is\n",(0,o.kt)("inlineCode",{parentName:"p"},"true")," (default)."),(0,o.kt)("p",null,"In addition to Minio, Epinio offers ",(0,o.kt)("a",{parentName:"p",href:"https://s3gw.io/"},"s3gw")," as another S3 compatible store.\nIt is installed when ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.minio.enabled")," is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," and ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.s3gw.enabled")," is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"The s3gw support is ",(0,o.kt)("strong",{parentName:"p"},"experimental"),".\nThe s3gw chart is configured to use a ",(0,o.kt)("inlineCode",{parentName:"p"},"host path")," volume for storage.\nThis setup is risky, and not HA.\nIf there is an outage of the node where s3gw's pod is currently deployed, k8s will fail trying to assign the volume on another node.")),(0,o.kt)("p",null,"Both choices for internal S3 compatible storage can be configured to use a user-defined storageClass.\nIf no StorageClass is defined, the default storageClass is used.\nWhen using Minio set the custom storageClass to the value of ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.persistance.storageClass"),".\nWhen using s3gw set the custom storageClass to the value of ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.s3gw.storageClass.name"),"."),(0,o.kt)("p",null,"Use any external S3 compatible solution by setting ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.minio.enabled")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\n(",(0,o.kt)("inlineCode",{parentName:"p"},".Values.s3gw.enabled")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," by default) and using\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L44"},"the values under ",(0,o.kt)("inlineCode",{parentName:"a"},"s3")),"\nto point to the required S3 server."),(0,o.kt)("h3",{id:"dex"},"Dex"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://dexidp.io"},"Dex")," OpenID Connect Provider is installed as a subchart when ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.global.dex.enabled")," is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," (default)."),(0,o.kt)("p",null,"If you don't need to use an identity provider, set the value to ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," and use only local Epinio users. ",(0,o.kt)("a",{parentName:"p",href:"/1.10.0/references/authentication_oidc"},"OIDC Authentication")," has more information."),(0,o.kt)("h3",{id:"container-registry"},"Container Registry"),(0,o.kt)("p",null,"When Epinio builds a container image for an application from source, it needs\nto store that image in a container registry. Epinio installs a container registry\non the cluster when ",(0,o.kt)("inlineCode",{parentName:"p"},".Values.containerregistry.enabled")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," (default)."),(0,o.kt)("p",null,"Any container registry that supports basic auth authentication (e.g. gcr, dockerhub, etc) can be used\ninstead, by setting this value to ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," and using\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111"},"the relevant global values"),"\nto point to the desired container registry."))}m.isMDXComponent=!0}}]);