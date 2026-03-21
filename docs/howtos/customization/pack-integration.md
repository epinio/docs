---
sidebar_label: "Pack integration for staging"
sidebar_position: 20
title: "Pack integration for staging"
description: "Use Pack CLI as an alternative to the direct buildpack lifecycle for staging."
keywords: [epinio, kubernetes, pack, buildpacks, staging]
doc-type: [how-to]
doc-topic: [how-to, custom, pack, staging]
doc-persona: [epinio-operator]
---

Epinio can use [Pack](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/) (the CNB CLI) as an alternative to the direct buildpack lifecycle for building application source. This aligns the platform with the standard buildpacks tooling and consolidates the developer experience.

## Enabling Pack-based staging

Set the following Helm values when installing or upgrading Epinio:

```yaml
server:
  stagingUsePack: true
  pack:
    image: buildpacksio/pack:0.36.0   # or another tag
```

When `stagingUsePack` is `true`:

- The **Pack** staging script ConfigMap (`epinio-stage-scripts-pack`) is installed and used for builders matching `paketobuildpacks/builder-jammy-*:*`.
- The **lifecycle** jammy script ConfigMap (`epinio-stage-scripts-jammy`) is not installed, so those builders use Pack instead of the direct lifecycle/creator.

The same `epinio push` flow and Stage API apply; only the build path inside the staging Job changes (Pack runs `pack build` instead of `/cnb/lifecycle/creator`).

## Helm values

These keys are defined in the Epinio Helm chart (`values.schema.json`) so they are discoverable and validated on install/upgrade.

| Value | Description | Default |
|-------|-------------|--------|
| `server.stagingUsePack` | Use Pack CLI for staging when a matching builder is selected. | `false` |
| `server.pack.image` | Image containing the Pack CLI (e.g. `buildpacksio/pack`). | `buildpacksio/pack:0.36.0` |
| `server.stagingWorkloads.dockerSocketPath` | Optional. Host path to the Docker socket (e.g. `/var/run/docker.sock`) so Pack can run the builder container. Omit for daemonless or when using DinD with a different socket. | unset |

## Container runtime (Docker socket / DinD)

Pack runs the builder in a container. To do that inside the staging pod you must provide a container runtime:

- **Docker socket**: mount the host's Docker socket into the build container. Set `server.stagingWorkloads.dockerSocketPath` (e.g. `/var/run/docker.sock`). The staging Job will mount that path only in the build container.
- **DinD (Docker-in-Docker)**: run a DinD sidecar and set `dockerSocketPath` to the socket path inside the pod (e.g. the path where the sidecar exposes the socket).

If you do not set `dockerSocketPath`, Pack may still be able to push the app image with `--publish` using registry credentials at `DOCKER_CONFIG`, but running the builder container may fail unless the Pack image or environment provides another way to run containers.

## Security considerations

- **Docker socket**: mounting the host Docker socket gives the build container effective control of the host's Docker daemon. Use node selectors/taints and dedicated build nodes where possible, and restrict who can run staging jobs.
- **Root/DinD**: if the build runs as root or uses DinD, follow cluster hardening practices and limit exposure.

## Rollback

To revert to the lifecycle-based path:

- Set `server.stagingUsePack: false` and upgrade the Helm release. The Pack ConfigMap will be removed and `epinio-stage-scripts-jammy` will be installed again for jammy builders.

## See also

- [Pack – Integrate CI](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/)
- [Pack build CLI](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/cli/pack_build/)
- [Customization point: Buildpacks](../references/customization/staging.md)
- [Customization point: Staging scripts](../references/customization/staging-scripts.md)
