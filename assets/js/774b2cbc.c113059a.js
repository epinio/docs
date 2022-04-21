"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[7710],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),h=o,f=u["".concat(p,".").concat(h)]||u[h]||d[h]||a;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6002:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return h},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_label:"Install Wordpress with Epinio",title:""},p="Installing Wordpress with Epinio",s={unversionedId:"howtos/install_wordpress_application",id:"howtos/install_wordpress_application",title:"",description:"Create a directory for your application:",source:"@site/docs/howtos/install_wordpress_application.md",sourceDirName:"howtos",slug:"/howtos/install_wordpress_application",permalink:"/next/howtos/install_wordpress_application",editUrl:"https://github.com/epinio/epinio-docs/docs/howtos/install_wordpress_application.md",tags:[],version:"current",frontMatter:{sidebar_label:"Install Wordpress with Epinio",title:""},sidebar:"docs",previous:{title:"Install Epinio on Public Clouds",permalink:"/next/howtos/install_epinio_on_public_cloud"},next:{title:"",permalink:"/next/references/"}},c={},d=[{value:"Create a directory for your application:",id:"create-a-directory-for-your-application",level:2},{value:"Get the code:",id:"get-the-code",level:2},{value:"Create a buildpack.yml for your application",id:"create-a-buildpackyml-for-your-application",level:2},{value:"Enable needed php extensions",id:"enable-needed-php-extensions",level:2},{value:"Deploy",id:"deploy",level:2},{value:"Additional steps",id:"additional-steps",level:2}],u={toc:d};function h(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"installing-wordpress-with-epinio"},"Installing Wordpress with Epinio"),(0,a.kt)("h2",{id:"create-a-directory-for-your-application"},"Create a directory for your application:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir wordpress\ncd wordpress\n")),(0,a.kt)("h2",{id:"get-the-code"},"Get the code:"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://wordpress.org/download/#download-install"},"https://wordpress.org/download/#download-install")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"wget https://wordpress.org/latest.tar.gz\ntar xvf latest.tar.gz\nmv wordpress htdocs\nrm -rf latest.tar.gz\n")),(0,a.kt)("h2",{id:"create-a-buildpackyml-for-your-application"},"Create a buildpack.yml for your application"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"cat << EOF > buildpack.yml\n---\nphp:\n  version: 8.0.x\n  script: index.php\n  webserver: nginx\n  webdirectory: htdocs\nEOF\n")),(0,a.kt)("h2",{id:"enable-needed-php-extensions"},"Enable needed php extensions"),(0,a.kt)("p",null,"The PHP buildpack supports additional ini files for PHP through\n",(0,a.kt)("a",{parentName:"p",href:"https://paketo.io/docs/buildpacks/language-family-buildpacks/php/#php_ini_scan_dir"},"the PHP_INI_SCAN_DIR mechanism"),"."),(0,a.kt)("p",null,"We need zlib and mysqli extensions enabled:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir .php.ini.d\ncat << EOF > .php.ini.d/extensions.ini\nextension=zlib\nextension=mysqli\nEOF\n")),(0,a.kt)("h2",{id:"deploy"},"Deploy"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"epinio push --name wordpress\n")),(0,a.kt)("h2",{id:"additional-steps"},"Additional steps"),(0,a.kt)("p",null,"Wordpress needs a database to work. After visiting the route of your deployed\napplication you will have to set the connection details to the database."),(0,a.kt)("p",null,"You can install a MySQL database on your cluster or use an external one. One\noption is using a helm chart like ",(0,a.kt)("a",{parentName:"p",href:"https://bitnami.com/stack/mysql/helm"},"this one")))}h.isMDXComponent=!0}}]);