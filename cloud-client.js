(() => {
  const config = window.LEARNING_CLOUD_CONFIG || {};
  window.createLearningCloudClient = () => {
    if (!config.url || !config.publishableKey) throw new Error("云端服务尚未配置，原有本机学习功能仍可使用。");
    if (!window.supabase?.createClient) throw new Error("登录组件加载失败，请检查网络后刷新。");
    return window.supabase.createClient(config.url, config.publishableKey, {
      auth: { storageKey: "toeic700-auth-session", persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
  };
  // A private, non-deliverable alias is solely an Auth identifier, never a recovery address.
  window.learningUsername = input => {
    const name = String(input).trim().toLowerCase();
    if (!/^[a-z0-9_\-]{3,32}$/.test(name)) throw new Error("用户名需为 3–32 位字母、数字、下划线或短横线。");
    return { name, email: `${name}@username.invalid` };
  };
})();
