# Project Guidelines: AI Release Notes Demo

## Folder Structure & Artifact Organization

This project uses a structured output hierarchy to separate content from evaluation artifacts:

### Output Folder Organization

```
Output/
├── Release Notes/          # Primary deliverables: release notes markdown
│   └── release_notes_vX.X.X.md
├── Quality/                # Quality metrics & evaluation reports
│   └── evaluation_report_vX.X.X.md
```

### Artifact Types & Locations

| Artifact Type | Output Folder | Command | File Pattern |
|---|---|---|---|
| Release Notes | `Output/Release Notes/` | `/generate-release-notes` | `release_notes_vX.X.X.md` |
| Quality Evaluation | `Output/Quality/` | `/evaluate-release-notes` | `evaluation_report_vX.X.X.md` |

## Command Reference

### generate-release-notes
- **Purpose**: Transform developer tickets into user-centric release notes
- **Usage**: `generate-release-notes 2.4.0`
- **Output**: `Output/Release Notes/release_notes_v2.4.0.md`
- **Tools Used**: style-guide MCP server
- **Note**: Do NOT save evaluation reports here; use Output/Quality/ for quality artifacts

### evaluate-release-notes
- **Purpose**: Quality assurance and metrics reporting for release notes
- **Usage**: `evaluate-release-notes 2.4.0`
- **Output**: `Output/Quality/evaluation_report_v2.4.0.md`
- **Tools Used**: quality-metrics MCP server, style-guide reference
- **Note**: ALWAYS save evaluation reports in Output/Quality/, never in Release Notes

## Key Rules

1. **Content vs. Quality Separation**: Release notes (content) and evaluation reports (metadata about content) go in separate folders
2. **MCP Tool Structure Implies Output**: If a separate MCP server handles a task (style-guide, quality-metrics), its outputs typically go to separate folders
3. **Folder Creation**: Both Output/Release Notes/ and Output/Quality/ folders must be created on first use
4. **One Task = One Output**: Each command generates a single primary artifact in its designated folder

## Workflow

1. Generate release notes using `/generate-release-notes VERSION`
2. Evaluate output using `/evaluate-release-notes VERSION`
3. Review evaluation report in Output/Quality/
4. Publish release notes from Output/Release Notes/ if approved
