---
sidebar_label: "How To Specify Custom values for Service Helm Charts"
sidebar_position: 17
title: ""
---

# Audience

This documented is addressed to operators specifying custom services for users, and to the users
creating instances of such custom services and wishing to customize these based on the user settings
the operators gave them.

Operators are taught how to specify user settings based on the form of the field in the
`values.yaml` file of the underlying service helm chart.

Users are taught how to set values for the user settings of a service.

# General information

For operators, see [Creating A Custom Service](create_custom_service.md) for the general syntax of
user settings.

For users, the relevant option is `--chart-value` (short: `-v`) of the `epinio service create`
command.

The rest of this document is a series of examples explaining how the various forms of helm chart
values have to be specified in the custom service and then used via `--chart-value`.

# Examples

All the examples have the same basic structure. A 3-column table is used to show

 - how the field looks like in the `values.yaml` of the underlying service,
 - how the field is specified in the custom service, and
 - how it is addressed by the user via `--chart-value`.

side by side. The table may be preceded by notes specific to the example.

## Basic map, simple value

This example assumes that the field value is of a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>Use</th>
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

## Basic array, simple value

This example assumes that the field value is of a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

Note how the name of the field in the spec does not mention the nature of `bar` as an array.  The
name is essentially the spine to reach the field, regardless of intercalated arrays.  This may not
be fully understood here, however the next example should make it clearer.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>Use</th>
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

## Mixed map and array, simple values

This example assumes that the value field is a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

Here `foo` is the array, having maps as elements, of which the keys `name` and `value` are of
interest.

Note how the names of the field do not mention the nature of `foo` as an array, and how the spines
to the fields of interest are used to name them in the settings.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>Use</th>
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

## Map-valued map

This example assumes that the field value is actually a map itself, with arbitrary keys, and
values. A more concrete example would be the various annotation fields provided by various bitnami
services enabling the user to set custom annotations on the various groups of pods of the service.

<pre>
<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>Use</th>
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
