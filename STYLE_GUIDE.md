# Application Style Guide

Use one dark theme with a neutral grayscale palette and one blue accent. Reserve color for actions, status, and validation.

## Foundations

- IBM Plex Sans for interface text
- IBM Plex Mono for identifiers and technical values
- Soft off-white `foreground` text on near-black `background` surfaces; muted gray for supporting text
- `color-scheme: dark` so native controls render dark
- Derived colors (selection, tints) come from semantic tokens, never hardcoded values
- Tailwind spacing scale only
- Flat surfaces, subtle borders, and shadows only for floating overlays
- Floating overlays use a soft shadow with a hairline half-opacity border, never a full-strength outline
- Ten-pixel controls and twelve-pixel cards

## Page structure

- Every page opens with the shared `PageHeader` component (`app/components/page-header.tsx`): title, one line of supporting text, and an optional primary action slot.
- Page titles use `text-2xl sm:text-3xl font-semibold tracking-[-0.02em]`; do not hand-roll page headers.

## Components

- Use the existing shadcn variants for buttons and controls.
- Prefer Dialog for blocking tasks, Sheet for secondary side workflows, Dropdown Menu for actions, Tooltip for icon-only explanation, and Alert Dialog for irreversible confirmation.
- Buttons carry hover, pressed (`active:`), focus-visible, and disabled states on every variant.
- Place labels above form fields and validation next to the affected field.
- Use the project-owned Radix `Switch` primitive for binary settings.
- Use tables for comparable structured data and align technical values consistently.
- Pair semantic status colors with text or icons.
- Confirm completed actions with sonner toasts; one `Toaster` lives in the root layout.
- Format dates and calendar math with date-fns; keep ISO strings at boundaries.
- Preserve visible keyboard focus states and sufficient contrast.
- Every interactive element shows a hover state and the correct cursor (`cursor-pointer` on clickable controls, `cursor-not-allowed` when disabled).
- All text stays selectable, including read-only values; never `select-none` on textual content.
- Extract a shared component when the same visual pattern repeats (see `PageHeader`, sidebar `SidebarNavigationItem`).

Prefer fewer components, variants, surfaces, colors, and nested wrappers. The live reference is the Overview page at `/`.
