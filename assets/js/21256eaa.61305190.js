"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[3495],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),f=l(n),d=i,m=f["".concat(c,".").concat(d)]||f[d]||u[d]||o;return n?r.createElement(m,s(s({ref:t},p),{},{components:n})):r.createElement(m,s({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=f;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<o;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},32165:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var r=n(83117),i=n(80102),o=(n(67294),n(3905)),s=["components"],a={title:"",sidebar_label:"epinio server"},c=void 0,l={unversionedId:"references/commands/cli/epinio_server",id:"version-1.8.1/references/commands/cli/epinio_server",title:"",description:"epinio server",source:"@site/versioned_docs/version-1.8.1/references/commands/cli/epinio_server.md",sourceDirName:"references/commands/cli",slug:"/references/commands/cli/epinio_server",permalink:"/references/commands/cli/epinio_server",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.8.1/references/commands/cli/epinio_server.md",tags:[],version:"1.8.1",frontMatter:{title:"",sidebar_label:"epinio server"},sidebar:"docs",previous:{title:"epinio push",permalink:"/references/commands/cli/epinio_push"},next:{title:"epinio target",permalink:"/references/commands/cli/epinio_target"}},p={},u=[{value:"epinio server",id:"epinio-server",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],f={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-server"},"epinio server"),(0,o.kt)("p",null,"Starts the Epinio server."),(0,o.kt)("h3",{id:"synopsis"},"Synopsis"),(0,o.kt)("p",null,"This command starts the Epinio server. ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio install")," ensures the server is running inside your cluster. Normally you don't need to run this command manually."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio server [flags]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'      --access-control-allow-origin string    (ACCESS_CONTROL_ALLOW_ORIGIN) Domains allowed to use the API\n      --app-image-exporter string             (APP_IMAGE_EXPORTER) Name of the container image used to download the application image from the \'export\' API.\n      --disable-tracking                      (DISABLE_TRACKING) Disable tracking of the running Epinio and Kubernetes versions\n  -h, --help                                  help for server\n      --ingress-class-name string             (INGRESS_CLASS_NAME) Name of the ingress class to use for apps. Leave empty to add no ingressClassName to the ingress.\n  -n, --namespace string                      (NAMESPACE) The namespace to use (default "epinio")\n      --port int                              (PORT) The port to listen on. Leave empty to auto-assign a random port\n      --registry-certificate-secret string    (REGISTRY_CERTIFICATE_SECRET) Secret for the registry\'s TLS certificate\n      --s3-certificate-secret string          (S3_CERTIFICATE_SECRET) Secret for the S3 endpoint TLS certificate. Can be left empty if S3 is served with a trusted certificate.\n      --staging-service-account-name string   (STAGING_SERVICE_ACCOUNT_NAME)\n      --tls-issuer string                     (TLS_ISSUER) The cluster issuer to use for workload certificates\n      --trace-output string                   (TRACE_OUTPUT) logs output format [text,json] (default "text")\n      --upgrade-responder-address string      (UPGRADE_RESPONDER_ADDRESS) Disable tracking of the running Epinio and Kubernetes versions (default "https://epinio.version.rancher.io/v1/checkupgrade")\n')),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/references/commands/cli/epinio"},"epinio"),"\t - Epinio cli")))}d.isMDXComponent=!0}}]);