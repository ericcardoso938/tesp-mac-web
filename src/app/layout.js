export const metadata = {
    title: 'tesp-mac-web',
    description: 'O teu espaço pessoal de produtividade',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt">
        <body style={{ margin: 0, padding: 0, backgroundColor: '#f3f4f6' }}>

        {/* Barra de Navegação Premium */}
        <nav style={{
            backgroundColor: '#111827', /* Fundo escuro elegante */
            padding: '16px 32px',
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <a href="/" style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                letterSpacing: '0.5px'
            }}>
                Home
            </a>
            <a href="/lista" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                letterSpacing: '0.5px'
            }}>
                Lista
            </a>
        </nav>

        {/* O conteúdo das tuas páginas aparece aqui */}
        {children}

        </body>
        </html>
    )
}