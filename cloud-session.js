(() => {
  if (!window.learningAccount.isCloud) return;
  const { userId, stateKey } = window.learningAccount;
  const { reconcile, equal, clone } = window.LearningSyncCore;
  const app = window.learningState;
  const status = document.getElementById("auto-sync-status");
  const say = message => { status.textContent = message; };
  document.getElementById("cloud-account-tools").hidden = false;
  document.querySelector(".cloud-sync").hidden = true;
  document.getElementById("login-cloud-account").textContent = "切换云端账号";
  const metaKey = `${stateKey}:sync-base`;
  let meta;
  try { meta = JSON.parse(localStorage.getItem(metaKey)); } catch {}
  meta ||= { state: app.normalize({}), revision: 0 };
  let busy = false;
  let stopped = false;
  let applying = false;
  let timer;
  let client;
  async function request(path, session, body) {
    const config = window.LEARNING_CLOUD_CONFIG;
    // Bind each request to the verified identity, even if another tab signs in meanwhile.
    const response = await fetch(`${config.url}/rest/v1/${path}`, {
      method: body ? "POST" : "GET",
      headers: { apikey: config.publishableKey, Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error("Cloud request failed");
    return response.json();
  }
  function schedule() {
    if (applying || stopped) return;
    clearTimeout(timer);
    say("进度已保存在本机，正在等待同步…");
    timer = setTimeout(sync, 1500);
  }
  function accept(remote, sentLocal) {
    const latest = app.snapshot();
    const merged = reconcile(sentLocal, latest, remote.state);
    meta = { state: clone(remote.state), revision: remote.revision };
    localStorage.setItem(metaKey, JSON.stringify(meta));
    if (!equal(latest, merged)) {
      applying = true;
      try { app.apply(merged); } finally { applying = false; }
    }
    if (!equal(meta.state, app.snapshot())) schedule();
    else say(`已自动同步 · ${new Date().toLocaleTimeString()}`);
  }
  async function sync() {
    if (busy || stopped) return;
    if (!navigator.onLine) { say("当前离线，进度已保存在本机，联网后自动重试。"); return; }
    busy = true;
    try {
      client ||= createLearningCloudClient();
      const { data: auth, error: authError } = await client.auth.getSession();
      if (authError || !auth.session || auth.session.user.id !== userId) {
        say("登录已失效或账号已切换。请重新登录；未同步进度仍保留在本机。");
        return;
      }
      const rows = await request(`learning_progress?select=state,revision&user_id=eq.${encodeURIComponent(userId)}`, auth.session);
      const data = rows[0];
      let remote = { state: app.normalize(data?.state || {}), revision: Number(data?.revision || 0) };
      for (let attempt = 0; attempt < 5; attempt++) {
        if (stopped) return;
        const local = app.snapshot();
        const candidate = reconcile(meta.state, local, remote.state);
        if (equal(candidate, remote.state)) { accept(remote, local); return; }
        const saved = await request("rpc/save_learning_progress", auth.session, {
          expected_revision: remote.revision, new_state: candidate
        });
        if (!saved || !Number.isSafeInteger(Number(saved.revision))) throw new Error("Invalid sync response");
        remote = { state: app.normalize(saved.state), revision: Number(saved.revision) };
        if (!saved.conflict) { accept(remote, local); return; }
      }
      say("其他设备也在保存，稍后自动重试。进度仍保留在本机。");
    } catch {
      say("暂时无法同步，进度已保存在本机，联网后会自动重试。");
    } finally { busy = false; }
  }
  window.addEventListener("learning-progress-changed", schedule);
  window.addEventListener("online", sync);
  window.addEventListener("focus", sync);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) sync(); });
  setInterval(() => { if (!document.hidden) sync(); }, 15000);
  document.getElementById("sync-now").addEventListener("click", sync);
  document.getElementById("cloud-signout").addEventListener("click", async () => {
    if (busy) { say("正在同步，请稍等再退出。"); return; }
    await sync();
    if (!equal(meta.state, app.snapshot())) { say("还有未同步的进度，请联网同步完成后再退出。"); return; }
    stopped = true;
    clearTimeout(timer);
    try {
      client ||= createLearningCloudClient();
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      localStorage.removeItem("toeic700-cloud-active-user");
      window.location.reload();
    } catch { stopped = false; say("退出未完成，请稍后重试。"); }
  });
  const select = document.getElementById("import-local-account");
  let accounts;
  try { accounts = JSON.parse(localStorage.getItem("toeic700-accounts-v1")); } catch {}
  accounts ||= [{ id: "default", name: "原有账号" }];
  for (const account of accounts) {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = account.name;
    select.append(option);
  }
  document.getElementById("import-local-progress").addEventListener("click", async () => {
    if (busy) { say("正在同步，请稍后再导入。"); return; }
    const account = accounts.find(item => item.id === select.value);
    if (!account) return;
    if (!confirm(`将“${account.name}”的本机学习记录合并到当前云端账号？原记录会保留。`)) return;
    const key = `toeic700-offline-state${account.id === "default" ? "" : `:${account.id}`}`;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) { say("这个本机账号还没有学习记录。"); return; }
      const local = app.normalize(JSON.parse(raw));
      app.apply(reconcile(app.normalize({}), local, app.snapshot()));
      schedule();
    } catch { say("无法读取这份本机记录，原记录未更改。"); }
  });
  sync();
})();
