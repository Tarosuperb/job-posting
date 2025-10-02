type Props = { params: { key: string } };
export default function ProjectPage({ params }: Props) {
  return (
    <main>
      <h2>案件: {decodeURIComponent(params.key)}</h2>
      <p>ここに媒体別プレビュー（md）が表示されます。（後で実装）</p>
      <p>まずは「URLが固定で開ける」ことを確認する段階です。</p>
    </main>
  );
}
