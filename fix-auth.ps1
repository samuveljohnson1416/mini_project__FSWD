# Smart Expense Tracker - Complete Authentication Fix Script
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Smart Expense Tracker - Authentication Fix  " -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop all Node processes
Write-Host "Step 1: Stopping all Node.js processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "✅ Stopped $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Green
} else {
    Write-Host "✅ No Node.js processes running" -ForegroundColor Green
}
Start-Sleep -Seconds 2

# Step 2: Clear database users
Write-Host ""
Write-Host "Step 2: Clearing database users..." -ForegroundColor Yellow
npm run clear:users
Start-Sleep -Seconds 2

# Step 3: Create fresh admin user
Write-Host ""
Write-Host "Step 3: Creating fresh admin user..." -ForegroundColor Yellow
npm run seed:user
Start-Sleep -Seconds 2

# Step 4: Instructions
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Next Steps - Follow These Carefully!  " -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Start the servers in a NEW terminal:" -ForegroundColor White
Write-Host "   npm run dev:all" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  Open your browser Developer Tools (F12)" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Go to Console tab and run:" -ForegroundColor White
Write-Host "   localStorage.clear();" -ForegroundColor Cyan
Write-Host "   location.reload();" -ForegroundColor Cyan
Write-Host ""
Write-Host "4️⃣  After page reloads, login with:" -ForegroundColor White
Write-Host "   Email:    admin@expense.com" -ForegroundColor Cyan
Write-Host "   Password: Admin@123" -ForegroundColor Cyan
Write-Host ""
Write-Host "5️⃣  OR create a new account via Signup page" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Database and authentication reset complete!  " -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
