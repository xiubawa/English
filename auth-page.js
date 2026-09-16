(() => {
  const form = document.getElementById("auth-form");
  const status = document.getElementById("auth-status");
  let busy = false;
  async function submit(register) {
    if (busy || !form.reportValidity()) return;
    busy = true;
    const buttons = [...form.querySelectorAll("button")];
    buttons.forEach(button => button.disabled = true);
    status.textContent = register ? "正在创建账号…" : "正在登录…";
    try {
      const { name, email } = learningUsername(document.getElementById("username").value);
      const password = document.getElementById("password").value;
      const client = createLearningCloudClient();
      const result = register
        ? await client.auth.signUp({ email, password, options: { data: { username: name } } })
        : await client.auth.signInWithPassword({ email, password });
      document.getElementById("password").value = "";
      if (result.error) throw new Error(register ? "注册未完成：用户名可能已使用，或请求过于频繁，请稍后重试。" : "登录失败，请检查用户名和密码，或稍后重试。");
      if (!result.data.session) throw new Error("云端账号设置尚未完成，请联系网站管理员。");
      localStorage.setItem("toeic700-cloud-active-user", result.data.user.id);
      localStorage.setItem("toeic700-cloud-display-name", name);
      window.location.assign("./");
    } catch (error) {
      status.textContent = error.message || "网络连接失败，请稍后重试。";
    } finally {
      busy = false;
      buttons.forEach(button => button.disabled = false);
    }
  }
  form.addEventListener("submit", event => { event.preventDefault(); submit(false); });
  document.getElementById("register").addEventListener("click", () => submit(true));
})();
