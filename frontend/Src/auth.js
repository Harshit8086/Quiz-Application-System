const API_BASE = '';

// Handle Login Form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const errorEl = document.getElementById('login-error');
        const submitBtn = document.getElementById('login-btn');
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!username || !password) {
            errorEl.textContent = 'Please enter both username and password.';
            return;
        }
        
        submitBtn.textContent = 'Signing In…';
        submitBtn.disabled = true;
        errorEl.textContent = '';
        
        try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt_token', data.token);
                localStorage.setItem('playerName', username);

                // Redirect to pending quiz or home
                const quizType = localStorage.getItem('pendingQuiz') || 'index';
                localStorage.removeItem('pendingQuiz');
                
                if (quizType === 'index') {
                    window.location.href = 'index.html';
                } else {
                    window.location.href = `${quizType}-quiz.html`;
                }
            } else {
                errorEl.textContent = 'Invalid username or password.';
            }
        } catch (err) {
            errorEl.textContent = 'Could not reach server. Is the backend running?';
            console.error('Login error:', err);
        } finally {
            submitBtn.textContent = 'Sign In';
            submitBtn.disabled = false;
        }
    });
}

// Handle Signup Form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('reg-username');
        const passwordInput = document.getElementById('reg-password');
        const confirmPasswordInput = document.getElementById('reg-confirm-password');
        
        const errorEl = document.getElementById('signup-error');
        const successEl = document.getElementById('signup-success');
        const submitBtn = document.getElementById('signup-btn');
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        errorEl.textContent = '';
        successEl.textContent = '';
        
        if (!username || !password || !confirmPassword) {
            errorEl.textContent = 'Please fill out all fields.';
            return;
        }
        
        if (password !== confirmPassword) {
            errorEl.textContent = 'Passwords do not match.';
            return;
        }
        
        if (password.length < 6) {
            errorEl.textContent = 'Password must be at least 6 characters.';
            return;
        }
        
        submitBtn.textContent = 'Signing Up…';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                successEl.textContent = 'Account created successfully! Redirecting to login...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                // Usually returns text on failure for simple APIs
                const msg = await response.text();
                errorEl.textContent = msg || 'Registration failed. Username may already exist.';
            }
        } catch (err) {
            errorEl.textContent = 'Could not reach server. Is the backend running?';
            console.error('Signup error:', err);
        } finally {
            if (!successEl.textContent) {
                submitBtn.textContent = 'Sign Up';
                submitBtn.disabled = false;
            }
        }
    });
}
