import axios from 'axios'
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { Bookmark, GET_BOOKMARKS } from '../Bookmarks';

const CREATE_BOOKMARK_MUTATION = gql`
	mutation CREATE_BOOKMARK($bookmark: BookmarkInput) {
        createBookmark(bookmark: $bookmark) {
                title
                url
                videoUrl
            }
	}
`;

interface BookmarkInput {
    title: string
    url: string
}

export const getVideo = async (url:string) => {

    const endpoint = import.meta.env.MODE === 'production' ? import.meta.env.VITE_SERVER_ENDPOINT : 'http://localhost:3001/dev/'
    const repsonse = await axios.get(`${endpoint}video?name=${encodeURIComponent(url)}`)

    return repsonse.data.body.download[1].url

}

export const CreateBookmark = () => {

    const [formData, setFormData] = useState<BookmarkInput>({
        title: "",
        url: ""
    })

    const [createBookmark, { data, loading, error }] = useMutation<Bookmark>(CREATE_BOOKMARK_MUTATION, {
        refetchQueries: [
            {
                query: GET_BOOKMARKS
            }
        ]
    });

    return (
        <div className="container mx-auto max-w-3xl">
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    createBookmark({
                        variables: {
                            bookmark: {
                                ...formData,
                                videoUrl: await getVideo(formData.url)
                            } 
                        }
                    })
                    setFormData({ title: "", url: "" })
                }}
            >
                <input
                    className="border-2 border-gray-400 p-2 h-10"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                    type="text"
                    name="url"
                    placeholder="Url"
                />

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </div>
    )
}