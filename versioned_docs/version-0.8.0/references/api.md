---
sidebar_label: "API"
title: ""
---

# API reference

Most of the Epinio commands communicate with the Epinio server side component over an API. The API is secured with Basic Auth authentication. You can make requests against that API with the credentials from your Epinio config.
E.g.

- Get your credentials with: `epinio config show`
- Use curl to make a request:

```
$ curl -u your-username-here:password-here https://epinio.your-system-domain/api/v1/info
```

The responses are all JSON objects, except for some cases where you get an error before the request reaches the Epinio server (e.g. because of bad cluster configuration).

The endpoints are documented in the [OpenAPI Spec](https://www.openapis.org/) format. You can find the definition of the API here: https://github.com/epinio/epinio/blob/v0.1.6/docs/references/api/swagger.json

__Make sure__ you change to the Epinio release you have deployed.

There are various tools you can use to easily browse the API (e.g. https://editor.swagger.io/). If you have a Golang environment set up locally, you may find it easier to run `make swagger swagger-serve` from the root of the Epinio repository.
