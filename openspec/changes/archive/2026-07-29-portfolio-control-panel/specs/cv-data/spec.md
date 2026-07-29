## ADDED Requirements

### Requirement: Typed CV data export

The file `src/content/cv.ts` SHALL export typed arrays for professional experience, technical skills, and education, with TypeScript interfaces defining the shape of each data type.

#### Scenario: Experience data is typed
- **WHEN** the CV data module is imported
- **THEN** the experience array is typed as `Experience[]` with fields for company, role, startDate, endDate, location, and responsibilities

#### Scenario: Skills data is typed
- **WHEN** the CV data module is imported
- **THEN** the skills array is typed as `SkillCategory[]` with fields for category name and list of skill strings

#### Scenario: Build fails on type mismatch
- **WHEN** a required field is missing from a CV data entry
- **THEN** `npx astro check` reports a type error

### Requirement: Content derived from inputs/cv.typ

The CV data in `src/content/cv.ts` SHALL accurately reflect the professional information present in `inputs/cv.typ`.

#### Scenario: All experience entries are present
- **WHEN** the CV data is inspected
- **THEN** every job entry from `inputs/cv.typ` (Interbank, Prisma, Tiendanube, Walmart/Dorinka, Tsoft, Monsun, Dthink) is represented

#### Scenario: All skill categories are present
- **WHEN** the CV data is inspected
- **THEN** all skill categories from the Typst CV are represented with their respective skills

### Requirement: Single source of truth

Components SHALL read professional data exclusively from `src/content/cv.ts`. No hardcoded professional data SHALL exist in components.

#### Scenario: Components import from cv.ts
- **WHEN** any component needs experience or skills data
- **THEN** it imports from `src/content/cv.ts` rather than defining the data inline
