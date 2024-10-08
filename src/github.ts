/* v8 ignore start */
import { getOctokit } from '@actions/github'
import {
  defaults as defaultGitHubOptions,
  GitHub
} from '@actions/github/lib/utils'
import { retry } from '@octokit/plugin-retry'
import { githubTokenInput, repository } from './inputs'
import {
  IssueListResponse,
  IssueResponse,
  IssuesAdditionalQueryOptions
} from './types'

const RetryAttempts = 3
const ExemptStatusCodes = [400, 401, 403, 404, 422]

const octokit = (): InstanceType<typeof GitHub> =>
  getOctokit(
    githubTokenInput(),
    {
      retry: {
        enabled: true,
        doNotRetry: ExemptStatusCodes
      },
      request: {
        ...defaultGitHubOptions.request,
        retries: RetryAttempts
      }
    },
    retry
  )

export const openIssuesIterator = (
  options?: IssuesAdditionalQueryOptions
): AsyncIterableIterator<IssueListResponse> =>
  octokit().paginate.iterator('GET /repos/{owner}/{repo}/issues', {
    ...repository(),
    ...options
  })

export const getIssueByIssueNumber = async (
  issueNumber: number
): Promise<IssueResponse> =>
  await octokit().rest.issues.get({
    ...repository(),
    issue_number: issueNumber
  })

/* v8 ignore end */
