import "@testing-library/jest-dom"
import { vi, afterEach } from 'vitest'

//Mock para test useTheme next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,  // Simula "light mode" por default; muda pra true pra dark
    media: query,
    onchange: null,
    addListener: vi.fn(),  // Deprecated, mas pro compat
    removeListener: vi.fn(),  // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

//mock para next/google/fonts

const mockFontFamily = vi.fn((options?:any) => ({

  className:`mock-font-${options?.weight || '400'}`,
  style:{fontFamily:'mock-font, sans-serif'}

}))

vi.mock('next/font/google', () => {

  return {

    Roboto:mockFontFamily,
    Bad_Script:mockFontFamily,
    Creepster:mockFontFamily,
    Montserrat:mockFontFamily,
    Open_Sans:mockFontFamily,
    Urbanist:mockFontFamily,
    Allura:mockFontFamily

  }

})

afterEach(() => {

    vi.restoreAllMocks()

})