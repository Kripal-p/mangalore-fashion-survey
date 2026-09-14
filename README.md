# Generic Fashion Survey v3

- `index.html` — single HTML containing coming-soon intro and survey
- `styles.css` — white-background responsive styling
- `genericSurvey.js` — generic survey logic and submission
- `Code.gs` — Google Apps Script backend with updated columns

The survey is not Mangalore-only. Respondents can choose Mangalore/Mangaluru, Bangalore/Bengaluru, Both, or Another city.

Removed: last-purchase questions, fit/style/pattern screen, separate store-choice screen, separate location/travel screen, repeated negative-frustration questions.

Keep the existing Apps Script `/exec` URL. After updating `Code.gs`, redeploy the Web App as a new version while retaining the same URL if possible.

Note: Google Apps Script backend files should remain `.gs`; therefore the backend is named `Code.gs`, while the frontend file is `genericSurvey.js`.
//
