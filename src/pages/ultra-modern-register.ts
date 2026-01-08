export const ultraModernRegisterHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body {
            background: #000000;
            background-image: radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.2) 0px, transparent 50%),
                             radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.2) 0px, transparent 50%);
            background-attachment: fixed;
        }
        .glass-strong { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.12); }
    </style>
</head>
<body class="text-white min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md">
        <a href="/en" class="flex items-center justify-center space-x-3 mb-12">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <i class="fas fa-music text-white text-2xl"></i>
            </div>
            <span class="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
        </a>
        
        <div class="glass-strong rounded-3xl p-8">
            <h2 class="text-3xl font-bold mb-2">Create Account</h2>
            <p class="text-gray-400 mb-8">Join the MusicHub community</p>
            
            <form onsubmit="handleRegister(event)" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium mb-2">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        required
                        class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="John Doe"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        required
                        class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="your@email.com"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        required
                        minlength="8"
                        class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                    >
                </div>
                
                <button 
                    type="submit" 
                    class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    Create Account
                </button>
                
                <p class="text-center text-sm text-gray-400">
                    Already have an account? <a href="/en/login" class="text-purple-400 hover:text-purple-300">Login</a>
                </p>
            </form>
        </div>
    </div>
    
    <script>
        async function handleRegister(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                
                const data = await res.json();
                if (data.success) {
                    alert('Registration successful! Please login.');
                    window.location.href = '/en/login';
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        }
    </script>
</body>
</html>`;
