import i18next from 'i18next'

export const sizeFormat = (size: number) => {
    if (size > 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024 * 1024)).toFixed(1)} ${i18next.t('Gb')}`
    }
    if (size > 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(1)} ${i18next.t('Mb')}`
    }
    if (size > 1024) {
        return `${(size / 1024).toFixed(1)} ${i18next.t('Kb')}`
    }

    return `${size} ${i18next.t('byte')}`
}
