"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[37756],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(h,o(o({ref:t},c),{},{components:n})):r.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},21558:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return u}});var r=n(83117),a=n(80102),i=(n(67294),n(3905)),o=["components"],p={sidebar_label:"Application Export And Transfer",sidebar_position:40,title:""},l="Transfer of an Epinio Application to another cluster",s={unversionedId:"howtos/export-and-transfer",id:"version-1.9.0/howtos/export-and-transfer",title:"",description:"Epinio provides the ability to export all parts of a running application and then use these to run",source:"@site/versioned_docs/version-1.9.0/howtos/export-and-transfer.md",sourceDirName:"howtos",slug:"/howtos/export-and-transfer",permalink:"/1.9.0/howtos/export-and-transfer",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.9.0/howtos/export-and-transfer.md",tags:[],version:"1.9.0",sidebarPosition:40,frontMatter:{sidebar_label:"Application Export And Transfer",sidebar_position:40,title:""},sidebar:"docs",previous:{title:"Accessing Epinio's Internal Minio Service",permalink:"/1.9.0/howtos/minio"},next:{title:"Global System Requirements",permalink:"/1.9.0/references/system_requirements/global"}},c={},u=[{value:"Export",id:"export",level:2},{value:"Import",id:"import",level:2}],d={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"transfer-of-an-epinio-application-to-another-cluster"},"Transfer of an Epinio Application to another cluster"),(0,i.kt)("p",null,"Epinio provides the ability to export all parts of a running application and then use these to run\nthe application in a different cluster."),(0,i.kt)("p",null,"Note however that the above only applies to the core application itself, and not to configurations\nand services it may need / be bound to in the origin cluster."),(0,i.kt)("h2",{id:"export"},"Export"),(0,i.kt)("p",null,"Exporting an application ",(0,i.kt)("inlineCode",{parentName:"p"},"APP")," is trivially done by running the command"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"epinio app export APP /path/to/a/directory/of/your/choice/\n")),(0,i.kt)("p",null,"After the command has run the chosen directory contains the 3 parts of the application needed to run\nit elsewhere, namely:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"app-image.tar"),". The application's runtime image as generated by the staging process and saved\ninto a tar archive as generated by ",(0,i.kt)("inlineCode",{parentName:"p"},"docker save"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"app-chart.tar.gz"),". The ",(0,i.kt)("a",{parentName:"p",href:"/1.9.0/howtos/create_custom_appcharts"},"application chart")," used to deploy the\napplication.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"values.yaml"),". The configuration of the application chart. This part references the application\nimage. Beware, this reference is only valid for the origin cluster."))),(0,i.kt)("h2",{id:"import"},"Import"),(0,i.kt)("p",null,"To import ",(0,i.kt)("inlineCode",{parentName:"p"},"APP")," into a new cluster"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"docker load app-image.tar")," to import the image and its layers into the local docker\nsetup. The output will contain a line referencing the ",(0,i.kt)("inlineCode",{parentName:"p"},"Loaded image ID"),". This is the hash of\nthe loaded image and needed in the next step."),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Beware"),". Do not use ",(0,i.kt)("inlineCode",{parentName:"p"},"docker import"),", nor ",(0,i.kt)("inlineCode",{parentName:"p"},"docker image import")," for this. While these\ncommands do store the image into the local docker similar to ",(0,i.kt)("inlineCode",{parentName:"p"},"load")," they do not preserve the\nlayering, nor the Entrypoint information coming with these. It is the latter which makes the\nresult unusable for our purposes.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"docker tag HASH REGISTRY/ORG/NAME:TAG")," where ",(0,i.kt)("inlineCode",{parentName:"p"},"HASH")," is the hash of the image as reported\nby the previous step. ",(0,i.kt)("inlineCode",{parentName:"p"},"REGISTRY"),", etc. are mostly arbitrary values chosen by the importer. The\n",(0,i.kt)("inlineCode",{parentName:"p"},"REGISTRY")," is optional, i.e. would default to dockerhub. If set it has to refer to an actual\nregistry the destination cluster is able to pull from.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"docker push REGISTRY/ORG/NAME:TAG")," to save the image to the chosen registry. Without this\nstep the image would only exist locally and could not be pulled later.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Edit the ",(0,i.kt)("inlineCode",{parentName:"p"},"imageURL")," field in the file ",(0,i.kt)("inlineCode",{parentName:"p"},"values.yaml")," to replace the existing image reference,\nvalid only for the origin cluster, with ",(0,i.kt)("inlineCode",{parentName:"p"},"REGISTRY/ORG/NAME:TAG"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Edit the ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"id")," information of the ",(0,i.kt)("inlineCode",{parentName:"p"},"routes")," section of ",(0,i.kt)("inlineCode",{parentName:"p"},"values.yaml")," to prevent clashes\nwith the instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"APP")," running on the origin cluster. This will of course not be necessary\nif ",(0,i.kt)("inlineCode",{parentName:"p"},"APP")," was not kept running on the origin cluster.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Possibly edit the ",(0,i.kt)("inlineCode",{parentName:"p"},"appName")," field in ",(0,i.kt)("inlineCode",{parentName:"p"},"values.yaml"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"helm upgrade --install NAME app-chart.tar.gz --values values.yaml")," to deploy the modified\napplication on the destination cluster under an arbitrarily chosen release name."))))}m.isMDXComponent=!0}}]);