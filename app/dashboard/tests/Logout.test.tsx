import { render, screen } from '@testing-library/react'
import { Logout } from '@/components/shared/logout'
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

  it('should logout and navigate to /auth/login', async () => {
    const routerSpy = jest.spyOn(useRouterMock, 'push')
    const signOutSpy = jest.spyOn(await import('@/lib/actions/auth'), 'signOut')
    const user = userEvent.setup()
    render(<Logout />)

    const logoutButton = screen.getByTestId('logout-button')

    await user.click(logoutButton)

    expect(signOutSpy).toHaveBeenCalled()
    expect(routerSpy).toHaveBeenCalledWith('/auth/login')
  })
})
