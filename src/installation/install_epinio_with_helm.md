# Installing Epinio with the official Helm chart

The helm chart code is hosted in this [GitHub repo](https://github.com/epinio/epinio-helm-chart).

## Usage

[Helm](https://helm.sh) must be installed to use the chart.  Please refer to Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

    helm repo add epinio-helm-chart https://epinio.github.io/epinio-helm-chart

If you had already added this repo earlier, run `helm repo update` to fetch
the latest versions of the package. You can then run `helm search repo
epinio-helm-chart` to see the chart.

To install the epinio chart:

    helm install my-epinio epinio-helm-chart/epinio

At the end of the installation, usefull information will be printed to help you to start working with your fresh Epinio deployment.

To uninstall the chart:

    helm delete my-epinio

## Customize the deployment

Like other Helm charts, the default values are stored in the [values.yaml](https://github.com/epinio/epinio-helm-chart/blob/main/chart/epinio/values.yaml) file. </br>
You can specify another file with `-f` or simply overload a value with `--set`.

    helm install my-epinio epinio-helm-chart/epinio --set domain=my-custom-domain.org

All the installation options are described [here](https://docs.epinio.io/references/cli/epinio_install.html).
