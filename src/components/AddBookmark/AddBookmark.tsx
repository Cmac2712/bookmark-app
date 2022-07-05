import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { Bookmark, GET_BOOKMARKS } from '../Bookmarks';

const ADD_BOOKMARK_MUTATION = gql`
	mutation ADD_BOOKMARK($bookmark: BookmarkInput) {
        addBookmark(bookmark: $bookmark) {
                title
                url
            }
	}
`;

interface BookmarkInput {
    title: string
    url: string 
}

export const AddBookmark = () => {

    const [formData, setFormData] = useState<BookmarkInput>({
        title: "",
        url: ""
    })

    const [addBookmark, { data, loading, error }] = useMutation<Bookmark>(ADD_BOOKMARK_MUTATION, {
        refetchQueries: [
            {
                query: GET_BOOKMARKS
            }
        ]
    });

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                addBookmark({
                    variables: {
                        bookmark: formData
                    }
                })
                setFormData({ title: "", url: "" })
            }}
        >
            <input
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                type="text"
                name="title"
                placeholder="Bookmark Title"
            />
            <input
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                type="text"
                name="url"
                placeholder="Url"
            />

            <button
                type="submit"
            >
                Add
            </button>
        </form>
    )
}