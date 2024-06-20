export interface BookChapterResponse {
    code: number,
    message: string,
    data: BookChapter
}
export interface BookChapter {
    id: number,
    title: string,
    package_type: number,
    chapters: Chapter[]
}
interface Chapter {
    id: number,
    chapter_number: number,
}