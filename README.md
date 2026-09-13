# Mangalore Fashion Survey

## Files
- `index.html` — survey structure
- `styles.css` — visual design
- `survey.js` — survey logic, adaptive product/style/price questions and submission
- `Code.gs` — Google Apps Script backend
- `README.md` — setup guide

## GitHub Pages
Upload all frontend files to the root of a GitHub repository:
- index.html
- styles.css
- survey.js

Enable GitHub Pages from the repository settings.

## Google Sheets backend
1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste `Code.gs`.
4. Save.
5. Deploy → New deployment → Web app.
6. Execute as **Me**.
7. Set access to **Anyone**.
8. Copy the deployed `/exec` URL.
9. Open `survey.js` and set:
   `const APPS_SCRIPT_URL = "YOUR_EXEC_URL";`
10. Push the updated `survey.js` to GitHub.

Do not put Google API keys, service-account credentials, or private tokens in the frontend.

## Custom domain
In GitHub Pages, add your custom domain and enable HTTPS. For an independent survey subdomain, a setup such as `survey.yourdomain.in` is clean.

## Important
The frontend is intentionally anonymous by default. The final contact field is optional.

## UI revision
The landing screen is removed from the DOM when the respondent starts the survey, so its headline cannot appear on subsequent survey screens.

## Navigation behavior
All survey screens are freely traversable. Respondents may continue without answering, use Back to correct previous answers, and submit without completing every field. The submission contains whatever answers are present.
