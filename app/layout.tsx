export const metadata = { title: "JobGen (Internal)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 20, lineHeight: 1.6 }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>JobGen（社内）</h1>
          <nav><a href="/new">新規作成</a></nav>
        </header>
        {children}
      </body>
    </html>
  );
}
