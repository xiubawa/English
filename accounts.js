(() => {
  const registryKey = "toeic700-accounts-v1";
  const activeKey = "toeic700-active-account-v1";
  const original = { id: "default", name: "原有账号" };
  function readAccounts() {
    const raw = localStorage.getItem(registryKey);
    const saved = raw ? JSON.parse(raw) : [original];
    if (!Array.isArray(saved) || !saved.some(a => a.id === "default")) throw new Error("账号列表无法读取");
    return saved;
  }
  const accounts = readAccounts();
  const activeId = localStorage.getItem(activeKey) || "default";
  const active = accounts.find(a => a.id === activeId) || original;
  const suffix = active.id === "default" ? "" : `:${active.id}`;
  window.learningAccount = Object.freeze({
    stateKey: `toeic700-offline-state${suffix}`,
    cloudKey: `toeic700-cloud-sync${suffix}`,
    cloudFile: active.id === "default" ? "toeic700-progress.json" : `toeic700-progress-${active.id}.json`
  });
  const select = document.getElementById("account-select");
  const status = document.getElementById("account-status");
  for (const account of accounts) {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = account.name;
    select.append(option);
  }
  select.value = active.id;
  function switchAccount(id) {
    try {
      localStorage.setItem(activeKey, id);
      window.location.reload();
    } catch {
      select.value = active.id;
      status.textContent = "无法保存账号，请检查浏览器是否允许本地存储。";
    }
  }
  select.addEventListener("change", () => switchAccount(select.value));
  document.getElementById("add-account").addEventListener("click", () => {
    const input = window.prompt("请输入新账号名称（最多 24 个字）");
    if (input === null) return;
    const name = input.trim();
    if (!name || name.length > 24) {
      status.textContent = "请输入 1–24 个字的账号名称。";
      return;
    }
    try {
      const latest = readAccounts();
      if (latest.some(a => a.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
        status.textContent = "这个账号名称已存在，请使用其他名称。";
        return;
      }
      const id = crypto.randomUUID();
      latest.push({ id, name });
      localStorage.setItem(registryKey, JSON.stringify(latest));
      switchAccount(id);
    } catch {
      status.textContent = "新增账号失败，请检查浏览器存储后重试。";
    }
  });
})();