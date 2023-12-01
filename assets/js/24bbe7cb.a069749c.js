"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[62885],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var o=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=o.createContext({}),s=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return o.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},d=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),d=s(t),m=a,h=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return t?o.createElement(h,l(l({ref:n},u),{},{components:t})):o.createElement(h,l({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,l=new Array(i);l[0]=d;var r={};for(var p in n)hasOwnProperty.call(n,p)&&(r[p]=n[p]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var s=2;s<i;s++)l[s]=t[s];return o.createElement.apply(null,l)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4045:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return r},metadata:function(){return s},toc:function(){return c}});var o=t(83117),a=t(80102),i=(t(67294),t(3905)),l=["components"],r={sidebar_label:"Epinio journey: Single developer",sidebar_position:3,title:"The Epinio single developer journey",description:"How a single developer works with Epinio",keywords:["epinio","developer","development","kubernetes"]},p=void 0,s={unversionedId:"tutorials/single-dev-workflow",id:"version-1.11.0/tutorials/single-dev-workflow",title:"The Epinio single developer journey",description:"How a single developer works with Epinio",source:"@site/versioned_docs/version-1.11.0/tutorials/single-dev-workflow.md",sourceDirName:"tutorials",slug:"/tutorials/single-dev-workflow",permalink:"/tutorials/single-dev-workflow",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.11.0/tutorials/single-dev-workflow.md",tags:[],version:"1.11.0",sidebarPosition:3,frontMatter:{sidebar_label:"Epinio journey: Single developer",sidebar_position:3,title:"The Epinio single developer journey",description:"How a single developer works with Epinio",keywords:["epinio","developer","development","kubernetes"]},sidebar:"docs",previous:{title:"Namespaces",permalink:"/tutorials/namespace-tutorial"},next:{title:"Epinio Journey: Deploy complex applications with a custom builder image",permalink:"/tutorials/custom_builder_go"}},u={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"More tools",id:"more-tools",level:3},{value:"Installation",id:"installation",level:2},{value:"Command line interface",id:"cli",level:3},{value:"Login",id:"login",level:3},{value:"Deploy your application with Epinio",id:"deploy-your-application-with-epinio",level:2},{value:"List the applications deployed",id:"list-the-applications-deployed",level:3},{value:"View installation logs",id:"view-installation-logs",level:3},{value:"View application logs",id:"view-application-logs",level:3},{value:"Create a new <code>port-forward</code>",id:"create-a-new-port-forward",level:3},{value:"Scale your application",id:"scale-your-application",level:3},{value:"Remove your application",id:"remove-your-application",level:2}],d={toc:c};function m(e){var n=e.components,t=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"/tutorials/quickstart"},"Quickstart")," gets you started, but,\nas a developer, you'll want to see end-to-end workflow solutions for Epinio.\nThat's the aim of these \"Epinio journeys\",\nwhere you'll be able to follow different use cases."),(0,i.kt)("p",null,"In this tutorial, you focus on the workflow for a solo developer.\nAn example takes you from a bare Kubernetes deployment to a first application deployment."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This tutorial describes a process for an\n",(0,i.kt)("em",{parentName:"p"},"individual developer, working on a local machine"),".\nThe Epinio team plans a future tutorial discussing team working processes.")),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Before you can use Epinio, you need a working Kubernetes cluster."),(0,i.kt)("p",null,"As an individual developer,\nyou might be using a local Kubernetes cluster such as\n",(0,i.kt)("a",{parentName:"p",href:"https://rancherdesktop.io/"},"Rancher Desktop"),"\nor ",(0,i.kt)("a",{parentName:"p",href:"https://k3d.io/"},"k3d"),"."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"There are common installation scenarios examples in the\n",(0,i.kt)("a",{parentName:"p",href:"/installation/install_epinio"},"installation documents"),".")),(0,i.kt)("p",null,"This tutorial uses\n",(0,i.kt)("a",{parentName:"p",href:"/installation/other_inst_scenarios/install_epinio_on_rancher_desktop"},"Rancher Desktop"),"\nas a local Kubernetes cluster."),(0,i.kt)("p",null,"If you don't have a Kubernetes installation you can install the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/rancher-sandbox/rancher-desktop/releases"},"latest version"),"\nof Rancher Desktop for your operating system to get started."),(0,i.kt)("h3",{id:"more-tools"},"More tools"),(0,i.kt)("p",null,"You should install two useful tools in your system:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/tools/#kubectl"},"kubectl"),"\nfor communicating with the Kubernetes cluster")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"https://helm.sh/docs/intro/install/"},"helm"),"\nfor deploying Epinio Helm Charts"))),(0,i.kt)("p",null,"Depending on the local Kubernetes cluster you installed,\nthese two binaries might be already installed.\nFor example, they're installed as part of Rancher Desktop."),(0,i.kt)("p",null,"You use these two binaries for ",(0,i.kt)("a",{parentName:"p",href:"#installation"},"Installation")," only.\nThe development workflow only uses the ",(0,i.kt)("a",{parentName:"p",href:"#cli"},"Epinio CLI"),"."),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"Once you have your local Kubernetes cluster installed and running, you can\n",(0,i.kt)("a",{parentName:"p",href:"/installation/install_epinio"},"install Epinio"),"."),(0,i.kt)("p",null,"These are the steps for Rancher Desktop:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.1/cert-manager.yaml\n\n# Wait for cert-manager to stabilize. This should take approximately\n# 30 seconds depending on your Internet connection.\n\nhelm repo add epinio https://epinio.github.io/helm-charts\n\nhelm repo update\n\nhelm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io\n")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"You can find the password needed for the ",(0,i.kt)("a",{parentName:"p",href:"#login"},"login")," at the end of the installation output.")),(0,i.kt)("h3",{id:"cli"},"Command line interface"),(0,i.kt)("p",null,"To use a CLI with your Epinio installation, download the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/epinio/epinio/releases/latest"},"Epinio CLI\nbinary"),". The binary is\navailable for Linux, Windows, and macOS."),(0,i.kt)("h3",{id:"login"},"Login"),(0,i.kt)("p",null,"The first task to perform after Epinio installation, is to\n",(0,i.kt)("a",{parentName:"p",href:"/references/commands/cli/epinio_login"},"log in")," with the binary you\ndownloaded:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'\n\n# Trust the certificate by pressing 'y' and 'enter'\n")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"If your local Kubernetes cluster restarts, you need to log in again with the\ncommand ",(0,i.kt)("inlineCode",{parentName:"p"},"epinio login"),". Epinio stays installed and the certificates are still valid.")),(0,i.kt)("p",null,"You can confirm that you're logged in by checking the Epinio settings:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio settings show\n")),(0,i.kt)("p",null,"You can also open the Epinio URL,\n",(0,i.kt)("a",{parentName:"p",href:"https://epinio.127.0.0.1.sslip.io"},"https://epinio.127.0.0.1.sslip.io"),", in your browser and use the web\nUI."),(0,i.kt)("h2",{id:"deploy-your-application-with-epinio"},"Deploy your application with Epinio"),(0,i.kt)("p",null,"Now that you have completed the installation and setup tasks,\nyou can use Epinio to deploy your application."),(0,i.kt)("p",null,"Epinio uses ",(0,i.kt)("a",{parentName:"p",href:"https://paketo.io/"},"Paketo buildpacks"),"\nto create a container image for your application.\nThen Epinio uses the image to create a container\nwith your application container image,\nwhich runs on your Kubernetes cluster.\nYou can find more information about this in the\n",(0,i.kt)("a",{parentName:"p",href:"/explanations/detailed-push-process#7-stage"},"detailed push process"),"\ndocumentation."),(0,i.kt)("p",null,"Epinio also creates a new ",(0,i.kt)("inlineCode",{parentName:"p"},"ingress route"),",\nwhich you use to access your application when it's deployed."),(0,i.kt)("p",null,"Epinio handles the whole process,\nwhich enables you to concentrate on your application\nrather than its deployment details."),(0,i.kt)("p",null,"As an example, this deploys a simple application:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# Example code: https://github.com/epinio/example-12factor\n\n# Move to the source code directory.\ncd /github/example-12factor\n\n# Deploy your application\nepinio push -n mysimpleapp\n")),(0,i.kt)("p",null,"At the end of the deployment output, you get the URL to use for\nyour application:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"Deploying application ...\n..............\n\ud83d\udd5e  Creating application resources\n\u2714\ufe0f  App is online.\nName: mysimpleapp\nNamespace: workspace\nBuilder Image:\nRoutes:\n1: https://mysimpleapp.127.0.0.1.sslip.io\n")),(0,i.kt)("h3",{id:"list-the-applications-deployed"},"List the applications deployed"),(0,i.kt)("p",null,"If you're working on many applications, it's useful to see\ntheir last deployment times and which URLs you use to access them."),(0,i.kt)("p",null,"You can get the application's information with the following two commands:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# List all deployed applications\nepinio app list\n\n# Display the applications information\nepinio app show mysimpleapp\n")),(0,i.kt)("h3",{id:"view-installation-logs"},"View installation logs"),(0,i.kt)("p",null,"For errors, you can check your staging logs."),(0,i.kt)("p",null,"You can access the installation logs by running the command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio app logs --staging mysimpleapp\n")),(0,i.kt)("h3",{id:"view-application-logs"},"View application logs"),(0,i.kt)("p",null,"You can access the application logs.\nYou might want to have real-time logs displayed to aid problem solving."),(0,i.kt)("p",null,"Epinio can display the logs either statically or dynamically as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# Display logs statically\nepinio app logs mysimpleapp\n\n# Display logs dynamically\nepinio app logs --follow mysimpleapp\n")),(0,i.kt)("h3",{id:"create-a-new-port-forward"},"Create a new ",(0,i.kt)("inlineCode",{parentName:"h3"},"port-forward")),(0,i.kt)("p",null,"As mentioned, Epinio creates a new ",(0,i.kt)("inlineCode",{parentName:"p"},"ingress route")," for your application.\nEpinio binds the route to port ",(0,i.kt)("inlineCode",{parentName:"p"},"443")," by default."),(0,i.kt)("p",null,"However, you might need to test parts of your application using different\nports. For these cases, run the following command, for example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio app port-forward mysimpleapp 8080:8080\n")),(0,i.kt)("p",null,"You have three options for specifying ports when creating a ",(0,i.kt)("inlineCode",{parentName:"p"},"port-forward"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"8080")," use the same port number for both local and remote (the same as ",(0,i.kt)("inlineCode",{parentName:"li"},"8080:8080"),")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"3456:8080")," use specific ports"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},":8080")," use a random port as the local port (the same as ",(0,i.kt)("inlineCode",{parentName:"li"},"<random>:8080"),")")),(0,i.kt)("p",null,"In this example, the ",(0,i.kt)("inlineCode",{parentName:"p"},"epinio")," command assigns 37677 as the random local port."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"$ epinio app port-forward sample :8080\n\n\ud83d\udea2  Executing port forwarding\nNamespace: workspace\nApplication: sample\n\nForwarding from 127.0.0.1:37677 -> 8080\nForwarding from [::1]:37677 -> 8080\nHandling connection for 37677\n")),(0,i.kt)("p",null,"For more information, see the\n",(0,i.kt)("a",{parentName:"p",href:"/howtos/other/port_forwarding"},"port forwarding")," page."),(0,i.kt)("h3",{id:"scale-your-application"},"Scale your application"),(0,i.kt)("p",null,"You can add (and remove) instances of your application.\nTo use Epinio scaling use the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio app update mysimpleapp --instances 3\n")),(0,i.kt)("p",null,"After you scale your application, up or down,\nyou can check the status with the command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"epinio app show mysimpleapp\n")),(0,i.kt)("h2",{id:"remove-your-application"},"Remove your application"),(0,i.kt)("p",null,"Once your application is no longer needed on your Kubernetes cluster, to\nfree resources, you can uninstall it as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# Delete the application\nepinio app delete mysimpleapp\n\n# List the applications to verify mysimpleapp has been deleted\nepinio app list\n")))}m.isMDXComponent=!0}}]);