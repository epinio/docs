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

For operators, see [Creating A Custom Service](using_custom_appcharts.md) for the general syntax of
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
<td><pre>
foo:{'\n'}
{'  '}bar: value
</pre></td>
<td><pre>
settings:{'\n'}
{'  '}"foo.bar":{'\n'}
{'    '}type: "T"
</pre></td>
<td><pre>
-v "foo.bar=value"
</pre></td>
</tr>
</table>
</pre>

## Basic array, simple value

This example assumes that the field value is of a simple type `T`, i.e. `string`, `integer`,
`number`, or `bool`.

Note how the name of the field in the spec does not mention the nature of `bar` as an array.  The
name is essentially the spine to reach the field, regardless of intercalated arrays.  This may not
be fully understood here, however the next example should make it clearer.

<table>
<tr>
<th><code>values.yaml</code></th>
<th>Service spec</th>
<th>Use</th>
</tr>
<tr valign='top'>
<td><pre>
foo:{'\n'}
{'  '}bar:{'\n'}
{'    '}- value1{'\n'}
{'    '}- value2{'\n'}
{'    '}- ...
</pre></td>
<td><pre>
settings:{'\n'}
{'  '}"foo.bar":{'\n'}
{'    '}type: "T"{'\n'}
</pre></td>
<td><pre>
-v "foo.bar[0]=value1"{'\n'}
-v "foo.bar[1]=value2"{'\n'}
...
</pre></td>
</tr>
</table>

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
<td><pre>
foo:{'\n'}
{'  '}- name: name1{'\n'}
{'    '}value: value1{'\n'}
{'  '}- name: name2{'\n'}
{'    '}value: value2{'\n'}
{'  '}- ...
</pre></td>
<td><pre>
settings:{'\n'}
{'  '}"foo.name":{'\n'}
{'    '}type: "string"{'\n'}
{'  '}"foo.value":{'\n'}
{'    '}type: "T"{'\n'}
</pre></td>
<td><pre>
-v "foo[0].name=name1"{'\n'}
-v "foo[0].value=value1"{'\n'}
-v "foo[1].name=name2"{'\n'}
-v "foo[1].value=value2"{'\n'}
...
</pre></td>
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
<td><pre>
foo:{'\n'}
{'  '}bar:{'\n'}
{'  '}{'  '}key1: value1{'\n'}
{'  '}{'  '}key2: value2{'\n'}
    ...
</pre></td>
<td><pre>
settings:{'\n'}
{'  '}"foo.bar":{'\n'}
{'    '}type: "map"{'\n'}
</pre></td>
<td><pre>
-v "foo.bar.key1=value1"{'\n'}
-v "foo.bar.key2=value2"{'\n'}
...
</pre></td>
</tr>
</table>
</pre>
