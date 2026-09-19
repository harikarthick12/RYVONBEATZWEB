---
name: RYVON BEATZ
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#8d4a59'
  on-secondary: '#ffffff'
  secondary-container: '#fea9ba'
  on-secondary-container: '#7a3b4a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b17'
  on-tertiary-container: '#88837d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffd9df'
  secondary-fixed-dim: '#ffb1c0'
  on-secondary-fixed: '#3a0718'
  on-secondary-fixed-variant: '#713342'
  tertiary-fixed: '#e8e2da'
  tertiary-fixed-dim: '#cbc6bf'
  on-tertiary-fixed: '#1d1b17'
  on-tertiary-fixed-variant: '#494641'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: '600'
    lineHeight: '1.05'
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.15'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels high-end hardware minimalism combined with streaming-grade media immersion. The brand personality is uncompromising, refined, and tactileâ€”treating digital audio interfaces with the meticulous craftsmanship of physical audio gear. 

The aesthetic synthesizes the clean typographic whitespace of Apple product pages with the dark-mode immersive density of Spotify, the architectural precision of Sonos, and the industrial playfulness of Teenage Engineering. The UI evokes a sense of quiet luxury, absolute focus on acoustic fidelity, and tactile control.

## Colors

The palette is anchored by a warm off-white canvas (`#FAF9F6`) that avoids the sterile clinical feel of pure white, paired with deep charcoal (`#171717`) for high-legibility primary text. Secondary elements utilize a sophisticated warm stone gray (`#77736D`). 

The strategic accent is a muted rose burgundy (`#B56B7B`), used sparingly for active playback states, live indicators, and primary action triggers. Structural elements rely on subtle, low-contrast borders (`#EAE7E1`) to delineate surfaces without heavy lines. High-impact dark sections (`#171717`) are reserved for immersive media players and fullscreen video/audio viewports.

## Typography

Typography pairs the hyper-clean technical precision of Geist for headlines with the exceptional screen legibility of Inter for body copy. Headlines feature tight tracking and expansive scale contrast, creating editorial weight reminiscent of physical art direction. 

Body text prioritizes generous line height (`1.5` to `1.6`) to maintain readability across dense tracklists, metadata, and lyrics views. Labels use subtle uppercase tracking for structural UI elements, reinforcing the industrial hardware aesthetic.

## Layout & Spacing

This design system uses a fluid grid system optimized for Android mobile form factors, scaling seamlessly to tablets and desktop clients. The layout relies on generous outer margins (`1.25rem` minimum) to prevent edge-to-edge crowding, giving album art, lists, and controls room to breathe.

Component spacing adheres to a strict 4px base rhythm, favoring comfortable touch targets (minimum 48dp for primary interactive elements). Content reflows gracefully from single-column vertical tracklists on mobile to multi-column grid layouts for artist discovery and album browsing on larger screens.

## Elevation & Depth

Visual hierarchy relies primarily on tonal layering and low-contrast outlines rather than heavy drop shadows. Surfaces stack cleanly using pure white cards (`#FFFFFF`) against the warm off-white canvas (`#FAF9F6`), separated by hair-thin borders (`#EAE7E1`). 

When elevation is requiredâ€”such as for floating mini-players, bottom sheets, or active modal dialogsâ€”use ultra-diffused, low-opacity ambient shadows tinted with the primary dark tone (`#171717` at 4-8% opacity) to maintain a soft, tactile separation.

## Shapes

The shape language is purposefully balanced (`roundedness` level 2), utilizing a soft standard radius (`0.5rem`) for cards, input fields, and standard containers. Interactive triggers and album art containers lean into gentle curves (`0.75rem` to `1rem`), while pill shapes are reserved exclusively for filter chips, tags, and queue badges. Avoid sharp 0px corners except for precise technical data readouts or video viewports.

## Components

### Buttons
Primary buttons feature solid primary dark backgrounds (`#171717`) with crisp white text, or accent fills (`#B56B7B`) for primary music actions (e.g., "Play All", "Subscribe"). Secondary buttons use ghost styling with subtle borders and hover surface states. Ensure all touch targets meet a minimum height of 48px.

### Chips & Tags
Pill-shaped filters for genre selection, stream quality indicators, and playlist categories. Inactive chips use surface white with border outlines; active states invert to primary dark or muted rose fills.

### Lists & Track Rows
Generously padded rows featuring left-aligned album art thumbnails, bold track titles, secondary artist metadata, and trailing action icons (lyrics, queue, options). Hover and active states reveal subtle tonal shifts.

### Input Fields
Clean search and playlist naming inputs featuring surface white backgrounds, light borders (`#EAE7E1`), and soft rounded corners. Focus states transition smoothly to the primary dark border with a subtle shadow ring.

### Cards
Used for albums, artist profiles, and video thumbnails. Clean surface containers with subtle border containment and zero drop shadow by default, translating high-end print design to UI.

### Specialized Components (Music Player Specific)
- **Mini-Player & Expanded Player:** Seamless floating bottom bar that expands into a deep immersive viewport using the dark section background (`#171717`).
- **Waveform Seekbars:** Minimalist, high-precision track progress indicators with smooth needle animation.
- **Lyrics Viewport:** Centered, kinetic typography layout highlighting the active vocal line with high contrast, fading surrounding lines into secondary text tones.
