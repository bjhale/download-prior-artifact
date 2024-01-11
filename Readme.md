## Required Permissions:

```
actions:read
```

<!-- action-docs-description -->
## Description

Downloads artifact from the previous workflow run
<!-- action-docs-description -->

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| github_token | The github token to use for authentication | `true` |  |
| repository | The owner/repository to download the artifact from | `true` |  |
| artifact_name | The name of the artifact to download | `false` |  |
| minimum_age | The minimum age of the artifact to download in hours | `false` |  |
| directory | The directory to extract the artifact to. Default: artifact | `false` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->

<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node20` action.
<!-- action-docs-runs -->