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
          editUrl: 'https://github.com/epinio/docs/edit/main',
          routeBasePath: '/',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          versions: {
            current: {
              label: 'Next 🚧',
            },
          },
        },
        blog: false,
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
    /* @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
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
            position: 'left',
            dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            type: 'search',
            position: 'left',
          },
          {
            href: 'https://github.com/epinio/epinio',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'right',
            items: [
              {
                label: 'Slack',
                href: 'https://rancher-users.slack.com',
              },
              {
                label: 'X/Twitter',
                href: 'https://twitter.com/Rancher_Labs/',
              },
              //{
                //label: 'Stack Overflow',
                //href: 'https://stackoverflow.com/questions/tagged/epinio',
              //},
            ],
          },
          {
            type: 'dropdown',
            label: 'Related Projects',
            position: 'right',
            items: [
              {
                to: 'https://rancher.com',
                label: 'Rancher',
                className: 'navbar__icon navbar__rancher',
              },
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                to: 'https://elemental.docs.rancher.com',
                label: 'Elemental',
                className: 'navbar__icon navbar__elemental',
              },
              {
                to: 'https://fleet.rancher.io',
                label: 'Fleet',
                className: 'navbar__icon navbar__fleet',
              },
              {
                to: 'https://rancherdesktop.io',
                label: 'Rancher Desktop',
                className: 'navbar__icon navbar__rd',
              },
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                to: 'https://opensource.suse.com',
                label: 'More projects',
                className: 'navbar__icon navbar__suse',
              }
            ]
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Krumware and SUSE. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
