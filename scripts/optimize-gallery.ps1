# Compress gallery JPEGs in place: longest side <= 1600px, JPEG quality 82.
Add-Type -AssemblyName System.Drawing

$dir = Join-Path (Split-Path $PSScriptRoot -Parent) 'public/gallery'
$files = Get-ChildItem -Path $dir -Filter *.jpg
$maxSide = 1600
$quality = 82

$encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $encoders | Where-Object { $_.MimeType -eq 'image/jpeg' }

$totalBefore = ($files | Measure-Object -Property Length -Sum).Sum
$totalAfter = 0

foreach ($f in $files) {
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $beforeLen = $f.Length
    $scale = [Math]::Min(1.0, $maxSide / [Math]::Max($img.Width, $img.Height))

    if ($scale -lt 1.0) {
      $newW = [int][Math]::Round($img.Width * $scale)
      $newH = [int][Math]::Round($img.Height * $scale)
      $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.DrawImage($img, 0, 0, $newW, $newH)
      $g.Dispose()
      $img.Dispose()

      $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

      $tmp = Join-Path $f.DirectoryName ("_opt_tmp_" + $f.Name)
      $bmp.Save($tmp, $jpegCodec, $params)
      $bmp.Dispose()

      [System.IO.File]::Move($tmp, $f.FullName, $true) | Out-Null
      $after = (Get-Item $f.FullName).Length
      $totalAfter += $after
      Write-Host ("{0}: {1}x{2} | {3:N0} KB -> {4:N0} KB" -f $f.Name, $newW, $newH, ($beforeLen/1KB), ($after/1KB))
    } else {
      $img.Dispose()
      $totalAfter += $beforeLen
      Write-Host ("{0}: already <= {1}px, kept ({2:N0} KB)" -f $f.Name, $maxSide, ($beforeLen/1KB))
    }
  } catch {
    Write-Warning ("Failed to process {0}: {1}" -f $f.Name, $_.Exception.Message)
  }
}

Write-Host ("DONE. Total: {0:N1} MB -> {1:N1} MB" -f ($totalBefore/1MB), ($totalAfter/1MB))
