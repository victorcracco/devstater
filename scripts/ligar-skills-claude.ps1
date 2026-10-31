# Liga as skills de .agents/skills ao Claude, sem duplicar arquivos: o Codex lê .agents/skills e o Claude lê .claude/skills.
$raiz = Split-Path $PSScriptRoot -Parent
$destino = Join-Path $raiz '.claude\skills'
New-Item -ItemType Directory -Force $destino | Out-Null

foreach ($skill in Get-ChildItem (Join-Path $raiz '.agents\skills') -Directory) {
    $atalho = Join-Path $destino $skill.Name
    if (Test-Path $atalho) {
        Write-Output "ja existe: $($skill.Name)"
    } else {
        New-Item -ItemType Junction -Path $atalho -Target $skill.FullName | Out-Null
        Write-Output "ligada: $($skill.Name)"
    }
}
