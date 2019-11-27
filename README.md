[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# moleculer-db-fields-problem

## Demo repo to reproduce issue on a moleculer-db

###  Prerequisites

Please answer the following questions for yourself before submitting an issue.

[YES] I am running the latest version
[YES] I checked the documentation and found no answer
[YES] I checked to make sure that this issue has not already been filed
[YES] I'm reporting the issue to the correct repository

## Current Behavior

When updating (PUT through REST API) record in DB moleculer unnecessary check `fields` from body against `this.settings.fields`. So if we want to save in DB record that have `fields` prop with array of objects inside, we'll get an error.
This behavior is expected in `find`, `list`, `get` but according to docs not in `update` -> https://moleculer.services/docs/0.13/moleculer-db.html#update.

Error comes from `authorizeFields` method, line 559 (`if (f.indexOf(".") !== -1) {`). Ofc in this case field haven't to be string co `indexOf` can produce `indexOf` is not a function.

Record is updated despite of error.

### Expected Behavior

Not to get an error here! Bypass fields checking when using update.

### Steps to Reproduce

1. Run app from demo repo - https://github.com/chomamateusz/moleculer-db-fields-problem or any app with db service that can be updated and have `fields` field.
2. POST through API data like this:

```json
{
	"fields": [
		{"a": 1, "b":2},
		{"a": 1, "b":2}
	]
}
```

3. Then PUT on created before id data like this:

```json
{
	"fields": [
		{"a": 11, "b":22},
		{"a": 11, "b":22}
	]
}
```

4. You'll get error

```json
{
  "name": "TypeError",
  "message": "f.indexOf is not a function",
  "code": 500
}
```

### Context

- moleculer: 0.13.9
- moleculer-db: 0.8.4
- moleculer-web: 0.8.5
- node: 13.2.0
- Operating System: Pop!_OS 19.10 (Ubuntu 19.10)

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
