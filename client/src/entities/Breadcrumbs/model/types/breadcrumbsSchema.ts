export interface BreadcrumbItem {
    id: string
    name: string
}

export interface BreadcrumbsSchema {
    error?: string
    isLoading?: boolean
    breadcrumbs: BreadcrumbItem[]
}
