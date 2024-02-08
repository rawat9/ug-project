import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '../page'
import { fetchDashboards } from '@/lib/data'
import Search from '@/components/shared/search'
import { getSession } from '@/lib/actions'
import { Session } from '@supabase/supabase-js'

jest.mock('../../../lib/data/index', () => ({
  __esModule: true,
  fetchDashboards: jest.fn(),
}))

const useRouterMock = {
  replace: () => jest.fn(),
}

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => useRouterMock,
  useSearchParams: () => ({
    get: (key: string) => key,
  }),
  usePathname: () => '/',
  redirect: () => jest.fn() as never,
}))

// mock the Header RSC
jest.mock('../../../components/shared/header', () => ({
  __esModule: true,
  Header: () => <div />,
}))

jest.mock('../../../lib/actions/auth', () => ({
  __esModule: true,
  getSession: jest.fn(() => ({ session: null })),
}))

describe('Dashboard layout', () => {
  const ChildComponent = () => {
    return <h1>Child component</h1>
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should not display children if session is null', async () => {
    const redirectSpy = jest.spyOn(await import('next/navigation'), 'redirect')
    await Page({ searchParams: { query: '' } })

    // should redirect to login page
    expect(redirectSpy).toHaveBeenCalledWith('/auth/login/')
  })

  it('should display children if session exists', async () => {
    jest
      .mocked(getSession)
      .mockResolvedValue({ session: { user: { id: '1' } } as Session })

    const dashboardLayout = await Page({ searchParams: { query: '' } })
    render(dashboardLayout)

    const child = screen.getByRole('heading', { level: 1 })
    expect(child.textContent).toEqual('Child component')
  })
})

describe('Dashboard Page', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render empty state if there are no dashboards', async () => {
    // Mock fetchDashboards to return an empty array
    jest.mocked(fetchDashboards).mockResolvedValue([])

    const dashboardPage = await Page({ searchParams: { query: '' } })
    render(dashboardPage)

    // Assert that the empty state is rendered
    const image = screen.getByRole('img', { name: 'Empty dashboard' })
    expect(image).toBeInTheDocument()
  })

  it('should display dashboard with correct title and link', async () => {
    jest
      .mocked(fetchDashboards)
      .mockResolvedValue([
        { id: 'slug', title: 'test', created_at: '', user_id: '' },
      ])

    const dashboardPage = await Page({ searchParams: { query: '' } })
    render(dashboardPage)

    const dashboard = screen.getByTestId('dashboard')
    expect(dashboard.firstChild?.textContent).toStrictEqual('test')
    expect((dashboard.parentNode as HTMLAnchorElement).href).toContain(
      '/dashboard/slug',
    )
  })

  it('should display multiple dashboards with correct details', async () => {
    jest.mocked(fetchDashboards).mockResolvedValue([
      {
        id: 'slug-1',
        title: 'test-1',
        created_at: new Date('22/03/2020').toLocaleDateString(),
        user_id: 'test-user',
      },
      {
        id: 'slug-2',
        title: 'test-2',
        created_at: new Date('24/03/2020').toLocaleDateString(),
        user_id: 'test-user',
      },
    ])

    const dashboardPage = await Page({ searchParams: { query: 'test' } })
    render(dashboardPage)

    const dashboards = screen.getAllByTestId('dashboard')
    expect(dashboards).toHaveLength(2)
    expect(dashboards[0]?.firstChild?.textContent).toStrictEqual('test-1')
    expect((dashboards[1]?.parentNode as HTMLAnchorElement).href).toContain(
      '/dashboard/slug-2',
    )
  })

  describe('Search', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should display search input field', async () => {
      render(<Search />)

      const search = screen.getByRole<HTMLInputElement>('searchbox')

      expect(search.placeholder).toEqual('Search...')
      expect(search).toBeInTheDocument()
    })

    it('should display no results found if no dashboards match the search term', async () => {
      jest.mocked(fetchDashboards).mockResolvedValue([
        {
          id: 'slug-2',
          title: 'test-2',
          created_at: new Date('24/03/2020').toLocaleDateString(),
          user_id: 'test-user',
        },
      ])
      const dashboardPage = await Page({ searchParams: { query: 'test-3' } })
      render(dashboardPage)

      const noResults = screen.getByRole('heading', { level: 1 })
      expect(noResults.textContent).toEqual("No results found for 'test-3'")
    })

    it('should update url when the search input changes', async () => {
      const routerSpy = jest.spyOn(useRouterMock, 'replace')

      render(<Search />)

      const search = screen.getByRole<HTMLInputElement>('searchbox')

      await waitFor(() => {
        fireEvent.change(search, { target: { value: 'test-0' } })
        expect(routerSpy).toHaveBeenCalledWith(
          expect.stringContaining('query=test-0'),
        )
      })
    })
  })
})
