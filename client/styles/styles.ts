export const inputStyle = {
  control: {
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    fontSize: 14,
  },
  highlighter: {
    padding: 9,
    border: '1px solid transparent',
  },
  input: {
    padding: '9px',
    outline: 'none',
    width: '100%',
  },
  suggestions: {
    list: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid hsl(var(--border))',
      '&focused': {
        backgroundColor: 'hsl(var(--border))',
      },
    },
  },
}

export const toastStyles = {
  blank: {
    style: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
    },
  },
  success: {
    iconTheme: {
      primary: '#00a859',
      secondary: 'white',
    },
    style: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
    },
  },
  error: {
    iconTheme: {
      primary: 'white',
      secondary: '#ff6161',
    },
    style: {
      background: 'hsl(var(--destructive))',
      color: 'white',
    },
  },
}
