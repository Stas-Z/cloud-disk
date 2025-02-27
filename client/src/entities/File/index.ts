export { truncateFileName } from './model/lib/truncateFileName/truncateFileName'

export { sizeFormat } from './model/lib/sizeFormat/sizeFormat'

export { fileIconType } from './model/lib/fileIconType/fileIconType'

export { getAllFiles } from './model/selectors/getAllFiles/getAllFiles'

export { fetchFilesList } from './model/services/fetchFilesList/fetchFilesList'

export { fileReducer, fileActions } from './model/slices/fileSlice'

export {
    getCurrentDir,
    getFileName,
    getSelectedFile,
    getSelectedFileName,
    getFileIsLoading,
} from './model/selectors/fileSelectors/fileSelectors'

export { FileList } from './ui/FileList/FileList'

export type { FileSchema } from './model/types/fileSchema'
export type {
    MyFile,
    FileType,
    FileView,
    FileSortFiled,
} from './model/types/files'
