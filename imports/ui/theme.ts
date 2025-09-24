export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    placeholder: '#C7C7CC',
    background: '#F2F2F7',
    surface: '#FFFFFF', // For cards and content areas
    border: '#E5E5EA',
    success: '#34C759',
    error: '#FF3B30',
  },
  fonts: {
    family: 'Inter, Roboto, system-ui, sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    sizes: {
      h1: '28px',
      h2: '22px',
      h3: '18px',
      bodyLarge: '16px',
      bodyMedium: '14px',
      caption: '12px',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radii: {
    sm: '4px', // Inputs
    md: '8px', // Cards, Buttons
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.07)',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
};