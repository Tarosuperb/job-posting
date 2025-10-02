export async function POST(req: Request) {
  try {
    const { projectKey, media } = await req.json();
    const webhook = process.env.SLACK_WEBHOOK_URL;
    const base = process.env.APP_BASE_URL; // 例: https://<your-project>.vercel.app
    if (!webhook || !base) {
      return new Response(JSON.stringify({ ok: false, error: "Missing env" }), { status: 400 });
    }
    const url = `${base}/p/${encodeURIComponent(projectKey)}`;
    const text = [
      `【求人票生成】${projectKey}`,
      `プレビュー: ${url}`,
      `媒体: ${Array.isArray(media) ? media.join(" / ") : ""}`
    ].join("\n");
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error(await res.text());
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}
