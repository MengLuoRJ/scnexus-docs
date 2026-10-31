---
title: "Creation tools"
description: "Local helpers such as the encoding converter; input is never uploaded or stored"
order: 80
group: "usage"
updated: "2026-11-01"
---

## Where it lives and what it is for

Creation tools in the sidebar gathers the small helpers used while building and debugging works. The encoding converter is the one available today; more will follow.

The page states its principle at the top: all conversion happens locally, and input is never uploaded or saved. Conversion lives entirely in the interface — closing the page discards it, nothing is logged and no request is made.

## Encoding converter

This turns ordinary text into the UTF-8 hexadecimal escapes or Galaxy code the StarCraft editor needs:

1. Type into Original text, for example a Chinese message.
2. Switch between the four output formats.
3. Result updates as you type, is read-only, and can be copied with Copy result; Clear all empties the input.

The four output formats:

| Format | Shape of the result | Where it goes |
| --- | --- | --- |
| Direct conversion | Plain hexadecimal escapes | Pasted into a string literal |
| As String | A quoted string | Assigned straight to a string field |
| As Text | A `StringToText(...)` call | Interfaces that expect a text object |
| TriggerDebug | A complete `TriggerDebugOutput(...)` statement | Printing debug text quickly from a trigger |

The escaping details for each format — which characters stay as they are, which are split into surrogate pairs — are in [Creation tools · Encoding converter](/editor/toolbox), which gives a byte-by-byte reference.

## How it relates to the editor documentation

Creation tools is the local tool page inside the app; the [editor documentation](/editor) covers the whole path from building a work to packaging and distributing it. The two join up: the tools generate code fragments, and the editor documentation shows how to put them into a map and publish it.
