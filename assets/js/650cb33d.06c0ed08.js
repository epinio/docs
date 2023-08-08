"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[88301],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return h}});var i=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(t),h=a,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||o;return t?i.createElement(m,r(r({ref:n},u),{},{components:t})):i.createElement(m,r({ref:n},u))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var c=2;c<o;c++)r[c]=t[c];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},44722:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var i=t(83117),a=t(80102),o=(t(67294),t(3905)),r=["components"],l={sidebar_label:"Install Epinio CLI",sidebar_position:2,title:""},s="Installation of the Epinio CLI",c={unversionedId:"installation/install_epinio_cli",id:"installation/install_epinio_cli",title:"",description:"The epinio cli can be used to interact with a cluster that has Epinio installed on it.",source:"@site/docs/installation/install_epinio_cli.md",sourceDirName:"installation",slug:"/installation/install_epinio_cli",permalink:"/next/installation/install_epinio_cli",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/docs/installation/install_epinio_cli.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Install Epinio CLI",sidebar_position:2,title:""},sidebar:"docs",previous:{title:"Install Epinio",permalink:"/next/installation/install_epinio"},next:{title:"DNS setup",permalink:"/next/installation/dns_setup"}},u={},p=[{value:"From Homebrew (Linux and Mac)",id:"from-homebrew-linux-and-mac",level:2},{value:"From the Binary Releases",id:"from-the-binary-releases",level:2},{value:"Linux",id:"linux",level:3},{value:"MacOS",id:"macos",level:3},{value:"Windows",id:"windows",level:3},{value:"Make the Binary Executable (Linux and Mac)",id:"make-the-binary-executable-linux-and-mac",level:3},{value:"Verify Downloaded Files",id:"verify-downloaded-files",level:2},{value:"Verify File Checksum Signature",id:"verify-file-checksum-signature",level:3},{value:"Verify File Checksum Integrity",id:"verify-file-checksum-integrity",level:3}],d={toc:p};function h(e){var n=e.components,t=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"installation-of-the-epinio-cli"},"Installation of the Epinio CLI"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio")," cli can be used to interact with a cluster that has Epinio installed on it.\nApplication developers shouldn't need to access the cluster directly. Requests to\nthe Epinio API server are authenticated with Basic Auth. No direct access to the cluster\nis required (e.g. through kubectl)."),(0,o.kt)("h2",{id:"from-homebrew-linux-and-mac"},"From Homebrew (Linux and Mac)"),(0,o.kt)("p",null,"Epinio has its own formula available in the homebrew/core tap."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew install epinio\n")),(0,o.kt)("p",null,"Alternatively, if you want to get the latest Epinio CLI faster, there is a custom tap you can use:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew tap epinio/tap\nbrew install epinio/tap/epinio\n")),(0,o.kt)("h2",{id:"from-the-binary-releases"},"From the Binary Releases"),(0,o.kt)("p",null,"Find the latest version at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/epinio/epinio/releases"},"Releases"),"."),(0,o.kt)("h3",{id:"linux"},"Linux"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.9.0/epinio-linux-x86_64\n")),(0,o.kt)("h3",{id:"macos"},"MacOS"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.9.0/epinio-darwin-x86_64\n")),(0,o.kt)("h3",{id:"windows"},"Windows"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"}," curl -LO https://github.com/epinio/epinio/releases/download/v1.9.0/epinio-windows-x86_64.zip\n")),(0,o.kt)("p",null,"Extract the zip archive and put the binary in a directory that is in your ",(0,o.kt)("inlineCode",{parentName:"p"},"PATH")," environment variable. Instructions on how to add directories to the ",(0,o.kt)("inlineCode",{parentName:"p"},"PATH")," vary depending on your version of Windows."),(0,o.kt)("h3",{id:"make-the-binary-executable-linux-and-mac"},"Make the Binary Executable (Linux and Mac)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"chmod +x epinio\n")),(0,o.kt)("p",null,"Move the binary to your PATH"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mv ./epinio /usr/local/bin/epinio\n")),(0,o.kt)("h2",{id:"verify-downloaded-files"},"Verify Downloaded Files"),(0,o.kt)("p",null,"This is done using the ",(0,o.kt)("inlineCode",{parentName:"p"},"cosign")," tool.\nThe following commands were tested using cosign version 2.1.1."),(0,o.kt)("h3",{id:"verify-file-checksum-signature"},"Verify File Checksum Signature"),(0,o.kt)("p",null,"Instead of signing all release assets, Epinio signs a checksums file containing the different\nrelease assets checksums. You can download/copy the three files 'epinio_1.9.0_checksums.txt.pem',\n'epinio_1.9.0_checksums.txt.sig', 'epinio_1.9.0_checksums.txt' from the latest release."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"curl -LO https://github.com/epinio/epinio/releases/download/v1.9.0/epinio_1.9.0_checksums.txt.pem\ncurl -LO https://github.com/epinio/epinio/releases/download/v1.9.0/epinio_1.9.0_checksums.txt.sig\ncurl -LO https://github.com/epinio/epinio/releases/download/v1.9.0/epinio_1.9.0_checksums.txt\n")),(0,o.kt)("p",null,"Once you have the three files locally, you can execute the following command"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'cosign verify-blob \\\n    --certificate-identity-regexp "https://github.com/epinio/epinio" \\\n    --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \\\n    --cert      epinio_1.9.0_checksums.txt.pem \\\n    --signature epinio_1.9.0_checksums.txt.sig \\\n    epinio_1.9.0_checksums.txt\n')),(0,o.kt)("p",null,"A successful output looks like"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Verified OK\n")),(0,o.kt)("p",null,"Now you can verify the assets checksum integrity."),(0,o.kt)("h3",{id:"verify-file-checksum-integrity"},"Verify File Checksum Integrity"),(0,o.kt)("p",null,"Before verifying the file integrity, you should first verify the checksum file signature. Once\nyou\u2019ve download both the checksums and your binary, you can verify the integrity of your file by\nrunning:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sha256sum --ignore-missing -c epinio_1.9.0_checksums.txt\n")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"For this check to be effective it is necessary that the local ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio")," binary has the proper name as\nlisted in the checksum file, i.e. ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio-linux-x86_64"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio-darwin-x86_64"),", etc."),(0,o.kt)("p",{parentName:"admonition"},"For windows the checksum is for the zip archive, not for the binary inside.")),(0,o.kt)("h1",{id:"verify-the-installation"},"Verify the Installation"),(0,o.kt)("p",null,"Run e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"epinio version")," to test the successful installation."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"> epinio version\nEpinio Version: v1.9.0\nGo Version: go1.20\n")))}h.isMDXComponent=!0}}]);