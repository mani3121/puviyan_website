# Image Conversion and Cleanup Script
# This script converts used images to AVIF format (except MobileImage_Final.jpeg) and deletes unused images

# Set the images directory
$imagesDir = "public\images"

# List of unused images to delete
$unusedImages = @(
    "Co2.png",
    "EventCollage1.webp", 
    "Home_at.jpg",
    "Home_bt1.jpeg",
    "Home_bt2.jpg",
    "MobileImage1.jpg",
    "PPT2.gif",
    "PPT3.jpg",
    "Puv_mob1.jpg",
    "Puv_mob2.jpg",
    "Puviyan.ico",
    "Puviyan_app.jpg",
    "Puviyanworld1.jpg",
    "Puviyanworld2.jpg",
    "UniteWithUs1.webp",
    "UniteWithUs2.webp",
    "Unite_with_puviyan.jpg",
    "Unite_with_puviyan4.jpg"
)

# List of images to convert to AVIF (excluding MobileImage_Final.jpeg)
$imagesToConvert = @(
    @{Original="Co-2.png"; New="Co-2.avif"},
    @{Original="Home_bt.jpg"; New="Home_bt.avif"},
    @{Original="Home_bt.jpeg"; New="Home_bt.avif"}, # This will overwrite the previous one, keeping the .jpeg version
    @{Original="Home_bt_mob.jpg"; New="Home_bt_mob.avif"},
    @{Original="Home_at_mob.jpg"; New="Home_at_mob.avif"},
    @{Original="puviyan_logo.png"; New="puviyan_logo.avif"},
    @{Original="ppt1.gif"; New="ppt1.avif"},
    @{Original="UniteWithUs2.png"; New="UniteWithUs2.avif"}
)

Write-Host "Starting image cleanup and conversion process..." -ForegroundColor Green

# Step 1: Delete unused images
Write-Host "`nStep 1: Deleting unused images..." -ForegroundColor Yellow
foreach ($image in $unusedImages) {
    $imagePath = Join-Path $imagesDir $image
    if (Test-Path $imagePath) {
        Remove-Item $imagePath -Force
        Write-Host "Deleted: $image" -ForegroundColor Red
    } else {
        Write-Host "Not found (already deleted?): $image" -ForegroundColor Gray
    }
}

# Step 2: Check for image conversion tools
Write-Host "`nStep 2: Checking for image conversion tools..." -ForegroundColor Yellow

$ffmpegAvailable = $false
$magickAvailable = $false

try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    $ffmpegAvailable = $true
    Write-Host "FFmpeg found!" -ForegroundColor Green
} catch {
    Write-Host "FFmpeg not found" -ForegroundColor Gray
}

try {
    $null = Get-Command magick -ErrorAction Stop
    $magickAvailable = $true
    Write-Host "ImageMagick found!" -ForegroundColor Green
} catch {
    Write-Host "ImageMagick not found" -ForegroundColor Gray
}

# Step 3: Convert images to AVIF
Write-Host "`nStep 3: Converting images to AVIF format..." -ForegroundColor Yellow

if ($ffmpegAvailable -or $magickAvailable) {
    foreach ($imageInfo in $imagesToConvert) {
        $originalPath = Join-Path $imagesDir $imageInfo.Original
        $newPath = Join-Path $imagesDir $imageInfo.New
        
        if (Test-Path $originalPath) {
            try {
                if ($ffmpegAvailable) {
                    # Use FFmpeg for conversion
                    & ffmpeg -i $originalPath -c:v libaom-av1 -crf 30 -b:v 0 $newPath -y 2>$null
                } elseif ($magickAvailable) {
                    # Use ImageMagick for conversion
                    & magick $originalPath $newPath
                }
                
                if (Test-Path $newPath) {
                    Write-Host "Converted: $($imageInfo.Original) -> $($imageInfo.New)" -ForegroundColor Green
                } else {
                    Write-Host "Failed to convert: $($imageInfo.Original)" -ForegroundColor Red
                }
            } catch {
                Write-Host "Error converting $($imageInfo.Original): $($_.Exception.Message)" -ForegroundColor Red
            }
        } else {
            Write-Host "Source image not found: $($imageInfo.Original)" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "No image conversion tools found. Please install FFmpeg or ImageMagick to convert images to AVIF format." -ForegroundColor Red
    Write-Host "You can install FFmpeg from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "Or ImageMagick from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
}

Write-Host "`nImage cleanup and conversion process completed!" -ForegroundColor Green
Write-Host "`nRemaining images in directory:" -ForegroundColor Cyan
Get-ChildItem $imagesDir | Sort-Object Name | ForEach-Object { Write-Host "  $($_.Name)" }
