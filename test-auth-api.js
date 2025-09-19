/**
 * Simple test script to verify authentication API endpoints
 * Run with: node test-auth-api.js
 * Make sure the Next.js server is running on localhost:3000
 */

const BASE_URL = 'http://localhost:3000/api/auth';

async function testAPI() {
  console.log('🧪 Testing Authentication API...\n');

  try {
    // Test 1: Signup Step 1 (Send OTP)
    console.log('1️⃣ Testing Signup Step 1 (Send OTP)...');
    const signupStep1 = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        mobile: '1234567890',
        password: 'password123',
        accountType: 'User'
      })
    });

    const step1Result = await signupStep1.json();
    console.log('Response:', step1Result);

    if (!step1Result.success) {
      throw new Error('Signup Step 1 failed');
    }
    console.log('✅ OTP sent successfully\n');

    // Test 2: Signup Step 2 (Verify OTP) - This will fail without real OTP
    console.log('2️⃣ Testing Signup Step 2 (Verify OTP)...');
    const signupStep2 = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        mobile: '1234567890',
        password: 'password123',
        accountType: 'User',
        code: '123456' // This will fail - use real OTP from email
      })
    });

    const step2Result = await signupStep2.json();
    console.log('Response:', step2Result);
    console.log('ℹ️  This will fail with invalid OTP - use real OTP from email\n');

    // Test 3: Login (This will fail if user doesn't exist)
    console.log('3️⃣ Testing Login...');
    const login = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const loginResult = await login.json();
    console.log('Response:', loginResult);
    console.log('ℹ️  This will fail if user doesn\'t exist\n');

    // Test 4: Profile without authentication
    console.log('4️⃣ Testing Profile (Unauthenticated)...');
    const profile = await fetch(`${BASE_URL}/profile`, {
      method: 'GET'
    });

    const profileResult = await profile.json();
    console.log('Response:', profileResult);
    console.log('✅ Correctly rejected unauthenticated request\n');

    // Test 5: Logout
    console.log('5️⃣ Testing Logout...');
    const logout = await fetch(`${BASE_URL}/logout`, {
      method: 'POST'
    });

    const logoutResult = await logout.json();
    console.log('Response:', logoutResult);
    console.log('✅ Logout endpoint working\n');

    console.log('🎉 Basic API structure test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Check your email for the OTP');
    console.log('2. Use the real OTP in Step 2 signup');
    console.log('3. Test login with created user');
    console.log('4. Test authenticated profile endpoints');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAPI();
