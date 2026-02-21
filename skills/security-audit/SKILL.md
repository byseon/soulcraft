---
name: security-audit
description: Systematic security review checklist. Use when auditing code, auth flows, or dependencies. Triggers on "security audit", "vulnerability check", "security review".
tools: Read, Glob, Grep
---
## Security Audit Checklist

Run through each category and report findings:

### 1. Authentication
- [ ] No hardcoded secrets or API keys
- [ ] JWT tokens have expiration
- [ ] Password hashing uses bcrypt/argon2 (not MD5/SHA)
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection enabled

### 2. Input Validation
- [ ] All user inputs sanitized
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] File upload validation (type, size, content)

### 3. Dependencies
- [ ] No known CVEs in lockfile
- [ ] No unnecessary dependencies
- [ ] Dependencies pinned to specific versions

### 4. Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced
- [ ] No sensitive data in logs
- [ ] PII handling compliant

### 5. Infrastructure
- [ ] Environment variables for config
- [ ] Least-privilege access controls
- [ ] Error messages don't leak internals

## Report Format
Rate each finding: CRITICAL / HIGH / MEDIUM / LOW / INFO
Include: file path, line number, description, recommended fix.
