# Sovereign Beta Test Plan

This document lists Sovereign's use cases and the manual tests that check each one, covering both the "happy" path (everything goes right) and the "sad" paths (something goes wrong). The tests are run on the live site before the Beta showcase.

- **Live site:** https://sovereign-one-sigma.vercel.app
- **Note:** sign-in only works from that exact address. Other Vercel addresses for the project reject it with "Invalid origin".
- **Before testing:** open the site and wait for it to load. The API is on Render's free plan, so the first request after a quiet period can take up to a minute.

<br>

## Use Cases

### UC1 - Create an Account

- **Actor:** A new visitor
- **Preconditions:** The visitor is signed out and on `/register`.
- **Main Flow:** The visitor enters a username, email, password, and confirmation, then clicks "Let's get it!".
- **Postconditions:** The account is created, the visitor is signed in, and the Dashboard shows their username at level 1 with no progress.
- **Exception Flows:** A field is empty or invalid, the passwords don't match, the username or email is already taken, or the server can't be reached. The visitor sees a clear message and stays on the form.

### UC2 - Sign In

- **Actor:** A user with an account
- **Preconditions:** The user is signed out and on `/login`.
- **Main Flow:** The user enters their email or username and password, then clicks "Sign In".
- **Postconditions:** The user lands on the Dashboard, or on the page they were trying to open before being sent to Login.
- **Alternate Flow:** The user signs in with their username in any capitalization.
- **Exception Flows:** The details are wrong, too many attempts are made in a short time, or the server can't be reached. The user sees a message that doesn't reveal whether the account exists.

### UC3 - Protected Pages and Log Out

- **Actor:** Any visitor
- **Main Flow:** A signed-in user opens the menu on the Dashboard to log out and is returned to Login.
- **Postconditions:** The session is ended. Visiting `/dashboard`, `/skill-tree`, or `/profile` while signed out sends the visitor to Login.
- **Alternate Flow:** A signed-in user who opens `/login` or `/register` is sent to the Dashboard.

### UC4 - Master a Skill Node

- **Actor:** A signed-in user
- **Preconditions:** The user is on the Skill Tree page.
- **Main Flow:** The user selects an available node, reads its details, and clicks "Mark as Mastered".
- **Postconditions:** The node shows as mastered, XP and level update, and the nodes it unlocks become available without a page reload.
- **Alternate Flow:** The user selects a locked node. The panel explains that its prerequisites aren't met, and no button is shown.
- **Exception Flow:** The server can't be reached. An error appears under the button and the user's progress doesn't change.

### UC5 - Complete a Daily Quest

- **Actor:** A signed-in user
- **Preconditions:** The user is on the Dashboard.
- **Main Flow:** The user clicks an unchecked quest.
- **Postconditions:** The quest is checked, 50 XP is added, and the level goes up when the XP bar fills.
- **Exception Flows:** The quest is already complete for today, so it can't be clicked again, or the server can't be reached and an error appears under the quests.

### UC6 - Review Progress

- **Actor:** A signed-in user
- **Main Flow:** The user views the Dashboard and Profile.
- **Postconditions:** The Dashboard shows level, XP, skills mastered (for example 3 / 8), the next skill, and recent achievements with dates. The Profile shows the user's name, level, XP to the next level, and every mastered skill.
- **Blank State:** A new user sees helpful messages, like "Master a skill to see it here", instead of empty panels.

<br>

## Test Checklist

Mark each result as Pass or Fail, and write down anything unexpected in the Notes column. All 36 tests passed on the live site on November 20, 2026. Use a throwaway email address for test accounts, since accounts on the live site are real.

### Accounts (UC1 - UC3)

