import { NavLink } from 'react-router-dom'
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useTheme } from "@/hooks/useTheme"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="flex h-12 items-center w-full">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink className={navigationMenuTriggerStyle()} to="/">
            <img
              src={theme === "light" ? "logo-dark.png" : "logo-light.png"}
              alt="Logo"
              className="navbar__logo max-w-[6rem] max-h-6rem]"
            />
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink className={navigationMenuTriggerStyle()} to="/about">
            About
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className="ml-auto flex items-center space-x-4">
      <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="relative overflow-hidden">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  </div>
</header>
  )
}