# Cleanup script for unused assets in Puviyan website
# This script removes unused image files identified through code analysis

Write-Host "Starting cleanup of unused assets..." -ForegroundColor Green

# List of unused image files to remove
$unusedImages = @(
    "public\images\Co2.png",                    # Duplicate of Co-2.png
    "public\images\EventCollage1.webp",         # Unused variant
    "public\images\Home_at.jpg",                # Unused home image
    "public\images\Home_bt1.jpeg",              # Unused home image variant
    "public\images\Home_bt2.jpg",               # Unused home image variant
    "public\images\MobileImage1.jpg",           # Unused mobile image
    "public\images\PPT2.gif",                   # Unused presentation image
    "public\images\PPT3.jpg",                   # Unused presentation image
    "public\images\Puv_mob1.jpg",               # Unused mobile image
    "public\images\Puv_mob2.jpg",               # Unused mobile image
    "public\images\Puviyan_app.jpg",            # Unused app image
    "public\images\Puviyanworld1.jpg",          # Unused world image
    "public\images\Puviyanworld2.jpg",          # Unused world image
    "public\images\UniteWithUs1.webp",          # Unused unite image
    "public\images\UniteWithUs2.webp",          # Unused unite image variant
    "public\images\Unite_with_puviyan.jpg",     # Unused unite image
    "public\images\Unite_with_puviyan4.jpg"     # Unused unite image variant
)

$totalSize = 0
$removedCount = 0

foreach ($file in $unusedImages) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        $fileSize = (Get-Item $fullPath).Length
        $totalSize += $fileSize
        
        Write-Host "Removing: $file ($([math]::Round($fileSize/1KB, 2)) KB)" -ForegroundColor Yellow
        Remove-Item $fullPath -Force
        $removedCount++
    } else {
        Write-Host "File not found (already removed?): $file" -ForegroundColor Gray
    }
}

Write-Host "`nCleanup completed!" -ForegroundColor Green
Write-Host "Files removed: $removedCount" -ForegroundColor Cyan
Write-Host "Total space saved: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Cyan

# Note: Keeping Puviyan.ico as it's referenced in index.html as favicon
Write-Host "`nNote: Puviyan.ico was kept as it's used as favicon in index.html" -ForegroundColor Blue
