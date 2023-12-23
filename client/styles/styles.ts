export const inputStyle = {
  control: {
    padding: '9px 9px 0px 9px',
  },
  highlighter: {
    border: '1px solid transparent',
    padding: '0px',
    margin: '0px',
  },
  input: {
    padding: '9px',
    outline: 'none',
    margin: '0px 0px 0px 2px',
  },
  suggestions: {
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: '150px',
    list: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      fontSize: 14,
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
    },
    item: {
      padding: '5px 15px',
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
