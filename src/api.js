let csrfToken = "";

async function request(url, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  let response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: "same-origin",
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(method !== "GET" && csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Can't reach the local API. Check that the Flask server is running.");
  }
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (response.status === 401 && !url.startsWith("/api/auth/")) {
    window.dispatchEvent(new Event("auth:expired"));
  }
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status}).`);
  if (data?.csrf_token) csrfToken = data.csrf_token;
  return data;
}

export const api = {
  authStatus: () => request("/api/auth/status"),
  authLogin: (credentials) => request("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  authSetup: (account) => request("/api/auth/setup", { method: "POST", body: JSON.stringify(account) }),
  authMe: () => request("/api/auth/me"),
  authLogout: () => request("/api/auth/logout", { method: "POST", body: "{}" }),
  authChangePassword: (passwords) => request("/api/auth/change-password", { method: "POST", body: JSON.stringify(passwords) }),
  settings: () => request("/api/settings"),
  updateSettings: (settings) => request("/api/settings", { method: "PATCH", body: JSON.stringify(settings) }),
  dashboard: () => request("/api/dashboard"),
  members: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value));
    return request(`/api/members${query.size ? `?${query}` : ""}`);
  },
  createMember: (member) => request("/api/members", { method: "POST", body: JSON.stringify(member) }),
  updateMember: (id, changes) => request(`/api/members/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(changes) }),
  deleteMember: (id) => request(`/api/members/${encodeURIComponent(id)}`, { method: "DELETE" }),
  recordPayment: (id, payment) => request(`/api/members/${encodeURIComponent(id)}/payments`, { method: "POST", body: JSON.stringify(payment) }),
  recordReminder: (id) => request(`/api/members/${encodeURIComponent(id)}/reminders`, { method: "POST", body: "{}" }),
};
