---
name: code-review
description: Structured code review process. Use when reviewing PRs, checking code quality, or evaluating implementations. Triggers on "review", "PR", "code quality", "check this code".
---
## Code Review Checklist

### Correctness
- Does it do what it's supposed to?
- Edge cases handled?
- Error handling complete?

### Quality
- Clear naming conventions?
- Functions are single-responsibility?
- No code duplication?
- Comments explain WHY, not WHAT?

### Testing
- Tests cover happy path + edge cases?
- Tests are deterministic (no flaky tests)?
- Mocks are appropriate?

### Performance
- No N+1 queries?
- No unnecessary re-renders (frontend)?
- No memory leaks?

### Security
- Input validated?
- No hardcoded secrets?
- Auth checks in place?

## Review Format
For each finding:
- **File**: path/to/file.ts:42
- **Severity**: blocker / suggestion / nit
- **Comment**: What and why
- **Suggestion**: How to fix (if applicable)
