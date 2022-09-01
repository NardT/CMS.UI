export interface PaginationResponse<T> {
    data: T[],
    currentPage: number,
    totalPages: number,
    totalCount: number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}
