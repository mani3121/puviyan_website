@echo off
echo Converting images to AVIF format...

REM Check if ffmpeg is available
where ffmpeg >nul 2>nul
if %errorlevel% == 0 (
    echo FFmpeg found, converting images...
    
    REM Convert PNG images
    ffmpeg -i "public\images\Co-2.png" -c:v libaom-av1 -crf 30 "public\images\Co-2.avif" -y
    ffmpeg -i "public\images\puviyan_logo.png" -c:v libaom-av1 -crf 30 "public\images\puviyan_logo.avif" -y
    ffmpeg -i "public\images\UniteWithUs2.png" -c:v libaom-av1 -crf 30 "public\images\UniteWithUs2.avif" -y
    
    REM Convert JPG/JPEG images
    ffmpeg -i "public\images\Home_at_mob.jpg" -c:v libaom-av1 -crf 30 "public\images\Home_at_mob.avif" -y
    ffmpeg -i "public\images\Home_bt.jpeg" -c:v libaom-av1 -crf 30 "public\images\Home_bt.avif" -y
    ffmpeg -i "public\images\Home_bt.jpg" -c:v libaom-av1 -crf 30 "public\images\Home_bt.avif" -y
    ffmpeg -i "public\images\Home_bt_mob.jpg" -c:v libaom-av1 -crf 30 "public\images\Home_bt_mob.avif" -y
    
    REM Convert GIF
    ffmpeg -i "public\images\ppt1.gif" -c:v libaom-av1 -crf 30 "public\images\ppt1.avif" -y
    
    echo Conversion completed!
) else (
    echo FFmpeg not found. Please install FFmpeg to convert images to AVIF format.
    echo Download from: https://ffmpeg.org/download.html
)

pause
