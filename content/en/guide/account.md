---
title: "Account and personal center"
description: "Signing in, your profile and level progression, and setting up and maintaining two-step verification"
order: 100
group: "usage"
updated: "2026-11-01"
---

## When you need an account

Local features — campaigns, custom content, replays, downloading from GitHub — need no account. An account is only needed for the official online services: Workshop downloads, the creator center, online calibration for weekly mutations, and experience and check-in.

The avatar at the bottom of the sidebar is the entry point. It shows your nickname, or Not signed in. It only appears while Settings → Feature management → SCNexus official services is on; with the official services off, the account page only says the official services are disabled and can be turned back on in the settings, while local features keep working.

## Signing in, signing up and resetting a password

Signed out, the page has three modes: sign in, sign up and forgot password.

| Case | What you fill in |
| --- | --- |
| Sign in | Email, password |
| Sign up | Email, password, device name, six-digit code, invitation code (required or not depends on the server's sign-up policy) |
| Forgot password | Email, new password, device name, six-digit code |

A few rules that matter in practice:

- The email is 3–254 characters and must contain `@` and a domain dot.
- A sign-in password is 1–128 characters; signing up and resetting require 8–128 characters with upper case, lower case, digits and an ASCII special character.
- Request code has a cooldown of at least 60 seconds, and the button counts the remaining seconds down. A code being accepted does not mean the mail was delivered; if nothing arrives, wait for the cooldown and request another.
- The code is six digits and the interface shows how long it stays valid.

A successful sign-in reports that you are signed in; a successful reset reports that the password was reset and asks you to sign in again, returning to the sign-in mode.

When the account has [two-step verification](#two-step-verification) enabled, signing in needs a second step: choose a six-digit code from the authenticator or a recovery code, and only then are you actually signed in. The verification window stays valid for 300 seconds.

## Account details

- **Nickname**: editable, 8–16 characters, no spaces, emoji or hyphens. On success it reports that the nickname was updated.
- **Email**: display only; the current version offers no way to change it.
- **User ID**: select Show ID to copy it. Including it when reporting a problem speeds up the investigation.

## Experience and levels

The personal center shows your current level, total experience and a progress bar. The thresholds are 100 / 600 / 2000 total experience, mapping to LV0 through LV3; LV3 is the current maximum, and experience keeps accumulating after that.

**Daily check-in**: the description reads that it resets at 00:00 Beijing time every day and that the first check-in earns 10 experience. Select Check in and it is done; once you have checked in for the day the button reads Checked in and is disabled. Afterwards it reports the check-in succeeded and how much experience you earned.

If the experience information cannot be loaded it says experience is temporarily unavailable and to refresh; check-in is unavailable at the same time.

## Two-step verification

The Account security group on the Account details card manages two-step verification. The status reads two-step verification enabled or not enabled, along with how many recovery codes are left.

### Enabling

Select Enable two-step verification and the dialog shows a QR code and a Base32 secret for your authenticator. Scan it or type the secret, enter the six-digit code, and select Confirm and enable.

Enabling requires that you **signed in within the last five minutes**; if that window has passed it asks you to sign out, sign in again and retry.

On success you land on the recovery codes page: the codes are **shown only this once**, each works only once, and Finish stays disabled until you tick that you have saved them securely. Keep them somewhere like a password manager — they are the only way back in if you lose the authenticator.

### Day-to-day maintenance

Once it is enabled there are four more actions, each of which first needs a recent verification (a code or a recovery code, valid for up to 5 minutes):

| Action | Effect |
| --- | --- |
| Verify the current session | Only marks this session as verified; changes no credentials |
| Regenerate recovery codes | All old codes stop working immediately and other sessions are revoked; the authenticator is unchanged |
| Replace the authenticator | Rebinds it; the old authenticator still works until you confirm, after which the old authenticator, the old recovery codes and other sessions all stop working |
| Disable two-step verification | The account loses its second factor, every session and recovery code stops working, and you have to sign in again |

When the recovery codes run out it warns that they are exhausted and suggests generating new ones after verifying — at that point, losing the authenticator as well means the account cannot be recovered, so top them up early.

## Signing out

Sign out at the bottom of the page clears the local credentials. If revoking the remote session fails it reports that you are signed out locally and that the remote revocation was not confirmed; in that case there is nothing left on the device but the server session may still exist, so changing the password from another device is the fallback.

Turning SCNexus official services off also clears the local sign-in state, and you have to sign in again after turning them back on.
