import * as core from '@actions/core'

export const githubTokenInput = (): string =>
  core.getInput('token', {
    required: false,
    trimWhitespace: true
  })

export const failOnErrorInput = (): boolean =>
  core.getInput('fail-on-error', {
    required: false,
    trimWhitespace: true
  }) === 'true'

export const repositoryInput = (): string =>
  core.getInput('repository', {
    required: false,
    trimWhitespace: true
  })

export const issueNumberInput = (): string =>
  core.getInput('issue-number', {
    required: false,
    trimWhitespace: true
  })

export const titleInput = (): string =>
  core.getInput('title', {
    required: false,
    trimWhitespace: true
  })

export const stateInput = (): string =>
  core.getInput('state', {
    required: false,
    trimWhitespace: true
  })

export const labelsInput = (): string =>
  core.getInput('labels', {
    required: false,
    trimWhitespace: true
  })