| ID | Path | Steps | Expected Result | Result | Notes |
|----|------|-------|-----------------|--------|-------|
| T1 | Happy | Register with a new username, email, and an 8+ character password | Lands on the Dashboard showing the username at level 1 | Pass | |
| T2 | Sad | Submit the Register form empty | "Please fill in every field." | Pass | |
| T3 | Sad | Register with the username `ab` | "Usernames need to be between 3 and 30 characters." | Pass | |
| T4 | Sad | Register with the username `bad name!` | "Usernames can only use letters, numbers, underscores (_), and dots (.)." | Pass | |
| T5 | Sad | Register with the email `not-an-email` | "Please enter a valid email address." | Pass | |
| T6 | Sad | Register with a 5 character password | "Passwords need at least 8 characters." | Pass | |
| T7 | Sad | Register with passwords that don't match | "Passwords don't match." | Pass | |
| T8 | Sad | Register with the T1 username but a new email | "That username is taken. Please try another." | Pass | |
| T9 | Sad | Register with a new username but the T1 email | "An account with that email already exists. Try signing in instead." | Pass | |
| T10 | Happy | Log out from the Dashboard menu | Returns to Login | Pass | |
| T11 | Sad | While signed out, visit `/dashboard`, `/skill-tree`, and `/profile` | Each one sends you to Login | Pass | Checked on the live site |
| T12 | Sad | Sign in with the right email and the wrong password | "That email or username and password don't match." | Pass | |
| T13 | Sad | Sign in with a username that doesn't exist | The same message as T12 | Pass | |
| T14 | Happy | Sign in with the T1 username in all capitals | Signs in and shows the username as it was registered | Pass | |
| T15 | Happy | While signed out, visit `/profile`, then sign in | Lands on the Profile, not the Dashboard | Pass | |
| T16 | Alternate | While signed in, visit `/login` | Sent to the Dashboard | Pass | |
| T17 | Sad | Sign in with the wrong password 4 times quickly | "Too many attempts. Please wait a moment and try again." | Pass | |

### Skill Tree and Quests (UC4 - UC5)

| ID | Path | Steps | Expected Result | Result | Notes |
|----|------|-------|-----------------|--------|-------|
| T18 | Happy | As a new user, open the Skill Tree | Standard Pushup is available; the other 7 nodes are locked | Pass | |
| T19 | Happy | Select Standard Pushup | Its muscle group and description appear in the side panels | Pass | |
| T20 | Happy | Click "Mark as Mastered" | The node turns mastered, Diamond Pushup unlocks, level goes to 2, with no page reload | Pass | |
| T21 | Alternate | Select a locked node, like Full Planche | "Prerequisites not met" message and no button | Pass | |
| T22 | Happy | Refresh the page on the Skill Tree | Still signed in, and the mastered node is still mastered | Pass | |
| T23 | Happy | On the Dashboard, click "100 Pushups" | Check mark appears, and the XP bar moves | Pass | |
| T24 | Sad | Click the same quest again | Nothing happens; XP stays the same | Pass | |
| T25 | Happy | Complete quests until the XP bar fills | Level goes up and leftover XP carries over | Pass | |

### Progress and Pages (UC6)

| ID | Path | Steps | Expected Result | Result | Notes |
|----|------|-------|-----------------|--------|-------|
| T26 | Blank | As a new user, view the Dashboard | 0 / 8 skills mastered, the next skill is Standard Pushup, and "Master a skill to see it here." | Pass | |
| T27 | Happy | After mastering 2 nodes, view the Dashboard | 2 / 8, the next skill, and both nodes in Recent Achievements marked "Today" | Pass | |
| T28 | Blank | As a new user, view the Profile | "No skills mastered yet..." message | Pass | |
| T29 | Happy | After mastering 2 nodes, view the Profile | Name, level, XP to the next level, and both skills with their muscle groups | Pass | |
| T30 | Happy | Log out, sign back in, and check the Dashboard | All progress from earlier tests is still there | Pass | |
| T31 | Happy | Sign in on a phone or another browser | Shows the same progress | Pass | |
| T32 | Happy | Refresh directly on `/dashboard`, `/skill-tree`, and `/profile` | Each page loads instead of showing a 404 | Pass | Checked on the live site |
| T33 | Sad | Visit an unknown address, like `/nope` | Sent to the Dashboard if signed in, or Login if signed out | Pass | |

### Server Errors

These were tested locally by stopping the API, since the live API can't be stopped safely.

| ID | Path | Steps | Expected Result | Result | Notes |
|----|------|-------|-----------------|--------|-------|
| T34 | Sad | With the API stopped, sign in or register | "Can't reach the server. Please try again." and the button resets | Pass (local) | |
| T35 | Sad | With the API stopped, open a signed-in page | "Can't reach the server. Please try again." instead of a crash | Pass (local) | |
| T36 | Sad | With the API stopped, master a node or complete a quest | An error appears under the button or quests, and progress doesn't change | Pass (local) | |
