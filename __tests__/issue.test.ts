import { describe, it, expect, vi } from 'vitest'
import * as github from '../src/github'
import { IssueListResponse } from '../src/types'
import { findIssueByTitle } from '../src/issue'

const IssueResponseData1 = {
  data: [
    {
      id: 1,
      title: 'foo',
      number: 1234,
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2021-01-01',
      updated_at: '2021-01-01',
      closed_at: null
    },
    {
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
  ]
}

const IssueResponseData2 = {
  data: [
    {
      id: 3,
      title: 'baz',
      number: 5678,
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2021-01-01',
      updated_at: '2021-01-01',
      closed_at: null
    },
    {
      id: 4,
      title: 'qux',
      number: 8765,
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2021-01-01',
      updated_at: '2021-01-01',
      closed_at: null
    }
  ]
}

describe('findIssueByTitle', () => {
  it('should find issue by title', async () => {
    async function* iterator(): AsyncIterableIterator<IssueListResponse> {
      yield IssueResponseData1
      yield IssueResponseData2
    }

    vi.spyOn(github, 'openIssuesIterator').mockReturnValue(iterator())

    const issue = await findIssueByTitle('bar')
    expect(issue).toMatchObject({ title: 'bar', number: 4321 })
  })

  it('should return null if issue is not found', async () => {
    async function* iterator(): AsyncIterableIterator<IssueListResponse> {
      yield IssueResponseData1
      yield IssueResponseData2
    }

    vi.spyOn(github, 'openIssuesIterator').mockReturnValue(iterator())

    const issue = await findIssueByTitle('invalid')
    expect(issue).toBeNull()
  })
})
