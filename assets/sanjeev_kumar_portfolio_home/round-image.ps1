Add-Type -AssemblyName System.Drawing

$sourcePath = "favicon.png"
$backupPath = "favicon.orig.png"

# Check if target file exists
if (-Not (Test-Path $sourcePath)) {
    Write-Error "Source file not found."
    exit 1
}

# backup original
Copy-Item $sourcePath -Destination $backupPath -Force

$img = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) $sourcePath))

$width = $img.Width
$height = $img.Height
$minSize = [math]::Min($width, $height)

# Create a new blank, transparent image of minSize x minSize
$roundedImg = New-Object System.Drawing.Bitmap($minSize, $minSize)
$roundedImg.MakeTransparent()

$graphics = [System.Drawing.Graphics]::FromImage($roundedImg)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Create brush using the original image
$brush = New-Object System.Drawing.TextureBrush($img)

# Center the brush if the image is not perfectly square
$offsetX = ($width - $minSize) / 2
$offsetY = ($height - $minSize) / 2
$brush.TranslateTransform(-$offsetX, -$offsetY)

# Draw the circle
$graphics.FillEllipse($brush, 0, 0, $minSize, $minSize)

$img.Dispose()
$graphics.Dispose()
$brush.Dispose()

# Save as PNG
$roundedImg.Save((Join-Path (Get-Location) $sourcePath), [System.Drawing.Imaging.ImageFormat]::Png)
$roundedImg.Dispose()

Write-Output "Successfully created rounded favicon."
