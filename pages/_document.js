// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Studio by Tishman - Project Management Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%233b82f6'>📊</text></svg>" />
      </Head>
      <body className="bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
