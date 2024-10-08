export interface IssuesAdditionalQueryOptions {
  state?: 'open' | 'closed' | 'all'
  labels?: string
}

export interface IssueResponse {
  data: IssueData
}

export interface IssueListResponse {
  data: IssueData[]
}

export interface IssueData {
  id: number
  number: number
  title: string
  state: string
  body?: string | null
  locked: boolean
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
}

export interface Repository {
  owner: string
  repo: string
}
