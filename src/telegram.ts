type ThemeParams = {
  bg_color?: string
  text_color?: string
  hint_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

type WebApp = {
  platform: string
  themeParams: ThemeParams
  ready: () => void
  expand: () => void
  disableVerticalSwipes?: () => void
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp
    }
  }
}

function getWebApp(): WebApp | null {
  return window.Telegram?.WebApp ?? null
}

function isInsideTelegram(app: WebApp): boolean {
  return app.platform !== 'unknown' && app.platform !== ''
}

function applyTheme(theme: ThemeParams): void {
  const root = document.documentElement
  const pairs: Array<[string, string | undefined]> = [
    ['--bg', theme.bg_color],
    ['--text', theme.text_color],
    ['--hint', theme.hint_color],
    ['--button', theme.button_color],
    ['--button-text', theme.button_text_color],
    ['--secondary', theme.secondary_bg_color],
  ]

  for (const [name, value] of pairs) {
    if (value) root.style.setProperty(name, value)
  }
}

export function initTelegram(): void {
  const app = getWebApp()
  if (!app || !isInsideTelegram(app)) return

  app.ready()
  app.expand()
  app.disableVerticalSwipes?.()
  applyTheme(app.themeParams)

  const background = app.themeParams.bg_color
  if (background && /^#[0-9a-fA-F]{6}$/.test(background)) {
    app.setHeaderColor?.(background)
    app.setBackgroundColor?.(background)
  }
}

export function openExternal(url: string): void {
  const app = getWebApp()
  if (app && isInsideTelegram(app)) {
    app.openLink(url, { try_instant_view: false })
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}
