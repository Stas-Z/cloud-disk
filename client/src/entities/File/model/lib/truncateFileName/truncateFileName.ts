export const truncateFileName = (
    fileName: string,
    length: number = 19,
    firstLetters: number = 9,
    lastLetters: number = 10,
) => {
    if (fileName.length <= length) {
        return fileName // Если название файла короче 19 символов, то возвращаем его без изменений
    }
    // Выбираем первые 9 символов и последние 10 символов, между ними ставим троеточие
    const truncatedName = `${fileName.substring(0, firstLetters)}...${fileName.substring(fileName.length - lastLetters)}`
    return truncatedName
}
