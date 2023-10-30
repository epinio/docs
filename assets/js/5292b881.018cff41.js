"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[23244],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=i.createContext({}),u=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||r;return n?i.createElement(h,a(a({ref:t},c),{},{components:n})):i.createElement(h,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var u=2;u<r;u++)a[u]=n[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},88284:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return p}});var i=n(83117),o=n(80102),r=(n(67294),n(3905)),a=["components"],s={sidebar_label:"Contributing To Epinio",sidebar_position:1,title:""},l="Contributing to Epinio",u={unversionedId:"howtos/contribute",id:"version-1.10.0/howtos/contribute",title:"",description:"Epinio accepts contributions via GitHub issues and pull requests.",source:"@site/versioned_docs/version-1.10.0/howtos/contribute.md",sourceDirName:"howtos",slug:"/howtos/contribute",permalink:"/howtos/contribute",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.10.0/howtos/contribute.md",tags:[],version:"1.10.0",sidebarPosition:1,frontMatter:{sidebar_label:"Contributing To Epinio",sidebar_position:1,title:""},sidebar:"docs",previous:{title:"Security",permalink:"/explanations/security"},next:{title:"Installing A Metrics Server",permalink:"/howtos/operations/install_metrics_server"}},c={},p=[{value:"Start With An Issue",id:"start-with-an-issue",level:2},{value:"Sign Your Commits",id:"sign-your-commits",level:2},{value:"Pull Requests",id:"pull-requests",level:2},{value:"Semantic Versioning",id:"semantic-versioning",level:2},{value:"Coding Style",id:"coding-style",level:2}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"contributing-to-epinio"},"Contributing to Epinio"),(0,r.kt)("p",null,"Epinio accepts contributions via GitHub issues and pull requests.\nThis document outlines the process to get your pull request accepted."),(0,r.kt)("h2",{id:"start-with-an-issue"},"Start With An Issue"),(0,r.kt)("p",null,"Prior to creating a pull request it is a good idea to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/epinio/epinio/issues/new"},"create an issue"),".\nThis is especially true if the change request is something large.\nThe bug, feature request, or other type of issue can be discussed prior to\ncreating the pull request. This can reduce rework."),(0,r.kt)("h2",{id:"sign-your-commits"},"Sign Your Commits"),(0,r.kt)("p",null,"A sign-off is a line at the end of the explanation for a commit.\nAll commits have to be signed. Your signature certifies that you wrote the patch\nor otherwise have the right to contribute the material. When you sign-off you\nagree to the following rules\n(from ",(0,r.kt)("a",{parentName:"p",href:"https://developercertificate.org/"},"developercertificate.org"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Developer Certificate of Origin\nVersion 1.1\n\nCopyright (C) 2004, 2006 The Linux Foundation and its contributors.\n1 Letterman Drive\nSuite D4700\nSan Francisco, CA, 94129\n\nEveryone is permitted to copy and distribute verbatim copies of this\nlicense document, but changing it is not allowed.\n\nDeveloper's Certificate of Origin 1.1\n\nBy making a contribution to this project, I certify that:\n\n(a) The contribution was created in whole or in part by me and I\n    have the right to submit it under the open source license\n    indicated in the file; or\n\n(b) The contribution is based upon previous work that, to the best\n    of my knowledge, is covered under an appropriate open source\n    license and I have the right under that license to submit that\n    work with modifications, whether created in whole or in part\n    by me, under the same open source license (unless I am\n    permitted to submit under a different license), as indicated\n    in the file; or\n\n(c) The contribution was provided directly to me by some other\n    person who certified (a), (b) or (c) and I have not modified\n    it.\n\n(d) I understand and agree that this project and the contribution\n    are public and that a record of the contribution (including all\n    personal information I submit with it, including my sign-off) is\n    maintained indefinitely and may be redistributed consistent with\n    this project or the open source license(s) involved.\n")),(0,r.kt)("p",null,"Then you add a line to every git commit message:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Signed-off-by: Joe Smith <joe.smith@example.com>\n")),(0,r.kt)("p",null,"Use your real name (no pseudonyms or anonymous contributions)."),(0,r.kt)("p",null,"If you set your ",(0,r.kt)("inlineCode",{parentName:"p"},"user.name")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"user.email")," in your local git configuration, you can sign your\ncommit automatically with ",(0,r.kt)("inlineCode",{parentName:"p"},"git commit -s"),"."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"If your git config information is set properly then viewing the ",(0,r.kt)("inlineCode",{parentName:"p"},"git log"),"\ninformation for your commit will look something like this:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"Author: John Smith <john.smith@example.com>\nDate:   Thu Feb 2 11:41:15 2018 -0800\n    Update README\n    Signed-off-by: John Smith <john.smith@example.com>\n")),(0,r.kt)("p",{parentName:"admonition"},"Notice how the ",(0,r.kt)("inlineCode",{parentName:"p"},"Author")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Signed-off-by")," lines match. If they don't your PR will\nbe rejected by the automated DCO check.")),(0,r.kt)("h2",{id:"pull-requests"},"Pull Requests"),(0,r.kt)("p",null,"Pull requests for a code change should reference the issue they are related to.\nThis will enable issues to serve as a central point of reference for a change.\nFor example, if a pull request fixes or completes an issue, the commit or\npull request should include:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-md"},"Closes #123\n")),(0,r.kt)("p",null,'In this case "123" is the corresponding issue number.'),(0,r.kt)("h2",{id:"semantic-versioning"},"Semantic Versioning"),(0,r.kt)("p",null,"Epinio follows ",(0,r.kt)("a",{parentName:"p",href:"https://semver.org/"},"semantic versioning"),"."),(0,r.kt)("p",null,"This does not cover other tools included in Epinio.\nKubernetes has its own ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/community/blob/master/contributors/design-proposals/release/versioning.md#kubernetes-release-versioning"},"release versioning"),"\nscheme that looks like SemVer but is semantically different."),(0,r.kt)("h2",{id:"coding-style"},"Coding Style"),(0,r.kt)("p",null,"Epinio expects its Go code to be formatted with ",(0,r.kt)("inlineCode",{parentName:"p"},"go fmt"),"."),(0,r.kt)("p",null,"Epinio further follows the style guidelines at"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://go.dev/doc/effective_go"},"Effective Go")," and"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/golang/go/wiki/CodeReviewComments"},"Go Wiki Code Review Comments")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://google.github.io/styleguide/go/guide"},"Go Style At Google"))))}m.isMDXComponent=!0}}]);