---
title: "Smart Assistant"
description: "A controlled MCP service connecting local data to AI clients on the same machine"
order: 90
group: "usage"
updated: "2026-11-01"
---

## What it is

SCNexus can start an MCP service that **listens only on loopback**, letting your AI client (any desktop tool that supports MCP) query local campaigns, works, download tasks and weekly mutation data, and activate or uninstall campaigns once you approve it.

The service is off by default and never starts with the app; you start it by hand each time. It has nothing to do with your account or the official online services and needs no sign-in.

## Starting the service

1. Open Settings → Feature management and turn on Smart Assistant; only then does Smart Assistant appear in the sidebar.
2. Go to Smart Assistant → Service configuration and check the port (`17861` by default, anything from 1024 to 65535).
3. Select Start service and the status badge switches to running.

There are three ways to stop it: select Stop service, turn the switch off in Feature management, or quit the app.

If the port is taken it reports that the port is in use and to pick another one; choose a different port and start again.

## Connecting a client

The service lives at `http://127.0.0.1:<port>/mcp` and requires a token:

1. Select Show token to read it, or Copy token to copy it directly.
2. Select Copy connection configuration to get JSON you can paste straight into your client's configuration:

```json
{
  "mcpServers": {
    "scnexus": {
      "type": "http",
      "url": "http://127.0.0.1:17861/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

The token is regenerated every time the app starts and only ever lives in memory. Restarting the app or selecting Regenerate token invalidates the old configuration immediately, so copy it again; regenerating also disconnects every connected client.

## Tools it exposes

| Tool | Purpose | Permission |
| --- | --- | --- |
| Get app status | Read the app and game configuration state | Read-only |
| List campaigns | Browse installed campaigns | Read-only |
| Get campaign details | Look up one campaign by its local identifier | Read-only |
| List custom content | Browse installed maps and mods | Read-only |
| List downloads | See summaries of visible download tasks | Read-only |
| Get task status | Check the progress of one task | Read-only |
| Search mutators | Search and page through mutators | Read-only |
| Get weekly mutation | See the current week's mutation for a region | Read-only |
| Activate campaign | Activate an installed campaign when there are no conflicts | Writes game files |
| Switch campaign | Restore the current campaign, then activate the target | Writes game files |
| Restore campaign | Deactivate a campaign and restore the original files | Writes game files |
| Uninstall campaign | Remove an installed campaign | Writes game files |

Every modifying tool asks for confirmation in a dialog by default. Each of the four campaign cards — activate, switch, restore, uninstall — offers Always approve automatically, which first shows a risk confirmation; even then, **file conflicts still have to be handled by hand in the app**, and automatic approval only skips the tool-level confirmation for that one tool.

## Activity log

The Activity log page keeps the last 500 entries, in memory only: tool name, status (running / succeeded / failed / cancelled), start time and duration. **Request parameters are never recorded**, and the log is cleared when the app restarts. For durable logs, use Settings → Logging & privacy → Log directory.

## Security boundaries

The service is deliberately narrow, and knowing these saves time when troubleshooting:

- It listens on `127.0.0.1` only and never accepts outside connections.
- Every request must carry `Authorization: Bearer <token>`; a wrong token gets a 401 straight away.
- `Host` must be a local address, and requests carrying an `Origin` header are rejected (403) — a browser page cannot call it, only a local client that sets its own headers.
- Only `POST /mcp` with `Content-Type: application/json` is accepted; request bodies are capped at 64 KiB and concurrency at 16.
- It offers no arbitrary command execution, arbitrary file access or ability to start downloads.
