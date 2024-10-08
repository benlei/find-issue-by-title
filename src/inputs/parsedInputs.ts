import { context } from '@actions/github'
import { IssuesAdditionalQueryOptions, Repository } from '../types'
import {
  issueNumberInput,
  labelsInput,
  repositoryInput,
  stateInput
} from './coreInputs'

export const repository = (): Repository => {
  const input =
    repositoryInput() || `${context.repo.owner}/${context.repo.repo}`
  const [owner, repo] = input.split('/', 2)
  if (!owner || !repo) {
    throw new Error(`Invalid repository input: ${input}`)
  }

  return { owner, repo }
}

export const issueNumber = (): number => parseInt(issueNumberInput(), 10)

export const issueState = (): 'open' | 'closed' | 'all' => {
  const state = stateInput().toLowerCase()
  if (state === 'open' || state === 'closed' || state === 'all') {
    return state
  }

  return 'open'
}

export const issueLabels = (): string | undefined => {
  if (labelsInput().length === 0) {
    return undefined
  }

  return labelsInput()
}

export const filterOptions = (): IssuesAdditionalQueryOptions => ({
  state: issueState(),
  labels: issueLabels()
})
