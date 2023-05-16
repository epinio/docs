"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[21325],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=l(n),m=i,h=d["".concat(c,".").concat(m)]||d[m]||u[m]||r;return n?o.createElement(h,s(s({ref:t},p),{},{components:n})):o.createElement(h,s({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<r;l++)s[l]=n[l];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},97259:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var o=n(83117),i=n(80102),r=(n(67294),n(3905)),s=["components"],a={sidebar_label:"Accessing Epinio's Internal Minio Service",sidebar_position:28,title:""},c="Accessing Epinio's Internal MinIO Service",l={unversionedId:"howtos/minio",id:"howtos/minio",title:"",description:"There are several ways to make Epinio's internal S3-compatible MinIO service available for debugging purposes. In this document, we will cover only two of them, first exposing the Minio-console web interface and then accessing the Minio service through the AWS CLI. In both cases we will expose the internal service through a kubernetes NodePort service.",source:"@site/docs/howtos/minio.md",sourceDirName:"howtos",slug:"/howtos/minio",permalink:"/next/howtos/minio",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/howtos/minio.md",tags:[],version:"current",sidebarPosition:28,frontMatter:{sidebar_label:"Accessing Epinio's Internal Minio Service",sidebar_position:28,title:""},sidebar:"docs",previous:{title:"AWS IAM integration",permalink:"/next/howtos/aws_iam_integration"},next:{title:"Global System Requirements",permalink:"/next/references/system_requirements/global"}},p={},u=[{value:"Expose Minio console web interface",id:"expose-minio-console-web-interface",level:2},{value:"Access Epinio&#39;s Minio through the AWS CLI",id:"access-epinios-minio-through-the-aws-cli",level:2}],d={toc:u};function m(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"accessing-epinios-internal-minio-service"},"Accessing Epinio's Internal MinIO Service"),(0,r.kt)("p",null,"There are several ways to make Epinio's internal S3-compatible MinIO service available for debugging purposes. In this document, we will cover only two of them, first exposing the Minio-console web interface and then accessing the Minio service through the AWS CLI. In both cases we will expose the internal service through a kubernetes ",(0,r.kt)("inlineCode",{parentName:"p"},"NodePort")," service."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"For security reasons, make sure that you deleted the exposed services immediately at the end of your debugging session.")),(0,r.kt)("h2",{id:"expose-minio-console-web-interface"},"Expose Minio console web interface"),(0,r.kt)("p",null,"The simplest way to access Epinio's internal Minio service is by using a web browser. Copy the block below and paste it to a terminal which is configured to have access to your kubernetes cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl expose pod minio-0 -n epinio --name epinio-console-np --port=9001 --type=NodePort\nPORT=$(kubectl get svc -n epinio epinio-console-np -o jsonpath=\'{.spec.ports[0].nodePort}\')\nNODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")\nMINIO_USER=$(kubectl get secrets/minio-creds -n epinio -o=go-template=\'{{index .data "rootUser" | base64decode}}\')\nMINIO_PASS=$(kubectl get secrets/minio-creds -n epinio -o=go-template=\'{{index .data "rootPassword" | base64decode}}\')\necho "Minio Console https://$NODE:$PORT, Username: $MINIO_USER Password: $MINIO_PASS"\n')),(0,r.kt)("p",null,"The output from the command on the last line will be similar to:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Minio Console https://10.0.0.12:31689, Username: 20bDikQsszYpcrBc Password: kDRHftasmW0CyRjy\n")),(0,r.kt)("p",null,"Now you can point your web browser to the Minio console using the provided URL and credentials."),(0,r.kt)("p",null,"At the end of your debugging session delete the created service by running:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl delete service epinio-console-np -n epinio\n")),(0,r.kt)("h2",{id:"access-epinios-minio-through-the-aws-cli"},"Access Epinio's Minio through the AWS CLI"),(0,r.kt)("p",null,"Another method is using the AWS CLI to communicate with the internal S3-compatible Minio API endpoint. If you choose this method copy the block below and paste it to a terminal which is configured to have access to your kubernetes cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl expose pod minio-0 -n epinio --name epinio-api-np --port=9000 --type=NodePort\nPORT=$(kubectl get svc -n epinio epinio-api-np -o jsonpath='{.spec.ports[0].nodePort}')\nNODE=$(kubectl get nodes -o jsonpath=\"{.items[0].status.addresses[0].address}\")\nMINIO_KEY=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data \"accesskey\" | base64decode}}')\nMINIO_SECRET=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data \"secretkey\" | base64decode}}')\n")),(0,r.kt)("p",null,"Install AWS CLI according to Amazon's ",(0,r.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"},"Getting Started Guide")," and configure it to access the internal Minio/S3 service as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'aws configure set aws_access_key_id $MINIO_KEY\naws configure set aws_secret_access_key $MINIO_SECRET\naws configure set default.region us-east-1\necho "Usage: aws --no-verify-ssl --endpoint-url https://$NODE:$PORT s3 ls"\n')),(0,r.kt)("p",null,"For more information about using AWS CLI with S3, see Amazon's ",(0,r.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"},"Getting Started Guide")," and also the documentation from ",(0,r.kt)("a",{parentName:"p",href:"https://min.io/docs/minio/linux/integrations/aws-cli-with-minio.html"},"MinIO")," on this topic."),(0,r.kt)("p",null,"At the end of your debugging session delete the created service by running:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl delete service epinio-api-np -n epinio\n")))}m.isMDXComponent=!0}}]);