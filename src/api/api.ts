import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
})

export const postsAPI = {
    getAllPosts() {
        return instance
            .get(`posts`);
    },
    getPosts(page: number = 1) {
        return instance
            .get(`posts?_page=${page}`);
    },
    getFilterPosts(body: string = '') {
        return instance
            .get(`posts?title_like=${body}`);
    },
    getFilterPostsWithPage(body: string = '', currentPage: number = 1) {
        return instance
            .get(`posts?title_like=${body}&_page=${currentPage}`);
    },
    getPostInfo(postId: string) {
        return instance
            .get(`posts/${postId}`)
    },
    getPostComments(postId: string) {
        return instance
            .get(`comments?postId=${postId}`)
    }
}