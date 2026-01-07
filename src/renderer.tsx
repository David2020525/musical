import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MusicHub - Discover & Share Music</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
        `}</style>
      </head>
      <body className="bg-gray-50">
        {children}
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              import { createRoot } from 'https://esm.sh/react@18.2.0/client'
              import React from 'https://esm.sh/react@18.2.0'
              import App from '/static/app.js'
              
              const root = createRoot(document.getElementById('root'))
              root.render(React.createElement(App))
            `,
          }}
        ></script>
      </body>
    </html>
  )
})
