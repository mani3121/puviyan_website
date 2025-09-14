# Simple image conversion script
# This script will copy existing images with .avif extension for now
# You can later replace these with actual AVIF conversions using proper tools

$imagesDir = "public\images"

# Images to convert (excluding MobileImage_Final.jpeg)
$imagesToConvert = @(
    "Co-2.png",
    "Home_bt.jpg", 
    "Home_bt.jpeg",
    "Home_bt_mob.jpg",
    "Home_at_mob.jpg",
    "puviyan_logo.png",
    "ppt1.gif",
    "UniteWithUs2.png"
)

Write-Host "Creating AVIF versions of images..." -ForegroundColor Green

foreach ($image in $imagesToConvert) {
    $sourcePath = Join-Path $imagesDir $image
    $targetPath = Join-Path $imagesDir ($image -replace '\.(png|jpg|jpeg|gif)$', '.avif')
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $targetPath -Force
        Write-Host "Created: $targetPath" -ForegroundColor Yellow
    } else {
        Write-Host "Source not found: $sourcePath" -ForegroundColor Red
    }
}

Write-Host "`nConversion completed!" -ForegroundColor Green
Write-Host "Note: These are temporary copies. For actual AVIF conversion, install FFmpeg or ImageMagick." -ForegroundColor Cyan
