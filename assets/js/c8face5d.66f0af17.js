"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[10566],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=i.createContext({}),c=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=c(n),f=r,m=d["".concat(p,".").concat(f)]||d[f]||l[f]||o;return n?i.createElement(m,s(s({ref:t},u),{},{components:n})):i.createElement(m,s({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:r,s[1]=a;for(var c=2;c<o;c++)s[c]=n[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},35877:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return p},default:function(){return f},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return l}});var i=n(83117),r=n(80102),o=(n(67294),n(3905)),s=["components"],a={sidebar_label:"epinio push",description:"epinio push",keywords:["epinio","kubernetes","epinio push"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-push"],"doc-persona":["epinio-developer","epinio-operator"]},p=void 0,c={unversionedId:"references/commands/cli/epinio_push",id:"references/commands/cli/epinio_push",title:"epinio_push",description:"epinio push",source:"@site/docs/references/commands/cli/epinio_push.md",sourceDirName:"references/commands/cli",slug:"/references/commands/cli/epinio_push",permalink:"/next/references/commands/cli/epinio_push",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/references/commands/cli/epinio_push.md",tags:[],version:"current",frontMatter:{sidebar_label:"epinio push",description:"epinio push",keywords:["epinio","kubernetes","epinio push"],"doc-type":["reference"],"doc-topic":["epinio","reference","epinio-cli","epinio-push"],"doc-persona":["epinio-developer","epinio-operator"]},sidebar:"docs",previous:{title:"epinio logout",permalink:"/next/references/commands/cli/epinio_logout"},next:{title:"epinio server",permalink:"/next/references/commands/cli/epinio_server"}},u={},l=[{value:"epinio push",id:"epinio-push",level:2},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],d={toc:l};function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"epinio-push"},"epinio push"),(0,o.kt)("p",null,"Push an application declared in the specified manifest"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"epinio push [flags] [PATH_TO_APPLICATION_MANIFEST]\n")),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"      --app-chart string             App chart to use for deployment\n  -b, --bind strings                 configurations to bind immediately\n      --builder-image string         Paketo builder image to use for staging\n  -v, --chart-value strings          chart customization to be used\n  -z, --clear-routes                 clear routes / no routes\n      --container-image-url string   Container image url for the app workload image\n  -e, --env strings                  environment variables to be used\n  -g, --git string                   Git repository and revision of sources separated by comma (e.g. GIT_URL,REVISION)\n      --git-provider string          Git provider code (default 'git')\n  -h, --help                         help for push\n  -i, --instances int32              The number of instances the application should have (default 1)\n  -n, --name string                  Application name. (mandatory if no manifest is provided)\n  -p, --path string                  Path to application sources.\n  -r, --route strings                Custom route to use for the application (a subdomain of the default domain will be used if this is not set). Can be set multiple times to use multiple routes with the same application.\n")),(0,o.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,o.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/next/references/commands/cli/epinio"},"epinio"),"\t - Epinio cli")))}f.isMDXComponent=!0}}]);