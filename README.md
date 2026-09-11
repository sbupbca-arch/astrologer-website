# Joshi Madam Astrology Website

This is a premium, modern, responsive single-page website for an Indian Astrologer, built according to strict guidelines: no unnecessary frameworks, semantic HTML5, CSS3, Vanilla JavaScript, and Bootstrap 5.

## File Structure

- `index.html`: The main single-page layout.
- `css/style.css`: All custom design system styles and overriding CSS.
- `js/main.js`: Interactive functionality (sticky nav, smooth scroll, form mock, gallery modal).
- `images/`: High-quality generated imagery.

## How to Run

Because this is a pure frontend static website, simply open `index.html` in any modern web browser.
For the best experience, you can serve it via a local development server (e.g., VS Code Live Server, or Python's `python -m http.server`).

## Managing Placeholder Content

Search the HTML file for the following placeholders to update the content to real details:

1. **Astrologer Name**: Search for `Joshi Madam`
2. **Phone Number**: Search for `[PHONE_NUMBER]`
3. **WhatsApp Number**: Search for `[WHATSAPP_NUMBER]`
4. **Email Address**: Search for `[EMAIL_ADDRESS]`
5. **Business Address**: Search for `[BUSINESS_ADDRESS]`
6. **Images**: 
   - `images/hero_bg.jpg`
   - `images/astrologer.jpg`
   - `images/gallery_1.jpg`
   Replace these in the `images` folder, or update the `src` paths in the HTML.
7. **Testimonials**: Search for `[Placeholder Testimonial]` to replace with authentic reviews.
8. **Services**: Update the `.service-card` blocks inside the `#services` section.
9. **Google Map**: Look for the `Google Maps Integration Placeholder` div near the bottom of the contact section and replace it with an iframe embed from Google Maps.

## Translation Integration

The website includes a beautiful, functional language selector in the navbar.
In `js/main.js`, there is a clear architecture hook documented where you can attach the **Google Cloud Translation API** (or any other i18n solution).
The current implementation captures the language change event and provides a placeholder alert to demonstrate where the integration happens, completely avoiding deprecated Google Translate widgets.
