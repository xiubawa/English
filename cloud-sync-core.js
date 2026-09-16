/* Shared reconciliation for the authenticated cloud adapter. */
(function (root) {
  "use strict";
  const clone = value => JSON.parse(JSON.stringify(value));
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const setFields = new Set(["known", "unknown", "seenWords", "studyDays"]);
  const listFields = new Set(["wordMistakes", "mistakes", "scores", "customVocab"]);
  const objectFields = new Set(["tasks", "wordbookLastByFilter"]);
  function itemKey(field, item) {
    if (field === "wordMistakes") return `${item.item?.kind || "word"}:${item.item?.word || item.question || ""}`.toLowerCase();
    if (field === "customVocab") return `${item.kind || "word"}:${item.word || ""}`.toLowerCase();
    return JSON.stringify(item);
  }
  // Reapply only local edits to the latest server state after a revision conflict.
  // Unchanged local fields must never overwrite changes from another device.
  function reconcile(base = {}, local = {}, remote = {}) {
    const result = clone(remote);
    for (const key of Object.keys(local)) {
      if (equal(base[key], local[key])) continue;
      if (setFields.has(key) || listFields.has(key)) {
        const identity = item => setFields.has(key) ? JSON.stringify(item) : itemKey(key, item);
        const before = new Map((base[key] || []).map(item => [identity(item), item]));
        const after = new Map((local[key] || []).map(item => [identity(item), item]));
        const merged = new Map((remote[key] || []).map(item => [identity(item), item]));
        for (const id of before.keys()) if (!after.has(id)) merged.delete(id);
        for (const [id, item] of after) if (!before.has(id) || !equal(before.get(id), item)) merged.set(id, item);
        result[key] = [...merged.values()];
      } else if (objectFields.has(key)) {
        const before = base[key] || {};
        const after = local[key] || {};
        const merged = { ...(remote[key] || {}) };
        for (const id of Object.keys(before)) if (!Object.hasOwn(after, id)) delete merged[id];
        for (const [id, value] of Object.entries(after)) if (!equal(before[id], value)) merged[id] = value;
        result[key] = merged;
      } else {
        result[key] = clone(local[key]);
      }
    }
    return result;
  }
  const api = { reconcile, equal, clone };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LearningSyncCore = api;
})(typeof window === "undefined" ? globalThis : window);
