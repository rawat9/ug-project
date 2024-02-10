import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '../login/page'
import { AuthForm } from '../login/_components/auth-form'
import { toast } from 'react-hot-toast'

const auth = {
  signInWithOtp: async (creds?: { email: string }) => jest.fn(),
}

jest.mock('../../../lib/supabase/server', () => ({
  createSupabaseServerClient: async () => {
    return {
      auth,
    }
  },
}))

describe('Login Page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render login page', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Sign up or log in')
    expect(heading).toBeInTheDocument()
  })

  it('should display error message for invalid email address', async () => {
    render(<AuthForm />)

    const mockLogin = jest.spyOn(auth, 'signInWithOtp')

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    fireEvent.input(emailInput, 'test1')

    const submitButton = screen.getByRole('button', { name: /continue/i })

    await waitFor(() => {
      fireEvent.submit(submitButton)
    })

    const errorMessage = await screen.findByTestId('error-message')
    expect(errorMessage).toHaveTextContent('Invalid email')
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('should login with valid email address', async () => {
    render(<AuthForm />)

    const toastSuccess = jest.spyOn(toast, 'success')
    const mockLogin = jest.spyOn(auth, 'signInWithOtp')
    const emailInput = screen.getByRole('textbox', { name: /email/i })

    fireEvent.input(emailInput, {
      target: { value: 'test@dev.com' },
    })

    const submitButton = screen.getByRole('button', { name: /continue/i })

    await waitFor(() => {
      fireEvent.submit(submitButton)
      expect(submitButton).toBeDisabled()
    })

    // expect(mockLogin).toHaveBeenCalledWith({
    //   email: 'test@dev.com',
    // })
    expect(toastSuccess).toHaveBeenCalledWith(
      'Check your email for the magic link!',
    )

    // form should be reset
    expect(emailInput).toHaveValue('')
  })

  it('should show error toast if signIn fails', async () => {
    render(<AuthForm />)

    const toastError = jest.spyOn(toast, 'error')
    const mockLogin = jest
      .spyOn(auth, 'signInWithOtp')
      .mockImplementation(async () => {
        return { error: new Error() } as unknown as jest.Mock
      })

    const emailInput = screen.getByRole('textbox', { name: /email/i })

    fireEvent.input(emailInput, {
      target: { value: 'test@dev.com' },
    })

    const submitButton = screen.getByRole('button', { name: /continue/i })

    await waitFor(() => {
      fireEvent.submit(submitButton)
      expect(submitButton).toBeDisabled()
    })

    // expect(mockLogin).toHaveBeenCalledWith({
    //   email: 'test@dev.com',
    // })
    expect(toastError).toHaveBeenCalledWith(
      'Your request has been failed. Please try again.',
    )
  })
})
