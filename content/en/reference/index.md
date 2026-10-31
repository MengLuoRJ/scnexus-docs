---
title: "Overview"
description: "The packaging and source conventions that importing, installing and distributing content depends on."
order: 1
group: "reference"
updated: "2026-11-01"
---

This section collects the conventions SCNexus relies on when importing, installing and distributing content. They are not step-by-step instructions but the source of truth other pages point at: when writing a manifest, packaging a work, or debugging a failed import, these definitions are what count.

- [SCNexus package standard](/reference/scnexus-package): the fields of `package.json`, how `Maps` / `Mods` resources are declared, how the launcher and bundled documents are written, and how validation is layered.
- [CCM package standard](/reference/ccm-package): the key-value format of `metadata.txt`, the directory layout and install targets, and how SCNexus reads these packages.
- [GitHub source standard](/reference/github-source): the manifest and structural requirements a public repository has to meet to serve as an install source.

## Which one to read

| Your situation | Where to look |
| --- | --- |
| Building something new and packaging it so SCNexus can install it directly | SCNexus package standard |
| You have a CCM-era campaign package and want to know where it will end up | CCM package standard |
| You want the work on GitHub so players can download it directly | GitHub source standard, plus the manifest fields |
| You are only importing a ready-made archive | [Campaign management](/guide/campaign), [Custom content](/guide/customize) |

The three standards sit side by side: the SCNexus standard is the recommended format today and can express campaigns, custom content and shared mod packages; the CCM standard is read for compatibility with older works and describes campaigns only; a GitHub source is not a third format at all — it simply uses a repository packaged to the SCNexus standard as a download location, so the manifest rules are identical.

## Related pages

For the packaging workflow, directory layout and the usual pitfalls, see [Packaging a work](/editor/packaging); for the player-side import, installation and activation, see [the app documentation](/guide); for authoring content in the editor, see [the editor documentation](/editor).

The naming rules for interface strings and the translation conventions are not here — see [Translating the interface](/guide/localization).
