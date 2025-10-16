# Repository Overview

- **Primary Stack**: HTML, CSS, JavaScript
- **Entry Points**:
  - `index.html`: Main landing page markup.
  - `style.css`: Global styling for the landing page.
  - `app.js`: Client-side behavior and dynamic content updates.
- **Assets**:
  - `ProfilePic.jpeg`: Profile image displayed on the landing page.
  - `fonts/GTA/`: Custom font files in multiple weights.

# Conventions & Notes

- **Layout**: Single-page portfolio layout highlighting profile, goals, and contact information.
- **Styling**: Primarily custom CSS with potential use of GTA font family.
- **JavaScript**: Enhances UI by updating dynamic fields such as current time (UTC) or other profile data.
- **Testing Hooks**: Several elements include `data-testid` attributes for automated testing.

# Suggested Practices

1. Keep the layout responsive with careful use of flex or grid.
2. Maintain consistent typography using the GTA font files.
3. Update `app.js` to reflect any new dynamic fields added to the DOM.
4. Preserve `data-testid` attributes for QA automation.