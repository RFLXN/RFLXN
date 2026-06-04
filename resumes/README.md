# Resumes

React + TypeScript + MDX resume workspace that renders an A4 PDF with Nix-provided Chromium.

## Development

Enter the shell:

```sh
nix develop
```

Or allow direnv:

```sh
direnv allow
```

Render the resume:

```sh
npm install
npm run render:preview
```

Develop the MDX resume:

```sh
npm run dev
```

The page shell lives in `src/content/resume.mdx`, editable MDX sections live in `src/content/resume/`, reusable resume primitives live in `src/components/resume/`, and the original A4 styling lives in `src/styles.css`.
