## User documentation

- [Introduction](introduction.md)

- [Quick Start](tutorials/quickstart.md)

- [Installation](installation/installation.md)
  - [System Requirements](installation/system_requirements.md)
  - [Method 1: Install Epinio and automatically install dependencies](installation/install_epinio_auto.md)
  - [Method 2: Install Epinio and manually install components](installation/install_epinio_manual.md)
  - [Method 3: Install Epinio and components using a manifest and the binary installer](installation/install_epinio_binary.md)

  - [Install Epinio cli](installation/install_epinio_cli.md)
  - [Install Epinio with custom DNS](installation/install_epinio_customDNS.md)
  - [Install Epinio with "magic" DNS](installation/install_epinio_magicDNS.md)
  - [Install Epinio on AKS (Azure)](installation/install_epinio_on_aks.md)
  - [Install Epinio on EKS (Amazon)](installation/install_epinio_on_eks.md)
  - [Install Epinio on GKE (Google)](installation/install_epinio_on_gke.md)
  - [Install Epinio on RKE2 (Rancher)](installation/install_epinio_on_rke.md)
  - [Install Epinio on k3d (local)](installation/install_epinio_on_k3d.md)
  - [Install Epinio on k3s (local)](installation/install_epinio_on_k3s.md)
  - [Install Epinio on Rancher Desktop (local)](installation/install_epinio_on_rancher_desktop.md)
  - [Install Epinio on Minikube (local)](installation/install_epinio_on_minikube.md)
  - [Install Wordpress on Epinio](installation/install_wordpress_application.md)
  - [Install Epinio with Helm](installation/install_epinio_with_helm.md)

- [Uninstall Epinio](installation/uninstall_epinio.md)

- [Explanations](explanations/explanations.md)

  - [Advanced topics](explanations/advanced.md)
  - [Configuration](explanations/configuration.md)
  - [Detailed Push Process](explanations/detailed-push-process.md)
  - [Principles](explanations/principles.md)
  - [Security](explanations/security.md)
  - [Windows](explanations/windows.md)

- [HowTos](howtos/howtos.md)

  - [Certificate Issuers](howtos/certificate_issuers.md)
  - [Provision external IP address for local Kubernetes](howtos/provision_external_ip_for_local_kubernetes.md)
  - [Push with gitjob](howtos/gitjob_push.md)
  - [Setup external S3 storage](howtos/setup-external-s3.md)
  - [Setup external container registry](howtos/setup-external-registry.md)

- [Reference documentation](references/references.md)

  - [Command requirements](references/README.md)
  - [Command reference](references/commands.md)

    - [epinio](references/cli/epinio.md)

      - [epinio_app](references/cli/epinio_app.md)

        - [epinio_app_create](references/cli/epinio_app_create.md)
        - [epinio_app_delete](references/cli/epinio_app_delete.md)
        - [epinio_app_env](references/cli/epinio_app_env.md)

          - [epinio_app_env_list](references/cli/epinio_app_env_list.md)
          - [epinio_app_env_set](references/cli/epinio_app_env_set.md)
          - [epinio_app_env_show](references/cli/epinio_app_env_show.md)
          - [epinio_app_env_unset](references/cli/epinio_app_env_unset.md)

        - [epinio_app_list](references/cli/epinio_app_list.md)
        - [epinio_app_logs](references/cli/epinio_app_logs.md)
        - [epinio_app_manifest](references/cli/epinio_app_manifest.md)
        - [epinio_app_show](references/cli/epinio_app_show.md)
        - [epinio_app_update](references/cli/epinio_app_update.md)

      - [epinio_config](references/cli/epinio_config.md)

        - [epinio_config_colors](references/cli/epinio_config_colors.md)
        - [epinio_config_show](references/cli/epinio_config_show.md)
        - [epinio_config_update](references/cli/epinio_config_update.md)

      - [epinio_info](references/cli/epinio_info.md)
      - [epinio_install-cert-manager](references/cli/epinio_install-cert-manager.md)
      - [epinio_install-ingress](references/cli/epinio_install-ingress.md)
      - [epinio_install](references/cli/epinio_install.md)
      - [epinio_namespace](references/cli/epinio_namespace.md)

        - [epinio_namespace_create](references/cli/epinio_namespace_create.md)
        - [epinio_namespace_delete](references/cli/epinio_namespace_delete.md)
        - [epinio_namespace_list](references/cli/epinio_namespace_list.md)
        - [epinio_namespace_show](references/cli/epinio_namespace_show.md)

      - [epinio_push](references/cli/epinio_push.md)
      - [epinio_server](references/cli/epinio_server.md)
      - [epinio_service](references/cli/epinio_service.md)

        - [epinio_service_bind](references/cli/epinio_service_bind.md)
        - [epinio_service_create](references/cli/epinio_service_create.md)
        - [epinio_service_delete](references/cli/epinio_service_delete.md)
        - [epinio_service_list](references/cli/epinio_service_list.md)
        - [epinio_service_show](references/cli/epinio_service_show.md)
        - [epinio_service_unbind](references/cli/epinio_service_unbind.md)

      - [epinio_target](references/cli/epinio_target.md)
      - [epinio_uninstall](references/cli/epinio_uninstall.md)
      - [epinio_version](references/cli/epinio_version.md)

  - [Supported Applications](references/supported-apps.md)
  - [Application Manifests](references/manifests.md)
  - [Services](references/services.md)
  - [API](references/api.md)
