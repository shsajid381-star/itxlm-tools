// ITXLM Tools - Authentication & Security Module

const AUTH_CONFIG = {
  VALID_EMAIL: "admin@itxlm.com",
  VALID_PASS: "admin123",
  STORAGE_KEY: "itxlm_logged_in",
  USER_KEY: "itxlm_user"
};

// Check if user is authenticated
function isAuthenticated() {
  return (
    sessionStorage.getItem(AUTH_CONFIG.STORAGE_KEY) === "true" ||
    localStorage.getItem(AUTH_CONFIG.STORAGE_KEY) === "true"
  );
}

// Get current logged-in user
function getCurrentUser() {
  const userJson =
    sessionStorage.getItem(AUTH_CONFIG.USER_KEY) ||
    localStorage.getItem(AUTH_CONFIG.USER_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return { email: AUTH_CONFIG.VALID_EMAIL, role: "Administrator" };
    }
  }
  return null;
}

// Security Guard for Protected Pages (e.g. index.html)
function requireAuth() {
  if (!isAuthenticated()) {
    // Redirect immediately to login.html
    window.location.replace("login.html");
  }
}

// Redirect away from login page if already logged in
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.replace("index.html");
  }
}

// Perform Login
function performLogin(email, password, remember = false) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanEmail === AUTH_CONFIG.VALID_EMAIL.toLowerCase() && cleanPass === AUTH_CONFIG.VALID_PASS) {
    const userData = {
      email: cleanEmail,
      name: "Sajjad Bhai (Admin)",
      role: "Administrator",
      loginTime: new Date().toISOString()
    };

    if (remember) {
      localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, "true");
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
    } else {
      sessionStorage.setItem(AUTH_CONFIG.STORAGE_KEY, "true");
      sessionStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
    }
    return { success: true };
  }

  return {
    success: false,
    message: "Invalid email or password! Please check your credentials."
  };
}

// Perform Logout
function performLogout() {
  sessionStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
  sessionStorage.removeItem(AUTH_CONFIG.USER_KEY);
  localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
  localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  window.location.replace("login.html");
}
