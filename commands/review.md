---
name: review
description: Run a security + QA review by invoking Boa and Tea on a branch or feature. Usage: /soulcraft:review {branch-name or file-path}
---
Run a review cycle on: $ARGUMENTS

Steps:
1. Parse argument as a branch name or file/directory path
2. Identify what files to review:
   - If branch: `git diff main...{branch} --name-only`
   - If file/dir: the specified path(s)
3. Invoke Boa (security auditor) on the target:
   - Boa uses the security-audit skill
   - Boa has READ ONLY tools — cannot modify anything
   - Collect Boa's findings with severity ratings
4. Invoke Tea (QA) on the target:
   - Tea checks test coverage, edge cases, quality
   - Tea can write new test files if gaps found
5. Compile a combined review report:

```
# Review: {target}
Date: {date}

## Security (Boa)
{findings with severity: CRITICAL / HIGH / MEDIUM / LOW / INFO}

## Quality (Tea)
{findings: test coverage, edge cases, code quality}

## Summary
- Critical issues: {count}
- Action items: {list}
```

6. If any CRITICAL findings, flag prominently
7. Update shared/TASK_BOARD.md if new tasks needed

Example:
- /soulcraft:review koah/scoring-v2
- /soulcraft:review src/api/scoring.ts
