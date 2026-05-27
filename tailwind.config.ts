import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
			fontFamily: {
				'fraunces': ['Fraunces', 'Georgia', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				// Legacy fonts kept for compatibility
				'dm-sans': ['"DM Sans"', 'sans-serif'],
				'lato': ['Lato', 'sans-serif'],
				'lora': ['Lora', 'serif'],
				'merriweather': ['Merriweather', 'serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
				'open-sans': ['"Open Sans"', 'sans-serif'],
				'playfair': ['"Playfair Display"', 'serif'],
				'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'raleway': ['Raleway', 'sans-serif'],
				'roboto': ['Roboto', 'sans-serif'],
				'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
				'work-sans': ['"Work Sans"', 'sans-serif'],
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
				// Trapito brand colors
				crema: 'hsl(33 57% 92%)',
				crudo: 'hsl(34 43% 88%)',
				lino: 'hsl(33 39% 82%)',
				'rosa-polvo': 'hsl(3 57% 80%)',
				fucsia: 'hsl(342 50% 54%)',
				paprika: 'hsl(15 62% 52%)',
				vino: 'hsl(342 47% 33%)',
				oliva: 'hsl(72 36% 34%)',
				'oliva-oscuro': 'hsl(73 36% 25%)',
				mostaza: 'hsl(38 60% 56%)',
				'verde-tenue': 'hsl(110 23% 74%)',
				tinta: 'hsl(20 9% 15%)',
				'tinta-suave': 'hsl(21 16% 37%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(16px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					from: { opacity: '0', transform: 'translateX(20px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'text-cycle': {
					'0%, 30%': { opacity: '1', transform: 'translateY(0)' },
					'33%, 63%': { opacity: '0', transform: 'translateY(-8px)' },
					'66%, 96%': { opacity: '1', transform: 'translateY(0)' },
					'99%, 100%': { opacity: '0', transform: 'translateY(-8px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
			},
			letterSpacing: {
				'widest-xl': '0.2em',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;