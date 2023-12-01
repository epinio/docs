"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[29427],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(t),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return t?r.createElement(f,o(o({ref:n},c),{},{components:t})):r.createElement(f,o({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},20396:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d}});var r=t(83117),a=t(80102),i=(t(67294),t(3905)),o=["components"],s={sidebar_label:"Cert Manager",title:""},l="Cert Manager",p={unversionedId:"references/cert-manager",id:"version-1.11.0/references/cert-manager",title:"",description:"Purpose",source:"@site/versioned_docs/version-1.11.0/references/cert-manager.md",sourceDirName:"references",slug:"/references/cert-manager",permalink:"/references/cert-manager",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.11.0/references/cert-manager.md",tags:[],version:"1.11.0",frontMatter:{sidebar_label:"Cert Manager",title:""},sidebar:"docs",previous:{title:"Authorization",permalink:"/references/authorization"},next:{title:"Configurations",permalink:"/references/configurations"}},c={},d=[{value:"Purpose",id:"purpose",level:2},{value:"Installation",id:"installation",level:2},{value:"Version",id:"version",level:2},{value:"Advanced - Epinio without Cert manager",id:"advanced---epinio-without-cert-manager",level:2},{value:"Certificate creation",id:"certificate-creation",level:3},{value:"Generate root CA key and certificate",id:"generate-root-ca-key-and-certificate",level:4},{value:"Create private key, CSR and signed certificate",id:"create-private-key-csr-and-signed-certificate",level:4},{value:"Applications",id:"applications",level:3}],u={toc:d};function m(e){var n=e.components,t=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"cert-manager"},"Cert Manager"),(0,i.kt)("h2",{id:"purpose"},"Purpose"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"https://cert-manager.io/"},"Cert Manager")," is a component watching for kubernetes\nCertificate resources and generating Secrets holding the requested certificate data. It\ncan be configured with a variety of issuers for fulfilling these requests. One such\nissuer is ",(0,i.kt)("a",{parentName:"p",href:"https://letsencrypt.org/"},"Let's Encrypt"),"."),(0,i.kt)("p",null,"Epinio uses it to generate the internal certificates used to secure the communication\nbetween its components, as well as for the certificates used to secure the application\nIngresses."),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"The Cert Manager is a recommended dependency of Epinio, and not installed by it.\nIn other words, Epinio works best when it has Cert Manager available to it on the cluster, when it\nis installed."),(0,i.kt)("h2",{id:"version"},"Version"),(0,i.kt)("p",null,"Epinio development uses Cert Manager version 1.8.2.  For details of this version see the\n",(0,i.kt)("a",{parentName:"p",href:"https://cert-manager.io/docs/installation/supported-releases/"},"releases"),"."),(0,i.kt)("h2",{id:"advanced---epinio-without-cert-manager"},"Advanced - Epinio without Cert manager"),(0,i.kt)("p",null,"When Cert Manager (CM) is not installed installation of Epinio is still possible.\nIt however requires more work on the part of the operator."),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"--set certManager.enabled=false")," to tell Epinio's helm chart that CM is not available."),(0,i.kt)("p",null,"Without CM various certificate-holding Secrets normally created automatically via Certificate\nresources have to be provided by the operator instead."),(0,i.kt)("p",null,"The associated chart variables to ",(0,i.kt)("inlineCode",{parentName:"p"},"--set")," are\n",(0,i.kt)("inlineCode",{parentName:"p"},"certManager.<placeholder>.cert"),",\n",(0,i.kt)("inlineCode",{parentName:"p"},"certManager.<placeholder>.key"),", and\n",(0,i.kt)("inlineCode",{parentName:"p"},"certManager.<placeholder>.ca"),"."),(0,i.kt)("p",null,"The recognized values for the ",(0,i.kt)("inlineCode",{parentName:"p"},"placeholder")," above are\n",(0,i.kt)("inlineCode",{parentName:"p"},"dex"),",\n",(0,i.kt)("inlineCode",{parentName:"p"},"epinio"),",\n",(0,i.kt)("inlineCode",{parentName:"p"},"registry"),",\n",(0,i.kt)("inlineCode",{parentName:"p"},"s3"),", and\n",(0,i.kt)("inlineCode",{parentName:"p"},"ui"),"."),(0,i.kt)("p",null,"Both ",(0,i.kt)("inlineCode",{parentName:"p"},"dex")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ui")," are optional, even when these components are enabled.\nThe Epinio chart then falls back to the data for ",(0,i.kt)("inlineCode",{parentName:"p"},"epinio"),".\nThe information is ignored when the ",(0,i.kt)("inlineCode",{parentName:"p"},"dex")," and/or ",(0,i.kt)("inlineCode",{parentName:"p"},"ui")," components are disabled."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"s3")," information applies to whichever internal S3-compatible store is configured when installing\nEpinio, i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"minio")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"s3gw"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"s3")," information is not applied when Epinio is configured to use\nan external S3 store."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The certificates for ",(0,i.kt)("inlineCode",{parentName:"p"},"epinio")," (including workloads) and ",(0,i.kt)("inlineCode",{parentName:"p"},"dex")," are served through public domains and\nare permitted to use wildcard domains (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"*.1.2.3.4.nip.io"),") in their ",(0,i.kt)("inlineCode",{parentName:"p"},"CN"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"SAN")," fields."),(0,i.kt)("p",{parentName:"admonition"},"The certificates for ",(0,i.kt)("inlineCode",{parentName:"p"},"registry")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"s3"),'(minio) are inter-cluster "private" domains\n(',(0,i.kt)("inlineCode",{parentName:"p"},"registry.<ns>.svc.cluster.local")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"minio.<ns>.svc.cluster.local"),").\nThe placeholder ",(0,i.kt)("inlineCode",{parentName:"p"},"<ns>")," refers to the namespace Epinio is installed in.")),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"When used with Minio the ",(0,i.kt)("inlineCode",{parentName:"p"},"s3")," certificate cannot use wildcard domains in its ",(0,i.kt)("inlineCode",{parentName:"p"},"CN"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"SAN")," fields.")),(0,i.kt)("p",null,"The TLS keys/CSRs/certs can be created manually, see the guide below.\nAdjust the ",(0,i.kt)("inlineCode",{parentName:"p"},"Subj"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"CN"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"SAN")," values according to the local requirements."),(0,i.kt)("h3",{id:"certificate-creation"},"Certificate creation"),(0,i.kt)("h4",{id:"generate-root-ca-key-and-certificate"},"Generate root CA key and certificate"),(0,i.kt)("p",null,"Create and enter a directory for your files:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir certs\ncd certs\n")),(0,i.kt)("p",null,"Create the root CA private key:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"openssl genrsa -out CA.key 2048\n")),(0,i.kt)("p",null,"Create the root CA certificate:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'openssl req -x509 -new -nodes \\\n    -subj "/C=DE/ST=Germany/L=Nurnberg/O=SUSE/OU=Epinio/CN=SUSE CA cert/emailAddress=epinio@suse.com" \\\n    -key CA.key \\\n    -sha256 \\\n    -days 3650 \\\n    -out CA.pem\n')),(0,i.kt)("h4",{id:"create-private-key-csr-and-signed-certificate"},"Create private key, CSR and signed certificate"),(0,i.kt)("p",null,"Create the private key for your domain:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"openssl genrsa -out domain.key 2048\n")),(0,i.kt)("p",null,"Create a CSR request (The ",(0,i.kt)("inlineCode",{parentName:"p"},"CN")," field contains your domain):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'openssl req -new \\\n    -subj "/C=DE/ST=Germany/L=Nurnberg/O=SUSE/OU=Epinio/CN=registry.suse.dev/emailAddress=epinio@suse.com" \\\n    -key domain.key \\\n    -out domain.csr\n')),(0,i.kt)("p",null,"Create an extra openssl configuration for additional ",(0,i.kt)("inlineCode",{parentName:"p"},"SAN")," entries, if any."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cat > domain.ext <<EOF\nauthorityKeyIdentifier=keyid,issuer\nbasicConstraints=CA:FALSE\nkeyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment\nsubjectAltName = @alt_names\n\n[alt_names]\nDNS.1 = registry.suse.dev\nEOF\n")),(0,i.kt)("p",null,"Create the signed registry certificate from CSR, CA and the extra configuration, if present:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"openssl x509 -req -in registry.csr -CA CA.pem -CAkey CA.key \\\n    -CAcreateserial -out registry.pem -days 3650 -sha256 -extfile registry.ext\n")),(0,i.kt)("p",null,"Verify the new certificate's ",(0,i.kt)("inlineCode",{parentName:"p"},"SAN")," field."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"openssl x509 -in registry.pem -text | grep -A1 'Subject Alternative Name'\n>             X509v3 Subject Alternative Name: \n>                DNS:registry.suse.dev\n")),(0,i.kt)("h3",{id:"applications"},"Applications"),(0,i.kt)("p",null,"Under normal circumstances applications request their ingress certificates from CM.\nWithout CM use of ",(0,i.kt)("a",{parentName:"p",href:"/references/customization/routing_secrets"},"routing secrets")," becomes ",(0,i.kt)("strong",{parentName:"p"},"mandatory"),"."))}m.isMDXComponent=!0}}]);