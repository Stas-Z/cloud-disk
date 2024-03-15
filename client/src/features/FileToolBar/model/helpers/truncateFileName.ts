export const truncateFileName = (fileName: string) => {
    if (fileName.length <= 19) {
        return fileName // Если название файла короче 19 символов, то возвращаем его без изменений
    }
    // Выбираем первые 9 символов и последние 10 символов, между ними ставим троеточие
    const truncatedName = `${fileName.substring(0, 9)}...${fileName.substring(fileName.length - 10)}`
    return truncatedName
}
