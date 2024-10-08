import { describe, it, expect, vi } from 'vitest'
import * as inputs from '../src/inputs'
import * as github from '../src/github'
import * as issue from '../src/issue'
import { getIssue, run } from '../src/main'
import { IssueData } from '../src/types'
import * as core from '@actions/core'

const MockIssueData1: IssueData = {
  id: 2,
  title: 'bar',
  number: 4321,
  state: 'open',
  locked: false,
  comments: 0,
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
  closed_at: null
}

const MockIssueData2: IssueData = {
  id: 3,
  title: 'baz',
  number: 5678,
  state: 'open',
  locked: false,
  comments: 0,
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
  closed_at: null
}

describe('getIssue', () => {
  it('should fetch issue by issue number', async () => {
    vi.spyOn(inputs, 'issueNumber').mockReturnValue(1234)
    vi.spyOn(github, 'getIssueByIssueNumber').mockResolvedValue({
      data: MockIssueData1
    })

    expect(await getIssue()).toEqual(MockIssueData1)
  })

  it('should fetch issue by title', async () => {
    vi.spyOn(inputs, 'titleInput').mockReturnValue('bar')
    vi.spyOn(inputs, 'filterOptions').mockReturnValue({
      state: 'open',
      labels: 'bug'
    })
    vi.spyOn(issue, 'findIssueByTitle').mockResolvedValue(MockIssueData2)

    expect(await getIssue()).toEqual(MockIssueData2)
  })

  it('should throw an error if finding an issue by title returned nothing', async () => {
    vi.spyOn(inputs, 'titleInput').mockReturnValue('bar')
    vi.spyOn(inputs, 'filterOptions').mockReturnValue({
      state: 'open',
      labels: 'bug'
    })
    vi.spyOn(issue, 'findIssueByTitle').mockResolvedValue(null)

    await expect(getIssue()).rejects.toThrow('Issue with title "bar" not found')
  })

  it('should throw an error if no input is provided', async () => {
    vi.spyOn(inputs, 'issueNumber').mockReturnValue(0)
    vi.spyOn(inputs, 'titleInput').mockReturnValue('')

    await expect(getIssue()).rejects.toThrow(
      'One of body, issue-number, or issue-title must be provided'
    )
  })
})

describe('run', () => {
  it('should set outputs properly', async () => {
    vi.spyOn(inputs, 'issueNumber').mockReturnValue(1234)
    vi.spyOn(github, 'getIssueByIssueNumber').mockResolvedValue({
      data: MockIssueData1
    })
    const setOutput = vi.spyOn(core, 'setOutput')

    await run()

    expect(setOutput).toHaveBeenCalledWith('id', 2)
    expect(setOutput).toHaveBeenCalledWith('number', 4321)
    expect(setOutput).toHaveBeenCalledWith('title', 'bar')
    expect(setOutput).toHaveBeenCalledWith('state', 'open')
    expect(setOutput).toHaveBeenCalledWith('body', '')
    expect(setOutput).toHaveBeenCalledWith('locked', 'false')
    expect(setOutput).toHaveBeenCalledWith('comments', '0')
    expect(setOutput).toHaveBeenCalledWith('created-at', '2021-01-01')
    expect(setOutput).toHaveBeenCalledWith('updated-at', '2021-01-01')
    expect(setOutput).toHaveBeenCalledWith('closed-at', '')
  })

  it('should fail if an error occurs by default', async () => {
    vi.spyOn(inputs, 'issueNumber').mockReturnValue(1234)
    vi.spyOn(github, 'getIssueByIssueNumber').mockRejectedValue(
      new Error('Error message')
    )
    vi.spyOn(inputs, 'failOnErrorInput').mockReturnValue(true)

    const setFailed = vi.spyOn(core, 'setFailed')

    await run()

    expect(setFailed).toHaveBeenCalledWith('Error message')
  })

  it('should not fail if failOnError is false', async () => {
    vi.spyOn(inputs, 'issueNumber').mockReturnValue(1234)
    vi.spyOn(github, 'getIssueByIssueNumber').mockRejectedValue(
      new Error('Error message')
    )
    vi.spyOn(inputs, 'failOnErrorInput').mockReturnValue(false)

    const setFailed = vi.spyOn(core, 'setFailed')

    await run()

    expect(setFailed).not.toHaveBeenCalled()
  })
})
