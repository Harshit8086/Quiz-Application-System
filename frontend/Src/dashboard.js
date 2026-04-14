const API_BASE = 'http://localhost:8080';

// ── Auth helpers ──────────────────────────────────────────────────────────

function getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

function requireAuth() {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = 'login.html';
    }
}

// ── Navbar & UI Management ────────────────────────────────────────────────
function initMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

function updateNavbar() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;
    
    const playerName = localStorage.getItem('playerName');
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'dynamic-link';
    logoutBtn.textContent = `Logout (${playerName || 'User'})`;
    logoutBtn.style.color = '#ff6b6b';
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('playerName');
        window.location.href = 'index.html';
    };
    navLinks.appendChild(logoutBtn);
}

// ── Fetch & Render Stats ──────────────────────────────────────────────────

async function loadDashboardData() {
    requireAuth();
    initMenuToggle();
    updateNavbar();

    try {
        // Fetch Aggregated Stats
        const statsRes = await fetch(`${API_BASE}/api/dashboard/my-stats`, {
            headers: getAuthHeaders()
        });
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const stats = await statsRes.json();

        // Fetch History
        const historyRes = await fetch(`${API_BASE}/api/dashboard/my-history`, {
            headers: getAuthHeaders()
        });
        if (!historyRes.ok) throw new Error('Failed to fetch history');
        const history = await historyRes.json();

        renderStats(stats);
        renderHistory(history);

    } catch (err) {
        console.error('Dashboard data error:', err);
        showToast('Session expired or error loading data. Please login again.');
        setTimeout(() => window.location.href = 'login.html', 2000);
    }
}

function renderStats(stats) {
    document.getElementById('stat-total').textContent = stats.totalQuizzes;
    document.getElementById('stat-avg').textContent = `${stats.averageScore}%`;
    
    // Format seconds to H:M:S
    const hours = Math.floor(stats.totalTimeSpent / 3600);
    const minutes = Math.floor((stats.totalTimeSpent % 3600) / 60);
    const seconds = stats.totalTimeSpent % 60;
    
    let timeStr = '';
    if (hours > 0) timeStr += `${hours}h `;
    if (minutes > 0 || hours > 0) timeStr += `${minutes}m `;
    timeStr += `${seconds}s`;
    
    document.getElementById('stat-time').textContent = timeStr;
}

function renderHistory(history) {
    const container = document.getElementById('history-container');
    
    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>You haven't taken any quizzes yet.</p>
                <a href="index.html#quiz-packages" class="btn">Take Your First Quiz</a>
            </div>
        `;
        return;
    }

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
    `;

    history.forEach(session => {
        const date = new Date(session.submittedAt).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        const accuracy = Math.round((session.score / session.totalQuestions) * 100);
        
        const m = Math.floor(session.timeTaken / 60);
        const s = session.timeTaken % 60;
        const timeStr = m > 0 ? `${m}m ${s}s` : `${s}s`;

        tableHtml += `
            <tr>
                <td class="date-cell">${date}</td>
                <td class="score-cell">${session.score} / ${session.totalQuestions}</td>
                <td>${accuracy}%</td>
                <td>${timeStr}</td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';
    container.innerHTML = tableHtml;
}

// ── Toast ─────────────────────────────────────────────────────────────────

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

window.onload = loadDashboardData;
