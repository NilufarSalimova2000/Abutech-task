export interface CreateType {
    title?: string;
    courseId: number;
    attachment: {
        size?: number;
        url?: string;
        origName?: string;
    };
}

export interface dataType {
    data: {
        fileName: string;
        path: string;
        size: number;
    }[];
    error: null;
    success: boolean;
}