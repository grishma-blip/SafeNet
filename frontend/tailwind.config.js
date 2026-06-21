/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-main': "#f1f5f9",
        'light-card': "rgba(255, 255, 255, 0.75)",
        'light-border': "rgba(0, 0, 0, 0.08)",
        'light-sidebar': "rgba(255, 255, 255, 0.95)",
        'cyber-cyan': "#0ea5e9",
        'cyber-emerald': "#10b981",
        'cyber-rose': "#ef4444",
        'cyber-amber': "#f59e0b",
        'cyber-purple': "#8b5cf6",
        'cyber-blue': "#3b82f6"
      },
      backgroundImage: {
        'glass-grad': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
        'cyan-glow': 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
        'success-glow': 'linear-gradient(135deg, #059669, #10b981)',
        'danger-glow': 'linear-gradient(135deg, #dc2626, #ef4444)',
        'warning-glow': 'linear-gradient(135deg, #d97706, #f59e0b)'
      },
      boxShadow: {
        'light-shadow': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'light-hover': '0 12px 40px rgba(0, 0, 0, 0.07)',
        'sidebar-shadow': '4px 0 20px rgba(0, 0, 0, 0.02)'
      }
    },
  },
  plugins: [],
}
