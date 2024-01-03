import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '../page'
import { fetchDashboards } from '@/lib/data'
import { Search } from '../_components/search'

jest.mock('../../../lib/data/index', () => ({
  __esModule: true,
  fetchDashboards: jest.fn(),
}))

const useRouterMock = {
  replace: (href: string) => jest.fn(),
}

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => useRouterMock,
  useSearchParams: () => ({
    get: (key: string) => key,
  }),
  usePathname: () => '/',
}))

// mock the Header RSC
jest.mock('../_components/header', () => ({
  __esModule: true,
  Header: () => <div />,
}))

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
    beforeEach(() => {
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
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should display search input field', async () => {
      const dashboardPage = await Page({ searchParams: { query: '' } })
      render(dashboardPage)

      const search = screen.getByRole<HTMLInputElement>('searchbox')

      expect(search.placeholder).toEqual('Search...')
      expect(search).toBeInTheDocument()
    })

    it('should display no results found if no dashboards match the search term', async () => {
      const dashboardPage = await Page({ searchParams: { query: 'test-3' } })
      render(dashboardPage)

      const noResults = screen.getByRole('heading', { level: 1 })
      expect(noResults.textContent).toEqual("No results found for 'test-3'")
    })

    it('should update url when the search input changes', async () => {
      const routerSpy = jest.spyOn(useRouterMock, 'replace')

      const dashboardPage = await Page({ searchParams: { query: '' } })
      render(dashboardPage)

      const search = screen.getByRole<HTMLInputElement>('searchbox')

      await waitFor(() => {
        fireEvent.change(search, { target: { value: 'test-0' } })
        expect(routerSpy).toHaveBeenCalledWith(
          expect.stringContaining('query=test-0'),
        )
      })
    })

    it.skip('should not trigger search for whitespace characters', async () => {
      render(<Search />)

      const handleSearch = jest.fn((value) => console.log(value))
      const search = screen.getByRole<HTMLInputElement>('searchbox')
      search.onchange = handleSearch

      fireEvent.change(search, { target: { value: '     ' } })

      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledTimes(0)
      })
    })
  })
})
