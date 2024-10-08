import { describe, it, expect, vi } from 'vitest'
import * as inputs from '../../src/inputs/coreInputs'
import {
  issueLabels,
  issueNumber,
  issueState,
  repository
} from '../../src/inputs'
import { filterOptions } from '../../src/inputs/parsedInputs'

describe('repository', () => {
  it('should parse default repository properly', () => {
    process.env.GITHUB_REPOSITORY = 'owner/repo'
    vi.spyOn(inputs, 'repositoryInput').mockReturnValue('')

    expect(repository()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('should parse input repository properly', () => {
    process.env.GITHUB_REPOSITORY = 'owner/repo'
    vi.spyOn(inputs, 'repositoryInput').mockReturnValue('foo/bar')

    expect(repository()).toEqual({ owner: 'foo', repo: 'bar' })
  })

  it('should throw an error if owner or repo is empty', () => {
    vi.spyOn(inputs, 'repositoryInput').mockReturnValue('foo')
    expect(() => repository()).toThrow()

    vi.spyOn(inputs, 'repositoryInput').mockReturnValue('/bar')
    expect(() => repository()).toThrow()
  })
})

describe('issueNumber', () => {
  it('should parse issue number properly', () => {
    vi.spyOn(inputs, 'issueNumberInput').mockReturnValue('1236')
    expect(issueNumber()).toBe(1236)
  })
})

describe('issueState', () => {
  it('should parse issue state properly', () => {
    vi.spyOn(inputs, 'stateInput').mockReturnValue('open')
    expect(issueState()).toBe('open')

    vi.spyOn(inputs, 'stateInput').mockReturnValue('closed')
    expect(issueState()).toBe('closed')

    vi.spyOn(inputs, 'stateInput').mockReturnValue('all')
    expect(issueState()).toBe('all')

    vi.spyOn(inputs, 'stateInput').mockReturnValue('invalid')
    expect(issueState()).toBe('open')
  })

  it('should default to open if state is not valid', () => {
    vi.spyOn(inputs, 'stateInput').mockReturnValue('')
    expect(issueState()).toBe('open')
  })
})

describe('issueLabels', () => {
  it('should parse issue labels properly', () => {
    vi.spyOn(inputs, 'labelsInput').mockReturnValue('foo,bar')
    expect(issueLabels()).toBe('foo,bar')

    vi.spyOn(inputs, 'labelsInput').mockReturnValue('')
    expect(issueLabels()).toBeUndefined()
  })
})

describe('filterOptions', () => {
  it('should return filter options properly', () => {
    vi.spyOn(inputs, 'stateInput').mockReturnValue('open')
    vi.spyOn(inputs, 'labelsInput').mockReturnValue('foo,bar')

    expect(filterOptions()).toEqual({ state: 'open', labels: 'foo,bar' })
  })
})
