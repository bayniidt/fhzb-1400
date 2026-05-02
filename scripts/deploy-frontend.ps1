$ErrorActionPreference = "Stop"

# One-click frontend deployment for Windows PowerShell (no sshpass needed)
# - Upload current project as tar.gz
# - Extract on server
# - Rebuild/restart frontend app container only
# - Keep backend data volumes untouched

$HostIp = "1.13.254.94"
$User = "root"
$PlainPassword = "c3_Y+S-@%(GwD2b"
$RemoteDir = "/root/fhzb-1400"
$RebuildGateway = $false

if ($env:REBUILD_GATEWAY -eq "1") {
  $RebuildGateway = $true
}

function Ensure-PoshSsh {
  if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
    Write-Host "Installing Posh-SSH module for current user..." -ForegroundColor Yellow
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force | Out-Null
    Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
    Install-Module -Name Posh-SSH -Scope CurrentUser -Force
  }
  Import-Module Posh-SSH -Force
}

function New-DeployArchive {
  param(
    [string]$ProjectRoot
  )

  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $archive = Join-Path $env:TEMP "fhzb-frontend-$stamp.tar.gz"

  Push-Location $ProjectRoot
  try {
    & tar -czf $archive `
      --exclude=.git `
      --exclude=.github `
      --exclude=node_modules `
      --exclude=.next `
      --exclude=.DS_Store `
      --exclude=npm-debug.log* `
      --exclude=yarn-error.log* `
      --exclude=pnpm-debug.log* `
      --exclude=server/database.sqlite `
      --exclude=server/uploads `
      .
  } finally {
    Pop-Location
  }

  return $archive
}

Ensure-PoshSsh

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ArchivePath = New-DeployArchive -ProjectRoot $ProjectRoot
$ArchiveName = Split-Path -Leaf $ArchivePath
$RemoteArchive = "/tmp/$ArchiveName"

$SecurePassword = ConvertTo-SecureString $PlainPassword -AsPlainText -Force
$Credential = New-Object System.Management.Automation.PSCredential($User, $SecurePassword)

Write-Host "1/4 Connecting to server..." -ForegroundColor Cyan
$ssh = New-SSHSession -ComputerName $HostIp -Credential $Credential -AcceptKey
$sftp = New-SFTPSession -ComputerName $HostIp -Credential $Credential -AcceptKey

try {
  Write-Host "2/4 Uploading release package..." -ForegroundColor Cyan
  Set-SFTPItem -SessionId $sftp.SessionId -Path $ArchivePath -Destination "/tmp" -Force

  Write-Host "3/4 Extracting code on server..." -ForegroundColor Cyan
  Invoke-SSHCommand -SessionId $ssh.SessionId -Command "mkdir -p '$RemoteDir'"
  Invoke-SSHCommand -SessionId $ssh.SessionId -Command "tar -xzf '$RemoteArchive' -C '$RemoteDir'"

  Write-Host "4/4 Rebuilding frontend container..." -ForegroundColor Cyan
  if ($RebuildGateway) {
    Invoke-SSHCommand -SessionId $ssh.SessionId -Command "cd '$RemoteDir' && docker compose up -d --build app gateway"
  } else {
    Invoke-SSHCommand -SessionId $ssh.SessionId -Command "cd '$RemoteDir' && docker compose up -d --build app"
  }

  Invoke-SSHCommand -SessionId $ssh.SessionId -Command "rm -f '$RemoteArchive'"
  Write-Host "Deploy complete." -ForegroundColor Green
  Write-Host "Check logs:"
  Write-Host "docker compose -f $RemoteDir/docker-compose.yml logs --tail=100 app"
  Write-Host "Safety note: this script does NOT run docker compose down -v."
}
finally {
  if (Test-Path $ArchivePath) {
    Remove-Item -LiteralPath $ArchivePath -Force
  }
  if ($sftp) {
    Remove-SFTPSession -SessionId $sftp.SessionId | Out-Null
  }
  if ($ssh) {
    Remove-SSHSession -SessionId $ssh.SessionId | Out-Null
  }
}
