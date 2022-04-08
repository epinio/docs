/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Sidebar for the Docs module
  docs: [
    'intro',
    {
      type: 'doc',
      id: 'tutorials/quickstart',
      label: "Quick Start",
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        'installation/install_epinio_cli',
        'installation/dns_setup',
        'installation/magicDNS_setup',
        'installation/uninstall_epinio',
      ],
      collapsed: false,
      link: {
        type: 'doc',
        id: 'installation/installation',
      },
    },
    {
      type: 'category',
      label: 'Explanations',
      items: [
        'explanations/advanced',
        'explanations/detailed-push-process',
        'explanations/principles',
        'explanations/security',
      ],
      collapsed: false,
      link: {
        type: 'doc',
        id: 'explanations/explanations',
      },
    },
    {
      type: 'category',
      label: 'HowTos',
      items: [
        'howtos/certificate_issuers',
        'howtos/debug',
        'howtos/provision_external_ip_for_local_kubernetes',
        'howtos/gitjob_push',
        'howtos/setup_external_s3',
        'howtos/setup_external_registry',
        'howtos/port_forwarding',
        'howtos/custom_routes',
        'howtos/install_epinio_on_rancher',
        'howtos/install_epinio_on_rke',
        'howtos/install_epinio_on_k3s',
        'howtos/install_epinio_on_rancher_desktop',
        'howtos/install_epinio_on_k3d',
        'howtos/install_epinio_on_minikube',
        'howtos/install_epinio_on_public_cloud',
        'howtos/install_wordpress_application',
      ],
      link: {
        type: 'doc',
        id: 'howtos/howtos',
      },
    },
    {
      type: 'category',
      label: 'Reference documentation',
      items: [
        {
          type: 'category',
          label: 'System requirements',
          items: [
            'references/windows',
          ],
          link: {
            type: 'doc',
            id: 'references/system_requirements'
          }
        },
        'references/command_requirements',
        {
          type: 'category',
          label: 'Command reference',
          items: [
            {
              type: 'category',
              label: 'epinio',
              items: [
                {
                  type: 'category',
                  label: 'epinio_app',
                  items: [
                    'references/cli/epinio_app_create',
                    'references/cli/epinio_app_delete',
                    {
                      type: 'category',
                      label: 'epinio_app_env',
                      items: [
                        'references/cli/epinio_app_env_list',
                        'references/cli/epinio_app_env_set',
                        'references/cli/epinio_app_env_show',
                        'references/cli/epinio_app_env_unset',
                      ],
                      link: {
                        type: 'doc',
                        id: 'references/cli/epinio_app_env',
                      }
                    },
                    'references/cli/epinio_app_list',
                    'references/cli/epinio_app_logs',
                    'references/cli/epinio_app_manifest',
                    'references/cli/epinio_app_show',
                    'references/cli/epinio_app_update',
                  ],
                  link: {
                    type: 'doc',
                    id: 'references/cli/epinio_app',
                  },
                },
                {
                  type: 'category',
                  label: "epinio_settings",
                  items: [
                    'references/cli/epinio_settings_colors',
                    'references/cli/epinio_settings_show',
                    'references/cli/epinio_settings_update',
                  ],
                  link: {
                    type: 'doc',
                    id: 'references/cli/epinio_settings',
                  },
                },
                'references/cli/epinio_info',
                {
                  type: 'category',
                  label: 'epinio_namespace',
                  items: [
                    'references/cli/epinio_namespace_create',
                    'references/cli/epinio_namespace_delete',
                    'references/cli/epinio_namespace_list',
                    'references/cli/epinio_namespace_show',
                  ],
                  link: {
                    type: 'doc',
                    id: 'references/cli/epinio_namespace'
                  },
                },
                'references/cli/epinio_push',
                'references/cli/epinio_server',
                {
                  type: 'category',
                  label: 'epinio_configuration',
                  items: [
                    'references/cli/epinio_configuration_bind',
                    'references/cli/epinio_configuration_create',
                    'references/cli/epinio_configuration_delete',
                    'references/cli/epinio_configuration_list',
                    'references/cli/epinio_configuration_show',
                    'references/cli/epinio_configuration_unbind',
                  ],
                  link: {
                    type: 'doc',
                    id: 'references/cli/epinio_configuration'
                  },
                },
                'references/cli/epinio_target',
                'references/cli/epinio_version'
              ],
              link: {
                type: 'doc',
                id: 'references/cli/epinio'
              },
            }
          ],
          link: {
            type: 'doc',
            id: 'references/commands'
          }
        },
        'references/settings',
        'references/supported_applications',
        'references/manifests',
        'references/configurations',
        'references/api'
      ],
      link: {
        type: 'doc',
        id: 'references/references'
      },
    },
  ],
};

module.exports = sidebars;
