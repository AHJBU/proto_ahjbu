import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, AuthContextType, UserData } from '../../contexts/AuthContext';
import AdminBlog from '../../pages/admin/AdminBlog';

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

describe('AdminBlog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders blog management interface', () => {
    renderWithProviders(<AdminBlog />);

    expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('Add New Post')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Post/i })).toBeInTheDocument();
  });

  it('handles adding new blog post', async () => {
    renderWithProviders(<AdminBlog />);

    const user = userEvent.setup();

    fireEvent.click(screen.getByRole('button', { name: /Add New Post/i }));

    await user.type(screen.getByLabelText('Title'), 'Test Blog Post');
    await user.type(screen.getByLabelText('Content'), 'This is a test blog post content.');
    await user.type(screen.getByLabelText('Tags'), 'test, blog, post');

    fireEvent.click(screen.getByRole('button', { name: /Publish/i }));

    await waitFor(() => {
      expect(screen.getByText('Blog post published successfully!')).toBeInTheDocument();
    });
  });

  it('handles editing blog post', async () => {
    renderWithProviders(<AdminBlog />);

    const user = userEvent.setup();

    // Mock existing blog post
    const mockPost = {
      id: '1',
      title: 'Test Post',
      content: 'Original content'
    };

    fireEvent.click(screen.getByRole('button', { name: `Edit ${mockPost.title}` }));

    await user.type(screen.getByLabelText('Title'), 'Updated Test Post');
    await user.type(screen.getByLabelText('Content'), 'Updated content');

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(screen.getByText('Blog post updated successfully!')).toBeInTheDocument();
    });
  });

  it('handles deleting blog post', async () => {
    renderWithProviders(<AdminBlog />);

    const user = userEvent.setup();

    // Mock existing blog post
    const mockPost = {
      id: '1',
      title: 'Test Post'
    };

    fireEvent.click(screen.getByRole('button', { name: `Delete ${mockPost.title}` }));

    await user.click(screen.getByRole('button', { name: /Confirm Delete/i }));

    await waitFor(() => {
      expect(screen.getByText('Blog post deleted successfully!')).toBeInTheDocument();
    });
  });
});
