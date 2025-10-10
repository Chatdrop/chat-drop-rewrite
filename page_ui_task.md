
### UI Page Cloning Process (Rewrite Project)

#### Goals
- Recreate original screens visually 1:1 in the rewrite app.
- Avoid business logic unless explicitly requested; focus on layout, assets, and styling.

#### Inputs Needed
- Original page file path (e.g., `src/routes/.../index.js`).
- Any referenced assets (images, videos, svgs) and shared components.
- Theme and typography configs in the rewrite (`src/config/themeConfig.js`, `src/config/fontConfig.js`, `src/config/styleConstants.js`).

#### Process
1. Inspect original page
   - Read the original screen component to understand structure, imported assets, and shared components.
   - Note texts, layout hierarchy, spacing, and visual cues (colors, borders, sizes).

2. Inventory assets and dependencies
   - Collect all assets used by the page: images, videos, svg icons.
   - Check for external components (e.g., `StyledText`, `TextButton`, `StyledTextInput`).

3. Prepare assets in the rewrite
   - Create required directories under `src/assets/` (e.g., `login-background`, `video`, `svg`).
   - Copy assets from the original into the equivalent folders.
   - If the original used React components for SVGs, convert to plain `.svg` files and import them directly (svg transformer is enabled).

4. Ensure shared components exist
   - If the page references shared components that don’t exist, implement minimal versions in `src/components/` that match the original props and styling surface.
   - Keep implementations theme-aware via React Navigation’s theme.

5. Implement layout-only version of the page
   - Recreate the visual structure and styles. Do not add state, business logic, or navigation unless requested.
   - Stub functions (e.g., `skipOnboarding`) when a callable is required for layout.

6. Fix imports and asset paths
   - Use correct relative paths from the page file (count `../` levels carefully).
   - Import svgs via their `.svg` files (e.g., `import Logo from '.../logo.svg';`).
   - For images/videos use `require('relative/path')` so Metro bundles them.

7. Apply theme, typography, spacing
   - Use `useTheme()` for colors (`theme.colors.text`, `theme.colors.background`, `theme.colors.primary`).
   - Use `fonts` and `globalFontStyle` from `fontConfig` via shared text components.
   - Use `styleConstants` for padding, radii, and consistent sizing.

8. Match buttons and interactive elements visually
   - Replicate button shapes, padding, and colors. Prefer passing `backgroundColor`, `borderColor`, `borderWidth`, etc., to shared button components.
   - Text color should provide contrast against button backgrounds (e.g., dark text on light buttons).

9. Validate
   - Resolve import errors (module resolution).
   - Run linter on edited files; fix basic issues.
   - Visually compare with the original screen.

10. Optional wiring
   - If requested, minimally wire navigation or placeholder callbacks only; keep logic out by default.

#### Per-Page Checklist
- [ ] Read original page and list needed assets/components
- [ ] Copy/create assets under `src/assets/...`
- [ ] Ensure shared components exist or add minimal versions
- [ ] Recreate layout (no state/logic unless asked)
- [ ] Correct relative imports and `require(...)` paths
- [ ] Import svgs as `.svg` files
- [ ] Apply theme colors, fonts, spacing
- [ ] Match button visuals (backgrounds, radii, padding, contrast)
- [ ] Lint and verify visual parity

#### Conventions
- Use `StyledText` for all text to inherit fonts and theme color.
- Keep components stateless unless the task requires behavior.
- Prefer theme values over hardcoded colors; only hardcode when it’s part of the brand mark or asset.
- Keep edits localized to the page and shared components; avoid app-wide changes unless necessary.


