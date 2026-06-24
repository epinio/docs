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
        blog: {
          routeBasePath: 'blog',
          path: 'blog',
          blogTitle: 'Epinio Blog',
          blogDescription: "The latest on whats new in Epinio..",
          blogSidebarTitle: 'Blog',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            title: 'Epinio Blog',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Universal Analytics (UA) - throws "window.ga is not a function" in the
        // dev server because the GA script is not injected there. Re-enable for
        // production, or migrate to GA4 via the `gtag` option with a G- id.
        // googleAnalytics: {
        //   trackingID: 'UA-56382716-12',
        //   anonymizeIP: true,
        // },
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
            to: '/blog',
            label: 'Blog',
            position: 'left',
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
            href: 'https://rancher-users.slack.com',
            position: 'right',
            className: 'header-slack-link',
            'aria-label': 'Slack',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Krumware. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
