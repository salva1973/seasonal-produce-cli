## Publish to npm

1. Create an npm account and log in:

   ```bash
   npm login
   ```

2. Pick a package name. If `seasonal-produce-cli` is taken, use a **scoped** name like `@salva/seasonal-produce-cli`.

   - For scoped public packages add this to `package.json`:
     ```json
     {
       "name": "@salva/seasonal-produce-cli",
       "publishConfig": { "access": "public" }
     }
     ```

3. Add useful metadata to `package.json`:

   ```json
   {
     "repository": {
       "type": "git",
       "url": "git+https://github.com/youruser/seasonal-produce-cli.git"
     },
     "bugs": {
       "url": "https://github.com/youruser/seasonal-produce-cli/issues"
     },
     "homepage": "https://github.com/youruser/seasonal-produce-cli#readme",
     "author": "Salvatore Vivolo <you@example.com>",
     "license": "MIT",
     "files": ["bin", "src", "README.md", "LICENSE"]
   }
   ```

4. Dry-run the publish to check what would be included:

   ```bash
   npm pack --dry-run
   ```

5. Version bump using semver (patch/minor/major):

   ```bash
   npm version patch -m "chore: release %s"
   ```

6. Publish:

   ```bash
   npm publish                 # for unscoped package
   npm publish --access public # for scoped public package
   ```

7. Test the real install (no symlink):
   ```bash
   npm uninstall -g seasonal-produce || true
   npm install -g seasonal-produce
   seasonal-produce --help
   ```

### Troubleshooting

- **403 or OTP required**: enable and use your 2FA one-time password when prompted.
- **Name already taken**: switch to a scoped name (e.g., `@salva/…`).
- **Wrong files included**: fix `.npmignore` or the `files` whitelist, then re-run `npm pack --dry-run`.
- **Unpublish**: strongly discouraged after 72h; prefer `npm deprecate <pkg>@<version> "message"`.

```

```
