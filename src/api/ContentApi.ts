    import {instance} from "./profileApi";

export const contentAPI = {
    content: () => {
        return instance.get<Array<{
            id: number,
            Title: string,
            BrowserTitle: string,
            MetaDescription: string,
            UrlSlug: string,
            Content: string
        }>>('ContentPage/')
    }
}