# El Modena Basketball Schedule

Responsive schedule application for the El Modena Vanguard Boys Basketball website.

The application is hosted with GitHub Pages and embedded into the main
ElMoHoops Wix website. Schedule data is retrieved from Google Calendar using
the Google Calendar API.

## Live Sites

Main website:

https://www.elmohoops.org/

Schedule application:

https://elmohoops.github.io/schedule/

The GitHub Pages application is intended primarily to be displayed inside
the Wix website rather than used as a standalone website.

## Architecture

The ElMoHoops website uses three services:

### Wix

Wix hosts the main public website:

https://www.elmohoops.org/

Wix controls the site navigation, page layout, registration links, sponsor
information, contact information, and other normal website content.

Several dynamic portions of the website are embedded as GitHub Pages
applications using Wix HTML/iframe elements.

### GitHub

GitHub hosts the custom web applications used by the website.

Organization:

https://github.com/elmohoops

Repositories:

- `schedule` - Game and event schedule
- `rosters` - Team rosters and coaching staffs
- `board` - Booster Board directory

Each application is hosted using GitHub Pages.

### Google

Google provides the data used by the GitHub applications.

The Schedule application reads from Google Calendar.

The Rosters and Booster Board applications read from Google Sheets.

This separation allows routine website updates to be made by editing Google
Calendar or Google Sheets without modifying application code.

## Schedule Data

Schedule information is maintained in Google Calendar.

The application supports separate calendars for the El Modena basketball
teams and combines their events into one chronological schedule.

Current team configuration includes:

- Varsity
- Junior Varsity
- Freshman

Team calendars can be enabled or disabled in `js/config.js`.

Calendar events can contain information such as:

- Date and time
- Opponent/event name
- Location
- Description

Locations are displayed as links to Google Maps when available.

## Google Calendar API

The application uses the Google Calendar API v3.

The API key is configured in:

`js/config.js`

The Google Cloud API key uses HTTP referrer restrictions.

The production GitHub Pages domain must therefore be included in the API
key's allowed website referrers:

`https://elmohoops.github.io/*`

If the application remains stuck on "Loading...", check the browser developer
console/network tab for Google Calendar API errors. A `403 Forbidden` response
often indicates that the current website URL is not included in the API key's
allowed HTTP referrers.

Do not remove API restrictions simply to resolve an API error.

## Repository Structure

```text
schedule/
├── assets/
├── css/
├── dev/
├── js/
│   ├── app.js
│   ├── calendar.js
│   ├── config.js
│   ├── model.js
│   ├── renderer.js
│   └── utils.js
├── index.html
└── README.md
