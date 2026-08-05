# Changelog

All notable changes to this project will be documented in this file.

---

## v0.4.0 - Multi-Calendar Support

### Added
- Support for multiple Google Calendars
- Varsity, JV, and Freshman schedules loaded simultaneously
- Frosh/Soph calendar support (configurable)
- Unified `Game` model used throughout the application
- Chronological sorting across all calendars
- Plain text schedule renderer

### Changed
- Event titles are parsed into structured game objects
- Rendering now uses normalized data instead of raw Google Calendar events

---

## v0.3.0 - Game Model

### Added
- `model.js`
- Event normalization
- Title parser
- Home/Away detection
- Opponent extraction

---

## v0.2.0 - Google Calendar Integration

### Added
- Google Calendar API integration
- API key configuration
- Calendar event retrieval
- GitHub Pages deployment
- Favicon support

---

## v0.1.0 - Project Setup

### Added
- Initial project structure
- ES module architecture
- GitHub repository
- Basic renderer
