---
sidebar_label: "Custom values for service Helm charts"
sidebar_position: 17
title: "How to specify custom values for service Helm charts"
---

## Audience

This documentation is for operators specifying custom services for users, and users creating instances of those custom services who need to customize them.

Operators are shown how to specify user settings based on the form of the field in the `values.yaml` file of the underlying service Helm chart.

Users are shown how to set values for the user settings of a service.

## General information

Operators, see [Creating A Custom Service](create_custom_service.md) for the general syntax of
user settings.

For users, the relevant option is `--chart-value` (short: `-v`) of the `epinio service create`
command.

Following is a series of examples showing how the various forms of helm chart
values are specified in the custom services and then used via `--chart-value`.

## Examples

All the examples have the same basic structure. The tables show, side by side,

 - how the field looks like in the `values.yaml` of the underlying service,
 - how the field is specified in the custom service, and
 - how it is addressed by the user via `--chart-value`.

### Basic map, simple value

This example assumes that the field value is of a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>CLI usage</th>
</tr>
<tr valign='top'>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`foo:
  bar: value
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`settings:
  "foo.bar":
    type: "T"
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
-v "foo.bar=value"
</CodeBlock>
</td>
</tr>
</table>
</pre>

### Basic array, simple value

This example assumes that the field value is of a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

Note how the field name in the service spec does not mention that `bar` is an array.
Here the name `foo.bar`, in the service spec, describes the path to the field.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>CLI usage</th>
</tr>
<tr valign='top'>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`foo:
  bar:
    - value1
    - value2
    - ...
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`settings:
  "foo.bar":
    type: "T"
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`-v "foo.bar[0]=value1"
-v "foo.bar[1]=value2"
...
`}
</CodeBlock>
</td>
</tr>
</table>
</pre>

### Mixed map and array, simple values

This example assumes that the value field is a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

Here `foo` is the array, having maps as elements, of which the keys `name` and `value` are of
interest.

Again, note how the names of the field do not mention the nature of `foo` as an array, and how the paths to fields of interest are used to name them in the CLI settings.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>CLI usage</th>
</tr>
<tr valign='top'>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`foo:
  - name: name1
    value: value1
  - name: name2
    value: value2
  - ...
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`settings:
  "foo.name":
    type: "string"
  "foo.value":
    type: "T"
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`-v "foo[0].name=name1"
-v "foo[0].value=value1"
-v "foo[1].name=name2"
-v "foo[1].value=value2"
...
`}
</CodeBlock>
</td>
</tr>
</table>
</pre>

### Map-valued map

This example assumes that the field value is a map itself, with arbitrary keys, and values.
A concrete example would be the various annotation fields provided by bitnami services that enable the user to set custom annotations on the various groups of pods of the service.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>CLI usage</th>
</tr>
<tr valign='top'>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`foo:
  bar:
    key1: value1
    key2: value2
    ...
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`settings:
  "foo.bar":
    type: "map"
`}
</CodeBlock>
</td>
<td>
<CodeBlock language="yaml" showLineNumbers>
{`-v "foo.bar.key1=value1
-v "foo.bar.key2=value2
...
`}
</CodeBlock>
</td>
</tr>
</table>
</pre>
