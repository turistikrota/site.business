export const isGtLg = (width: number) => width > 1024

export const isGtMd = (width: number) => width > 768

export const isLtLg = (width: number) => width < 1024

export const isLtMd = (width: number) => width < 768

export const isWindowGtLg = () => isGtLg(window.innerWidth)

export const isWindowGtMd = () => isGtMd(window.innerWidth)

export const isWindowLtLg = () => isLtLg(window.innerWidth)

export const isWindowLtMd = () => isLtMd(window.innerWidth)
