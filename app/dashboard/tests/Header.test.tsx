import { render, screen } from '@testing-library/react'
import { Header } from '@/components/shared/header'
import userEvent from '@testing-library/user-event'

// mock Logout component
jest.mock('../../../components/shared/logout', () => ({
  __esModule: true,
  Logout: () => <div>Logout</div>,
}))

jest.mock('../../../lib/actions/auth', () => ({
  __esModule: true,
  getUser: () => ({ user: { email: 'smarty@dev.com' } }),
}))

describe('Header RSC', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display header', async () => {
    const header = await Header()
    render(header)

    expect(header).toBeTruthy()
  })

  it('should display user email', async () => {
    const user = userEvent.setup()
    const header = await Header()
    render(header)

    user.click(screen.getByRole('button'))

    const email = await screen.findByTestId('user-email')
    expect(email.textContent).toStrictEqual('smarty@dev.com')
  })
})
