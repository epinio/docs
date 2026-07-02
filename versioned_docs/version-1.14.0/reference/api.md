---
sidebar_label: "Server API"
title: "API Reference"
sidebar_position: 2
description: How to authenticate against and browse the Epinio server API.
keywords: [epinio, api, server, openapi, swagger, rest]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, api]
---

Most Epinio commands communicate with the Epinio server over an API. The API is
secured with Basic Auth; make requests with the credentials from your Epinio
settings.

- Get your credentials with `epinio settings show`.
- Make a request with `curl`:

```bash
curl -u <username>:<password> https://epinio.<your-system-domain>/api/v1/info
```

Responses are JSON objects, except for some errors that occur before the request
reaches the Epinio server (for example, a misconfigured cluster).

## Browse the API

The full endpoint reference is rendered from the OpenAPI specification:

- [**API reference**](pathname:///api-reference/) — browse every endpoint, parameter, and schema.
- Download the raw [OpenAPI spec](https://raw.githubusercontent.com/epinio/epinio/main/docs/references/api/swagger.json).
