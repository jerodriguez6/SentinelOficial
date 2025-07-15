import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./public/index.html"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        'red-neon-gradient': "linear-gradient(rgba(5, 5, 7, 0.85), rgba(10, 10, 15, 0.85)), url('/red_neon.png')",
        'cyber-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'neon-gradient': 'linear-gradient(45deg, #ff0080, #00d4ff, #8b5cf6)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        sentinel: {
          primary: 'hsl(var(--sentinel-primary))',
          secondary: 'hsl(var(--sentinel-secondary))',
          accent: 'hsl(var(--sentinel-accent))',
          muted: 'hsl(var(--sentinel-muted))',
          dark: 'hsl(var(--sentinel-dark))'
        },
        neon: {
          pink: '#ff0080',
          blue: '#00d4ff',
          purple: '#8b5cf6',
          green: '#00ff88',
          cyan: '#00ffff',
          yellow: '#ffff00'
        },
        cyber: {
          dark: '#0a0a0f',
          darker: '#050507',
          purple: '#6366f1',
          blue: '#3b82f6',
          pink: '#ec4899'
        },
        // 🎯 Nuevos colores añadidos
        'professional-blue': '#4A90E2',
        'professional-blue-light': '#6BA6F0',
        'professional-blue-dark': '#2E5F8A',
        'aqua-blue': '#40E0D0',
        'aqua-light': '#7FFFD4',
        'aqua-dark': '#20B2AA',
        'accent-blue': '#3B82F6',
        'dark-bg': '#0f1419',
        'card-bg': '#1a202c',
      },
      textColor: {
        default: '#40E0D0',
        title: '#4A90E2',
        accent: '#3B82F6',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(74, 144, 226, 0.1)',
        card: '0 4px 15px rgba(74, 144, 226, 0.15)',
        hover: '0 6px 20px rgba(74, 144, 226, 0.2)',
        aqua: '0 2px 10px rgba(64, 224, 208, 0.2)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        glow: { '0%, 100%': { boxShadow: '0 0 20px rgba(0, 186, 255, 0.3)' }, '50%': { boxShadow: '0 0 40px rgba(0, 186, 255, 0.6)' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
