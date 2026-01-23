# How Stats Section Content Should Be Displayed

## Section Structure

The selector `body > div.px-6.mb-24.mt-16 > div > div > div:nth-child(2)` refers to:

1. **Outer container**: `div.px-6.mb-24.mt-16` - Stats Section
2. **Max-width wrapper**: `div.max-w-[1400px] mx-auto`
3. **Grid container**: `div.grid grid-cols-2 md:grid-cols-4 gap-4`
4. **Second stat card**: `div:nth-child(2)` - **Active Users** card

## HTML Structure (Initial State)

```html
<div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
    <div class="text-5xl font-black bg-gradient-to-br from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2" id="userCount">
        <span class="shimmer h-12 w-20 glass rounded-xl inline-block"></span>
    </div>
    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">Active Users</div>
</div>
```

## How Content Should Be Displayed

### Step 1: Initial Load
- Page loads with a **shimmer placeholder** (`<span class="shimmer">`) inside the `#userCount` element
- This shows a loading animation

### Step 2: JavaScript Execution
- `loadStats()` function is called automatically when the page loads
- It's called in multiple ways:
  1. Immediately via `loadStatsImmediately()` (line 1823)
  2. Via `loadHomepageData()` → `loadStats()` (line 1161)
  3. As a fallback in error handlers

### Step 3: API Call
- JavaScript fetches: `GET /api/tracks/stats`
- Expected response:
```json
{
  "success": true,
  "data": {
    "tracks": 37,
    "users": 5,
    "plays": 12345,
    "artists": 10
  }
}
```

### Step 4: Update Element
- `updateStatElement(userCountEl, stats.users)` is called
- This function:
  1. **Removes** the shimmer `<span>` element
  2. **Sets** `el.textContent = formatNumber(stats.users)` (e.g., "5" or "1.2K+")
  3. The formatted number should appear in the gradient text

### Step 5: Final State
```html
<div id="userCount" class="text-5xl font-black bg-gradient-to-br from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
    5
</div>
```

## Why Content Might Not Display

### Possible Issues:

1. **JavaScript Error**: If there's a syntax error (like the "Unexpected identifier 's'" error), `loadStats()` might not execute
2. **API Failure**: If `/api/tracks/stats` fails, it should show "0" but might not if the error handler fails
3. **Element Not Found**: If `getElementById('userCount')` returns null, nothing updates
4. **Shimmer Not Removed**: If the shimmer removal logic fails, the placeholder stays visible
5. **CSS Issue**: The `text-transparent` with `bg-clip-text` might make text invisible if gradient isn't applied
6. **Timing Issue**: If JavaScript runs before DOM is ready, elements might not exist yet

## How to Debug

1. **Open Browser Console** (F12)
2. **Check for errors**: Look for red error messages
3. **Check console logs**: Look for:
   - "loadStats() called"
   - "Fetching /api/tracks/stats..."
   - "Stats data received:"
   - "Updating element: userCount with value:"
   - "Successfully updated userCount to:"

4. **Check Network Tab**: Verify `/api/tracks/stats` request:
   - Status should be 200
   - Response should contain `"users": <number>`

5. **Inspect Element**: Right-click the stat card → Inspect:
   - Check if `#userCount` element exists
   - Check if shimmer `<span>` is still present
   - Check if `textContent` has a value
   - Check computed styles (might be invisible due to CSS)

## Quick Test

You can manually test in the browser console:

```javascript
// Check if element exists
const el = document.getElementById('userCount');
console.log('Element found:', el);
console.log('Current content:', el?.textContent);
console.log('Has shimmer:', el?.querySelector('.shimmer'));

// Manually update
if (el) {
    el.querySelectorAll('.shimmer').forEach(s => s.remove());
    el.textContent = '5';
    console.log('Updated to:', el.textContent);
}
```
