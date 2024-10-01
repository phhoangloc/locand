import axios from "axios"

export type BodyType = {
    genre: string,
    id?: string,
    slug?: string,
    search?: string,
    skip?: number,
    limit?: number,
    sort?: string,
    update?: number,
}

export const ApiLogin = async (body: any) => {
    const result = await axios.post(process.env.api_url + "api/login", body)
    return result.data
}

export const ApiSignup = async (body: { username: string, password: string, email: string }) => {
    const result = await axios.post(process.env.api_url + "api/signup", body, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return result.data
}
export const ApiItem = async ({ genre, search, id, slug, sort, skip, limit }: BodyType) => {
    try {
        const result = await axios.get(process.env.api_url + "api/" +
            genre +
            "?genre=" + genre +
            "&search=" + `${search ? search : ""}` +
            "&id=" + `${id ? id : ""}` +
            "&slug=" + `${slug ? slug : ""}` +
            "&skip=" + `${skip ? skip : ""}` +
            "&sort=" + `${sort ? sort : ""}` +
            "&limit=" + `${limit ? limit : ""}`
        )
        return result.data
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}