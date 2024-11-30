export interface EditType {
    title?: string;
    courseId: number;
    attachment: {
        size?: number;
        url?: string;
        origName?: string;
    };
}