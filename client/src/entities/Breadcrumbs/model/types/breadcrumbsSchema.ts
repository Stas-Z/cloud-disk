export interface BreadcrumbItem {
    id: number
    name: string
}

export interface BreadcrumbsSchema {
    error?: string
    isLoading?: boolean
    breadcrumbs: BreadcrumbItem[]
}
