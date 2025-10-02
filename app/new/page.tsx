"use client";
import { useState } from "react";

export default function NewPage() {
  const [projectKey, setProjectKey] = useState("2025-10_動画編集アルバイト");
  const [media, setMedia] = useState({ indeed: true, airwork: true });
  const [body, setBody] = useState("ここに原稿（デモ用）");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/notify/slack", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        projectKey,
        media: Object.entries(media).filter(([,v]) => v).map(([k]) => k),
      })
    });
    const j = await res.json();
    alert(j.ok ? "Slackに通知しました！" : `失敗: ${j.error}`);
  }

  return (
    <main>
      <h2>新規作成</h2>
      <form onSubmit={handleGenerate}>
        <div>
          <label>案件キー：</label>
          <input value={projectKey} onChange={e=>setProjectKey(e.target.value)} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            <input type="checkbox" checked={media.indeed} onChange={e=>setMedia(m=>({...m, indeed: e.target.checked}))}/>
            Indeed
          </label>
          <label style={{ marginLeft: 12 }}>
            <input type="checkbox" checked={media.airwork} onChange={e=>setMedia(m=>({...m, airwork: e.target.checked}))}/>
            Airwork
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>原稿（デモなので任意）：</label>
          <textarea value={body} onChange={e=>setBody(e.target.value)} rows={6} style={{ width: "100%" }}/>
        </div>
        <button type="submit" style={{ marginTop: 12 }}>生成（Slack通知）</button>
      </form>
      <p style={{ marginTop: 12 }}>
        通知先URL：/p/&lt;案件キー&gt; に固定（このデモではプレースホルダ表示）。
      </p>
    </main>
  );
}
