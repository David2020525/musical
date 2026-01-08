export const modernRegisterHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-900">
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/en" class="flex items-center space-x-2">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/en" class="text-gray-300 hover:text-white transition">Home</a>
                    <a href="/en/browse" class="text-gray-300 hover:text-white transition">Browse</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="min-h-screen flex items-center justify-center py-24 px-4">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-user-plus text-white text-3xl"></i>
                </div>
                <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p class="text-gray-400">Join MusicHub today</p>
            </div>
            <form id="registerForm" class="mt-8 space-y-6 bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <div id="error" class="hidden p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300"></div>
                <div id="success" class="hidden p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300"></div>
                
                <div class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input id="username" name="username" type="text" required 
                            class="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>

                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input id="name" name="name" type="text" required 
                            class="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input id="email" name="email" type="email" required 
                            class="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input id="password" name="password" type="password" required 
                            class="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required 
                            class="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                </div>

                <button type="submit" id="submitBtn"
                    class="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                    <i class="fas fa-user-plus mr-2"></i>
                    Create Account
                </button>
                
                <div class="text-center">
                    <a href="/en/login" class="text-purple-400 hover:text-purple-300 text-sm">Already have an account? <span class="font-semibold">Sign in</span></a>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const submitBtn = document.getElementById('submitBtn');
            const errorDiv = document.getElementById('error');
            const successDiv = document.getElementById('success');
            
            errorDiv.classList.add('hidden');
            successDiv.classList.add('hidden');

            if (password !== confirmPassword) {
                errorDiv.textContent = 'Passwords do not match';
                errorDiv.classList.remove('hidden');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating account...';
            
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, name, email, password })
                });
                
                const data = await response.json();
                
                if (data.success && data.data) {
                    successDiv.textContent = 'Account created successfully! Redirecting...';
                    successDiv.classList.remove('hidden');
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    setTimeout(() => window.location.href = '/en/dashboard', 1500);
                } else {
                    errorDiv.textContent = data.error || 'Registration failed';
                    errorDiv.classList.remove('hidden');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Create Account';
                }
            } catch (error) {
                errorDiv.textContent = 'Network error. Please try again.';
                errorDiv.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Create Account';
            }
        });
    </script>
</body>
</html>`;
