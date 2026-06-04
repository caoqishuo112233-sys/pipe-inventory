# deploy.ps1
cd $PSScriptRoot

# 先清理旧的 git（如果有）
if (Test-Path ".git") {
  Remove-Item ".git" -Recurse -Force
}

git init
git config user.name "caoqishuo112233-sys"
git config user.email "caoqishuo112233@users.noreply.github.com"
git add -A
git commit -m "管材库存 v1.0 - Gitee同步 + 本地APK"
git remote add origin https://github.com/caoqishuo112233-sys/pipe-inventory.git
git push -u origin main --force

Write-Host ""
Write-Host "================================="
Write-Host "✅ 推送完成！"
Write-Host "等2分钟后打开这个链接下载APK："
Write-Host "https://github.com/caoqishuo112233-sys/pipe-inventory/actions"
Write-Host "================================="
pause
