const API_BASE = '';

/**
 * Redirects or navigates based on authentication state.
 */
function startQuiz(quizType) {
    if (quizType !== 'java') {
        const name = quizType.charAt(0).toUpperCase() + quizType.slice(1);
        showToast(`${name} quiz is coming soon! 🚀`);
        return;
    }

    const token = localStorage.getItem('jwt_token');
    if (!token) {
        localStorage.setItem('pendingQuiz', quizType);
        window.location.href = 'login.html';
    } else {
        window.location.href = `${quizType}-quiz.html`;
    }
}

// ── Navbar Management ─────────────────────────────────────────────────────

function initMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.onclick = () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        };

        // Close menu when a link is clicked
        navLinks.onclick = (e) => {
            if (e.target.tagName === 'A') {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        };
    }
}

function updateNavbar() {
    const navLinksContainer = document.getElementById('nav-links');
    const token = localStorage.getItem('jwt_token');
    const playerName = localStorage.getItem('playerName');

    if (!navLinksContainer) return;

    // Remove any previous dynamic links
    const dynamicLinks = navLinksContainer.querySelectorAll('.dynamic-link');
    dynamicLinks.forEach(link => link.remove());

    if (token) {
        // User is logged in
        const dashboardLink = document.createElement('a');
        dashboardLink.href = 'dashboard.html';
        dashboardLink.textContent = 'My Dashboard';
        dashboardLink.className = 'dynamic-link';
        navLinksContainer.appendChild(dashboardLink);

        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.textContent = `Logout (${playerName})`;
        logoutBtn.className = 'dynamic-link';
        logoutBtn.style.color = '#ff6b6b';
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            handleLogout();
        };
        navLinksContainer.appendChild(logoutBtn);
    } else {
        // User is guest
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.textContent = 'Login / Sign Up';
        loginLink.className = 'dynamic-link login-btn';
        navLinksContainer.appendChild(loginLink);
    }
}

function handleLogout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('playerName');
    showToast('Logged out successfully 👋');
    updateNavbar();
    // Optional: redirect to home if on a protected page
}

// ── Leaderboard ───────────────────────────────────────────────────────────

async function loadLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    
    try {
        const response = await fetch(`${API_BASE}/api/dashboard/leaderboard`);
        if (!response.ok) throw new Error('Could not fetch leaderboard');
        
        const data = await response.json();
        
        if (data.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:rgba(255,255,255,0.5);">No scores yet. Be the first!</p>';
            return;
        }

        container.innerHTML = '';
        data.forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            
            const minutes = Math.floor(entry.timeTaken / 60);
            const seconds = entry.timeTaken % 60;
            const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

            item.innerHTML = `
                <div class="lb-rank">${index + 1}</div>
                <div class="lb-player">${entry.playerName}</div>
                <div class="lb-stats">
                    <div class="lb-score">${entry.score}/${entry.totalQuestions}</div>
                    <div class="lb-time">${timeStr}</div>
                </div>
            `;
            container.appendChild(item);
        });

    } catch (err) {
        console.error('Leaderboard error:', err);
        container.innerHTML = '<p style="color: #ff6b6b;">Failed to load leaderboard data.</p>';
    }
}

// ── Toast ─────────────────────────────────────────────────────────────────

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), duration);
}

// ── Init ──────────────────────────────────────────────────────────────────

window.onload = () => {
    initMenuToggle();
    updateNavbar();
    loadLeaderboard();
};