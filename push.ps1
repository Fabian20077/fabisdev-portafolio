#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

Write-Host "Navegando al directorio del proyecto..."
Set-Location "c:\Users\USUARIO\Downloads\Portafolio Fabis-dev"

Write-Host "Estado actual del repositorio:"
git status

Write-Host "`nHaciendo fetch..."
git fetch origin main

Write-Host "`nHaciendo rebase..."
git rebase origin/main

Write-Host "`nHaciendo push..."
git push origin main

Write-Host "`nPush completado exitosamente!"
