import * as core from '@actions/core'
import { failOnErrorInput, issueNumber, titleInput } from './inputs'
import { IssueData } from './types'
import { getIssueByIssueNumber } from './github'
import { findIssueByTitle } from './issue'
import { filterOptions } from './inputs'

export const getIssue = async (): Promise<IssueData> => {
  let result: IssueData | null = null
  if (issueNumber()) {
    core.info(`Fetching issue number ${issueNumber()}`)
    result = (await getIssueByIssueNumber(issueNumber())).data
  } else if (titleInput()) {
    core.info(
      `Fetching issue with title "${titleInput()}" with options ${JSON.stringify(filterOptions())}`
    )

    result = await findIssueByTitle(titleInput(), filterOptions())
    if (!result) {
      throw new Error(`Issue with title "${titleInput()}" not found`)
    }

    core.info(`Found issue number ${result.number}!`)
  } else {
    throw new Error(
      'One of body, issue-number, or issue-title must be provided'
    )
  }

  return result
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export const run = async (): Promise<void> => {
  try {
    const issue = await getIssue()

    core.setOutput('id', issue.id)
    core.setOutput('number', issue.number)
    core.setOutput('title', issue.title)
    core.setOutput('state', issue.state)
    core.setOutput('body', issue.body ?? '')
    core.setOutput('locked', issue.locked.toString())
    core.setOutput('comments', issue.comments.toString())
    core.setOutput('created-at', issue.created_at)
    core.setOutput('updated-at', issue.updated_at)
    core.setOutput('closed-at', issue.closed_at ?? '')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      if (failOnErrorInput()) {
        core.setFailed(error.message)
      } else {
        core.warning(error.message)
      }
    }
  }
}
