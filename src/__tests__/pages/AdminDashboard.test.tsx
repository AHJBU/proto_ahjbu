import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, AuthContextType, UserData } from '../../contexts/AuthContext';
import AdminDashboard from '../../pages/admin/AdminDashboard';

const queryClient = new QueryClient();

const mockUser: UserData = {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  role: 'admin',
  twoFactorEnabled: false
};

const mockAuthContext: AuthContextType = {
  user: mockUser,
  isLoading: false,
  isAuthenticated: true,
  needsTwoFactor: false,
  login: jest.fn(),
  verify2FA: jest.fn(),
  verifyTwoFactor: jest.fn(),
  logout: jest.fn(),
  updateUser: jest.fn(),
  toggleTwoFactor: jest.fn()
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {ui}
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('AdminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dashboard with navigation', () => {
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Applications')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    expect(screen.getByText('Literature')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Press')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Backup')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('CV')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('handles navigation to different sections', () => {
    renderWithProviders(<AdminDashboard />);

    fireEvent.click(screen.getByText('Blog'));
    expect(screen.getByText('Blog Management')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Portfolio'));
    expect(screen.getByText('Portfolio Management')).toBeInTheDocument();
  });

  it('handles logout', async () => {
    renderWithProviders(<AdminDashboard />);

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockAuthContext.logout).toHaveBeenCalled();
    });
  });
});
