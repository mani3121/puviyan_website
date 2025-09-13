# Cleanup script for unused dependencies in Puviyan website
# This script identifies unused dependencies that can be removed

Write-Host "Analyzing unused dependencies..." -ForegroundColor Green

# Dependencies that appear to be unused based on code analysis
$unusedDependencies = @(
    "@hookform/resolvers",
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog", 
    "@radix-ui/react-aspect-ratio",
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-context-menu",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-hover-card",
    "@radix-ui/react-label",
    "@radix-ui/react-menubar",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-popover",
    "@radix-ui/react-progress",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-slider",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toast",
    "@radix-ui/react-toggle",
    "@radix-ui/react-toggle-group",
    "@radix-ui/react-tooltip",
    "class-variance-authority",
    "clsx",
    "date-fns",
    "embla-carousel-react",
    "input-otp",
    "react-day-picker",
    "react-ga4",
    "react-hook-form",
    "react-icons",
    "react-resizable-panels",
    "recharts",
    "sonner",
    "vaul",
    "zod"
)

Write-Host "`nUnused dependencies found:" -ForegroundColor Yellow
foreach ($dep in $unusedDependencies) {
    Write-Host "  - $dep" -ForegroundColor Red
}

Write-Host "`nTo remove these dependencies, run:" -ForegroundColor Cyan
Write-Host "npm uninstall $($unusedDependencies -join ' ')" -ForegroundColor White

Write-Host "`nNote: Only remove dependencies you're certain are not used." -ForegroundColor Blue
Write-Host "Some may be used indirectly or planned for future features." -ForegroundColor Blue
