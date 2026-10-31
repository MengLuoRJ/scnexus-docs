---
title: "Weekly mutations"
description: "This week's mutation map, mutators and community rating, plus the full mutator reference"
order: 30
group: "usage"
updated: "2026-11-01"
---

## Page layout

Weekly mutations in the sidebar has two tabs:

- **This week**: the mutation scheduled for the current week.
- **Mutators**: the complete reference of mutators.

Refresh on the right re-fetches data for the active tab. On This week there is also a server switch: **CN / NA / EU / AS**, defaulting to CN.

## This week

The card shows the current week:

| Field | Description |
| --- | --- |
| Mutation name | The title line |
| Data status | Verified or projected from the rotation |
| Mission | The map used this week |
| Time | The active window in Beijing time |
| Last verified | When the server last confirmed this schedule |
| Active mutators | The mutators enabled this week |
| Community rating | The community's score for this mutation |

**The two data statuses mean different things**: verified means the server's verified data confirms this week's schedule; projected means it was inferred from the historical rotation, which typically happens before the official data for a new week is out, and can therefore be off.

When the data expires the card says this week's data has expired and that refreshing fetches the latest schedule; when the current time falls outside the server's validity window it says so explicitly. A server with no data at all shows that there is no schedule for this week.

## Mutators

This tab is the full reference. Search by name or description; the count of mutators sits next to the title. Each entry shows an icon, name and description, which is what lets you judge in advance where this week's mutation will be hard. A search with no hits reports that no mutators match.

## Online calibration and local data

Weekly mutations default to the local data and rules built into the app and need no sign-in. The app only asks the official services for a calibrated result when both of these hold:

1. Settings → Feature management → SCNexus official services is on;
2. the Weekly mutation online calibration sub-switch is on.

Turning calibration off does not stop you from viewing mutations; every result simply comes from local projection, and the card's status will not read verified.
