// ============================================
//   MUONS - API Connection Layer (Fixed)
//   Designed & Developed by Aken Sanketh
// ============================================

const API_URL = "https://script.google.com/macros/s/AKfycbzIR07k7R3WllOIeqaLtUhmwyLsV_8htxqmAsF65mcGu43d1tj4F9-gXlr6lValJ8z59Q/exec";

// ============================================
//   CORE FETCH FUNCTION (CORS Fixed)
// ============================================
async function apiCall(action, data = {}) {
    try {

        const payload = JSON.stringify({ action, ...data });

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: payload,
            redirect: "follow"
        });

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch {
            console.error("Non-JSON response:", text);
            return { success: false, message: "Invalid server response" };
        }

    } catch (error) {
        console.error("Fetch error:", error);
        return { success: false, message: "Connection error. Please try again." };
    }
}

// ============================================
//   AUTH FUNCTIONS
// ============================================
async function loginUser(email, password) {
    return await apiCall("login", { email, password });
}

async function registerUser(name, email, password, role) {
    return await apiCall("register", { name, email, password, role });
}

// ============================================
//   NEWS FUNCTIONS
// ============================================
async function getNews() {
    return await apiCall("getNews");
}

async function addNews(title, content, author) {
    return await apiCall("addNews", { title, content, author });
}

// ============================================
//   EVENTS FUNCTIONS
// ============================================
async function getEvents() {
    return await apiCall("getEvents");
}

async function addEvent(title, date, venue, status, description) {
    return await apiCall("addEvent", { title, date, venue, status, description });
}

// ============================================
//   GALLERY FUNCTIONS
// ============================================
async function getGallery() {
    return await apiCall("getGallery");
}

async function addGallery(title, imageURL, event, date) {
    return await apiCall("addGallery", { title, imageURL, event, date });
}

// ============================================
//   MEMBERS FUNCTIONS
// ============================================
async function getMembers() {
    return await apiCall("getMembers");
}

// ============================================
//   ACHIEVEMENTS FUNCTIONS
// ============================================
async function getAchievements() {
    return await apiCall("getAchievements");
}

async function addAchievement(title, date, description) {
    return await apiCall("addAchievement", { title, date, description });
}

// ============================================
//   EQUIPMENT FUNCTIONS
// ============================================
async function getEquipment() {
    return await apiCall("getEquipment");
}

async function updateEquipment(id, status, assignedTo, dueDate, condition) {
    return await apiCall("updateEquipment", { id, status, assignedTo, dueDate, condition });
}

// ============================================
//   ADMIN FUNCTIONS
// ============================================
async function getUsers() {
    return await apiCall("getUsers");
}

async function approveUser(userID, status) {
    return await apiCall("approveUser", { userID, status });
}

// ============================================
//   SESSION MANAGEMENT
// ============================================
function saveSession(user) {
    localStorage.setItem("muons_user", JSON.stringify(user));
}

function getSession() {
    const user = localStorage.getItem("muons_user");
    return user ? JSON.parse(user) : null;
}

function clearSession() {
    localStorage.removeItem("muons_user");
}

function isLoggedIn() {
    return getSession() !== null;
}

function isAdmin() {
    const user = getSession();
    return user && user.role === "admin";
}

function isMember() {
    const user = getSession();
    return user && (
        user.role === "member" ||
        user.role === "admin"
    );
}

function redirectIfNotLoggedIn() {
    if (!isLoggedIn()) {
        window.location.href = "auth.html";
    }
}

function redirectIfNotAdmin() {
    if (!isAdmin()) {
        window.location.href = "dashboard.html";
    }
}