# Security Specification & Test-Driven Development (TDD)

This document defines the data invariants, security constraints, and adversarial test suites for the **느티울종합청소** application database.

## 1. Data Invariants

1. **Company Information (`/company/info`)**
   - **Structure**: Must be a single document at `/company/info`.
   - **Immutability**: No part of this is immutable, but it can only be modified by the authorized administrator.
   - **Public Read Access**: Public read access is allowed since this is the public company business contact information (not private user PII).
   - **Write Constraint**: Only an authenticated administrator with the verified email `johyun3662@gmail.com` can create or update this document.

2. **Portfolio Items (`/portfolio/{portfolioId}`)**
   - **Structure**: Documents containing past project details and blog links.
   - **ID Hardening**: The `{portfolioId}` must be a valid ID matching `^[a-zA-Z0-9_\-]+$` and under 128 characters.
   - **Immutability**: `createdAt` is immutable and must match the server timestamp on creation.
   - **Public Read Access**: Allowed for all users.
   - **Write Constraint**: Only an authenticated administrator with the verified email `johyun3662@gmail.com` can write or delete these documents.

3. **Global Administrative Privilege**
   - Administrators are strictly identified by their authenticated verified email address `request.auth.token.email == 'johyun3662@gmail.com'` and `request.auth.token.email_verified == true`.
   - Client-side credentials or custom claims are NOT trusted. All operations must verify the auth context securely on the server.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following 12 payloads are designed to attack the system. The Firebase security rules must mathematically reject all of these writes with `PERMISSION_DENIED`.

### Attack Vector A: Identity Spoofing & Privilege Escalation
1. **Payload 1: Unauthenticated Write to Company Info**
   - *Description*: Attempt to write to `/company/info` without being logged in.
   - *Result*: `PERMISSION_DENIED`
2. **Payload 2: Wrong Admin Email Write**
   - *Description*: Authenticated user with email `attacker@gmail.com` attempts to write to `/company/info`.
   - *Result*: `PERMISSION_DENIED`
3. **Payload 3: Unverified Email Admin Spoofing**
   - *Description*: Authenticated user with email `johyun3662@gmail.com` but `email_verified == false` attempts to write.
   - *Result*: `PERMISSION_DENIED`

### Attack Vector B: Resource & ID Poisoning
4. **Payload 4: Malicious Portfolio ID Injection (Over-length)**
   - *Description*: Attempt to write to `/portfolio/very-long-id-...` (size > 128 chars).
   - *Result*: `PERMISSION_DENIED`
5. **Payload 5: Malicious Characters in ID**
   - *Description*: Attempt to write to `/portfolio/some$bad#id`.
   - *Result*: `PERMISSION_DENIED`
6. **Payload 6: Denial-of-Wallet String Flooding**
   - *Description*: Attempt to write a 2MB description string to a portfolio item.
   - *Result*: `PERMISSION_DENIED`

### Attack Vector C: Schema & Integrity Breaches
7. **Payload 7: Shadow Field Insertion ("Ghost Field")**
   - *Description*: Attempt to write a portfolio item containing a non-existent property `isAdminUser: true`.
   - *Result*: `PERMISSION_DENIED`
8. **Payload 8: Type Mismatch Injection**
   - *Description*: Send `beforeImage` as an array or boolean instead of a string.
   - *Result*: `PERMISSION_DENIED`
9. **Payload 9: Missing Required Fields**
   - *Description*: Attempt to create a portfolio item without the required `title` or `category` fields.
   - *Result*: `PERMISSION_DENIED`

### Attack Vector D: Temporal & State Shortcutting
10. **Payload 10: Client-Generated Timestamp Spoofing**
    - *Description*: Send `createdAt` as a hardcoded past/future timestamp instead of `request.time`.
    - *Result*: `PERMISSION_DENIED`
11. **Payload 11: Immutable Field Modification**
    - *Description*: Try to update the `createdAt` timestamp on an existing portfolio item.
    - *Result*: `PERMISSION_DENIED`
12. **Payload 12: Invalid Link Injection (Value Poisoning)**
    - *Description*: Try to write a non-URL or excessively large string (e.g. 500KB string) to `afterImage` (link).
    - *Result*: `PERMISSION_DENIED`

---

## 3. Test Runner Definitions

A virtual test runner `firestore.rules.test.ts` is implemented conceptually below to execute the verification suite:

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('Zero-Trust Security Rules Test', () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'remixed-project-id',
      firestore: { rules: require('fs').readFileSync('firestore.rules', 'utf8') }
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('Payload 1: Blocks unauthenticated writes', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(unauthedDb.doc('company/info').set({ name: 'Hacked' }));
  });

  it('Payload 2: Blocks unauthorized admin email writes', async () => {
    const wrongAuthDb = testEnv.authenticatedContext('attacker_uid', { email: 'attacker@gmail.com', email_verified: true }).firestore();
    await assertFails(wrongAuthDb.doc('company/info').set({ name: 'Hacked' }));
  });

  it('Payload 3: Blocks unverified email admin writes', async () => {
    const unverifiedAuthDb = testEnv.authenticatedContext('admin_uid', { email: 'johyun3662@gmail.com', email_verified: false }).firestore();
    await assertFails(unverifiedAuthDb.doc('company/info').set({ name: 'Hacked' }));
  });

  it('Payload 7: Blocks shadow ghost fields', async () => {
    const adminDb = testEnv.authenticatedContext('admin_uid', { email: 'johyun3662@gmail.com', email_verified: true }).firestore();
    await assertFails(adminDb.collection('portfolio').add({
      title: 'Valid Title',
      category: '화재청소',
      beforeImage: 'https://image.com/before.jpg',
      afterImage: 'https://image.com/after.jpg',
      description: 'Valid Description',
      date: '2026-07-18',
      ghostField: 'should_fail_writes'
    }));
  });
});
```
