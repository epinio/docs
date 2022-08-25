// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Epinio docs',
  tagline: 'Epinio - the application development engine for Kubernetes',
  url: 'https://docs.epinio.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'epinio', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/epinio/docs',
          routeBasePath: '/',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          versions: {
            current: {
              label: 'Next 🚧',
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/epinio/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-56382716-12',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'F9GBZ0DFYI',
        apiKey: 'b8442abfcf47dbbd23aba2434bf5c879',
        indexName: 'epinio',
        contextualSearch: true,
      },
      navbar: {
        title: 'Epinio',
        logo: {
          alt: 'Epinio',
          src: 'img/favicon.svg',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          //{to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/epinio/epinio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/epinio',
              },
              {
                label: 'Slack',
                href: 'https://rancher-users.slack.com',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Rancher_Labs/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/epinio/epinio',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SUSE Rancher. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
