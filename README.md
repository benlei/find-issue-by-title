# benlei/get-issue-by-title

[![GitHub Super-Linter](https://github.com/benlei/get-issue-by-title/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/benlei/get-issue-by-title/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/benlei/get-issue-by-title/actions/workflows/check-dist.yml/badge.svg)](https://github.com/benlei/get-issue-by-title/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/benlei/get-issue-by-title/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/benlei/get-issue-by-title/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Gets a single issue by exact title, with ability to additionally filter by state
and labels for reducing rate limiting purposes.

Internally what it does is it lists all issues for a repository and filters by
state and labels, then tries to match every issue title with the provided title.
If you for some reason pass along the issue number, it will return that issue
directly instead.

## Inputs

<!-- markdownlint-disable MD013 -->

| Name            | Required | Default                    | Description                                                                           |
| --------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------- |
| `repository`    | no       | `${{ github.repository }}` | The repository to get the issue from.                                                 |
| `token`         | no       | `${{ github.token }}`      | The token to use for authentication.                                                  |
| `fail-on-error` | no       | `true`                     | Whether to fail if an error occurs.                                                   |
| `issue-number`  | no       | `''`                       | The issue number to get.                                                              |
| `title`         | no       | `''`                       | The title of the issue to get.                                                        |
| `state`         | no       | `'open'`                   | The state of the issue to get. Valid values are `open` (default), `closed`, or `all`. |
| `labels`        | no       | `''`                       | The labels of the issue to get, comma separated.                                      |

<!-- markdownlint-enable MD013 -->

## Outputs

<!-- markdownlint-disable MD013 -->

| Name         | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `id`         | The ID of the issue. Note that this is NOT the same as the issue number.   |
| `number`     | The number of the issue, generally used for most issue related operations. |
| `title`      | The title of the issue.                                                    |
| `body`       | The body of the issue.                                                     |
| `state`      | The state of the issue.                                                    |
| `locked`     | Whether the issue is locked.                                               |
| `comments`   | The number of comments on the issue.                                       |
| `created-at` | The date and time the issue was created.                                   |
| `updated-at` | The date and time the issue was last updated.                              |
| `closed-at`  | The date and time the issue was closed.                                    |

<!-- markdownlint-enable MD013 -->

## Example usage

```yaml
- uses: benlei/get-issue-by-title@v1
  id: get-issue
  with:
    title: 'Get issue by title'
    state: 'open'
    labels: 'bug'

- run: echo "Issue Number: ${{ steps.get-issue.outputs.number }}"
```
