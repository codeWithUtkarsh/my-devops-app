module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': {
                    500: '#3b82f6',
                    600: '#2563eb',
                },
                'gray': {
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                }
            },
        },
    },
    plugins: [],
}