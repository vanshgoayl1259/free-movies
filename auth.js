const supabaseUrl = 'https://iulunxkqjdifdylrcoyg.supabase.co';
const supabaseKey = 'sb_publishable_SpZvbJSha7TYBVIcHrbZ4Q_U2FUOseV';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. SESSION CHECK & NAVBAR UPDATE ---
    const { data: { session } } = await supabase.auth.getSession();
    
    const navActions = document.querySelector('.nav-actions');
    if (session && navActions) {
        navActions.innerHTML = `<button id="logout-btn" class="btn btn-secondary" style="padding: 8px 15px; border: 1px solid rgba(255,255,255,0.2);">Logout</button>`;
        document.getElementById('logout-btn').addEventListener('click', async () => {
            const btn = document.getElementById('logout-btn');
            btn.textContent = 'Logging out...';
            btn.disabled = true;
            await supabase.auth.signOut();
            window.location.reload();
        });
    }

    // --- 2. PROTECT MOVIES ON INDEX.HTML ---
    const playButtons = document.querySelectorAll('.hero-buttons .btn-primary'); // 'Play Now' button
    const movieCards = document.querySelectorAll('.movie-card');
    
    const handleMovieClick = (e) => {
        if (!session) {
            e.preventDefault();
            e.stopPropagation();
            alert('Please login to watch this movie.');
            window.location.href = 'login.html';
        }
    };

    playButtons.forEach(btn => {
        btn.addEventListener('click', handleMovieClick);
    });

    movieCards.forEach(card => {
        card.addEventListener('click', handleMovieClick);
    });

    // --- 3. LOGIN LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            if (error) {
                alert(error.message);
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // --- 4. REGISTER LOGIC ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Registering...';
            submitBtn.disabled = true;

            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            if (error) {
                alert(error.message);
            } else {
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            }
        });
    }

    // Redirect logged-in users away from login/register pages
    if (session && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        window.location.href = 'index.html';
    }
});
