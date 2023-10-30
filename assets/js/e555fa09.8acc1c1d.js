"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[22243],{3905:function(e,t,n){n.d(t,{Zo:function(){return a},kt:function(){return f}});var o=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=o.createContext({}),p=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},a=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,a=s(e,["components","mdxType","originalType","parentName"]),m=p(n),f=i,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||r;return n?o.createElement(d,l(l({ref:t},a),{},{components:n})):o.createElement(d,l({ref:t},a))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var p=2;p<r;p++)l[p]=n[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},38713:function(e,t,n){n.r(t),n.d(t,{assets:function(){return a},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var o=n(83117),i=n(80102),r=(n(67294),n(3905)),l=["components"],s={title:"",sidebar_label:"epinio completion"},c=void 0,p={unversionedId:"references/commands/cli/epinio_completion",id:"references/commands/cli/epinio_completion",title:"",description:"epinio completion",source:"@site/docs/references/commands/cli/epinio_completion.md",sourceDirName:"references/commands/cli",slug:"/references/commands/cli/epinio_completion",permalink:"/next/references/commands/cli/epinio_completion",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/references/commands/cli/epinio_completion.md",tags:[],version:"current",frontMatter:{title:"",sidebar_label:"epinio completion"},sidebar:"docs",previous:{title:"epinio client-sync",permalink:"/next/references/commands/cli/epinio_client-sync"},next:{title:"epinio export-registries",permalink:"/next/references/commands/cli/epinio_export-registries"}},a={},u=[{value:"epinio completion",id:"epinio-completion",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],m={toc:u};function f(e){var t=e.components,n=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"epinio-completion"},"epinio completion"),(0,r.kt)("p",null,"Generate completion script for a shell"),(0,r.kt)("h3",{id:"synopsis"},"Synopsis"),(0,r.kt)("p",null,"To load completions:"),(0,r.kt)("p",null,"Bash:"),(0,r.kt)("p",null,"$ source <(epinio completion bash)"),(0,r.kt)("h1",{id:"to-load-completions-for-each-session-execute-once"},"To load completions for each session, execute once:"),(0,r.kt)("p",null,"Linux:\n$ epinio completion bash > /etc/bash_completion.d/epinio\nMacOS:\n$ epinio completion bash > /usr/local/etc/bash_completion.d/epinio"),(0,r.kt)("p",null,"ATTENTION:\nThe generated script requires the bash-completion package.\nSee ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion"},"https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion"),"\nfor information on how to install and activate it."),(0,r.kt)("p",null,"Zsh:"),(0,r.kt)("h1",{id:"if-shell-completion-is-not-already-enabled-in-your-environment-you-will-need"},"If shell completion is not already enabled in your environment you will need"),(0,r.kt)("h1",{id:"to-enable-it--you-can-execute-the-following-once"},"to enable it.  You can execute the following once:"),(0,r.kt)("p",null,'$ echo "autoload -U compinit; compinit" >> ~/.zshrc'),(0,r.kt)("h1",{id:"to-load-completions-for-each-session-execute-once-1"},"To load completions for each session, execute once:"),(0,r.kt)("p",null,'$ epinio completion zsh > "${fpath',"[1]",'}/_epinio"'),(0,r.kt)("h1",{id:"you-will-need-to-start-a-new-shell-for-this-setup-to-take-effect"},"You will need to start a new shell for this setup to take effect."),(0,r.kt)("p",null,"Fish:"),(0,r.kt)("p",null,"$ epinio completion fish | source"),(0,r.kt)("h1",{id:"to-load-completions-for-each-session-execute-once-2"},"To load completions for each session, execute once:"),(0,r.kt)("p",null,"$ epinio completion fish > ~/.config/fish/completions/epinio.fish"),(0,r.kt)("p",null,"Powershell:"),(0,r.kt)("p",null,"PS> epinio completion powershell | Out-String | Invoke-Expression"),(0,r.kt)("h1",{id:"to-load-completions-for-every-new-session-run"},"To load completions for every new session, run:"),(0,r.kt)("p",null,"PS> epinio completion powershell > epinio.ps1"),(0,r.kt)("h1",{id:"and-source-this-file-from-your-powershell-profile"},"and source this file from your powershell profile."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"epinio completion [bash|zsh|fish|powershell]\n")),(0,r.kt)("h3",{id:"options"},"Options"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"  -h, --help   help for completion\n")),(0,r.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  -H, --header stringArray       Add custom header to every request executed\n  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster\n      --no-colors                Suppress colorized output\n      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")\n      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates\n      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)\n      --trace-file string        (TRACE_FILE) Print trace messages to the specified file\n      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)\n      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")\n      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)\n')),(0,r.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/next/references/commands/cli/epinio"},"epinio"),"\t - Epinio cli")))}f.isMDXComponent=!0}}]);