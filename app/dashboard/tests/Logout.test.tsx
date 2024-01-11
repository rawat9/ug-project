import { render, screen } from '@testing-library/react'
import { Logout } from '../_components/logout'
import userEvent from '@testing-library/user-event'

const useRouterMock = {
  push: () => jest.fn(),
}

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => useRouterMock,
}))

jest.mock('../../../lib/actions/auth', () => ({
  __esModule: true,
  signOut: jest.fn(),
}))

describe('Logout', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display logout button', async () => {
    const routerSpy = jest.spyOn(useRouterMock, 'push')
    const user = userEvent.setup()
    render(<Logout />)

    const logoutButton = screen.getByTestId('logout-button')

    await user.click(logoutButton)

    expect(routerSpy).toHaveBeenCalledWith('/auth/login')
  })
})
