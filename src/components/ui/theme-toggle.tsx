'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export default function ThemeToggle({
  className = '',
  variant = 'dropdown',
}: {
  className?: string;
  variant?: 'dropdown' | 'segmented';
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-xl border border-border/40 bg-card/40 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Segmented control variant (e.g. for mobile menus)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm ${className}`}
        role="group"
        aria-label="Seleccionar tema de color"
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            theme === 'light'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
          title="Modo Claro"
        >
          <Sun className="h-4 w-4" />
          <span>Claro</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            theme === 'dark'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
          title="Modo Oscuro"
        >
          <Moon className="h-4 w-4" />
          <span>Oscuro</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            theme === 'system'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
          title="Modo Sistema"
        >
          <Monitor className="h-4 w-4" />
          <span>Sistema</span>
        </button>
      </div>
    );
  }

  // Current icon to display on the trigger button
  const CurrentIcon =
    theme === 'system'
      ? Monitor
      : resolvedTheme === 'dark' || theme === 'dark'
      ? Moon
      : Sun;

  const currentLabel =
    theme === 'system'
      ? 'Sistema'
      : theme === 'dark'
      ? 'Oscuro'
      : 'Claro';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-center h-9 w-9 sm:h-9 sm:w-auto sm:px-2.5 sm:gap-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md hover:bg-card hover:border-primary/40 text-foreground transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Tema actual: ${currentLabel}. Cambiar tema`}
        title={`Tema: ${currentLabel}`}
      >
        <CurrentIcon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        <span className="hidden sm:inline text-xs font-medium capitalize text-muted-foreground group-hover:text-foreground">
          {currentLabel}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl z-50 p-1.5 animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Apariencia
          </div>

          <button
            type="button"
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              theme === 'light'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-foreground hover:bg-muted/70 hover:text-primary'
            }`}
            role="menuitem"
          >
            <span className="flex items-center gap-2.5">
              <Sun className="h-4 w-4 text-amber-500" />
              <span>Modo Claro</span>
            </span>
            {theme === 'light' && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-foreground hover:bg-muted/70 hover:text-primary'
            }`}
            role="menuitem"
          >
            <span className="flex items-center gap-2.5">
              <Moon className="h-4 w-4 text-sky-400" />
              <span>Modo Oscuro</span>
            </span>
            {theme === 'dark' && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              theme === 'system'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-foreground hover:bg-muted/70 hover:text-primary'
            }`}
            role="menuitem"
          >
            <span className="flex items-center gap-2.5">
              <Monitor className="h-4 w-4 text-slate-400" />
              <span>Modo Sistema</span>
            </span>
            {theme === 'system' && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>
        </div>
      )}
    </div>
  );
}
