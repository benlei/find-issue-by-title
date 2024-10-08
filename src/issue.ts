import { openIssuesIterator } from './github'
import { IssueData, IssuesAdditionalQueryOptions } from './types'

export const findIssueByTitle = async (
  title: string,
  options?: IssuesAdditionalQueryOptions
): Promise<IssueData | null> => {
  for await (const response of openIssuesIterator(options)) {
    const issue = response.data.find(
      (issue: { title: string }) => issue.title === title
    )

    if (issue) return issue
  }

  return null
}
