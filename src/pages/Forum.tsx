import {createPost, usePosts} from "../api";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forum = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await mutate({ title, content });
        setTitle("");
        setContent("");
        setShowModal(false);
    };
    const queryClient = useQueryClient();
    const { mutate, isSuccess: isPostSuccess, isError: isPostError } = useMutation(createPost, {onSuccess: () => {
        queryClient.invalidateQueries(['post']);
        toast.success("Post created", {toastId: "postCreated"});
    }, onError: () => {
        toast.error("Sign in, please!", {toastId: "error"});
        }
    });
    const {data, isLoading, isError} = usePosts();
    if (isLoading) {
        return (
            <div className="minHeight flex justify-center items-center">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
            </div>
        );
    }
    console.log(data)
    return (
        <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4 minHeight text-white">
            <ToastContainer position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"/>
            <div id="card" className="">
                <h1 className="text-white font-extrabold text-3xl text-center p-4 mb-14">Forum</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium text-white">Posts</h2>
                <button onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New post
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((post) => (
                    <Link to={`/forum/${post.order}`}>
                    <div
                        key={post.order}
                        className={`bg-gray-600 overflow-hidden shadow rounded-lg ${
                            post.order % 3 === 1
                                ? "border-l-4 border-indigo-500"
                                : post.order % 3 === 2
                                    ? "border-l-4 border-green-500"
                                    : "border-l-4 border-pink-500"
                        }`}
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-white truncate">
                                {post.title}
                            </h3>
                            <h3>{post.content}</h3>
                            <br/>
                            <p className="mt-2 text-sm text-white">
                                By {post.author}
                            </p>
                        </div>
                        <div className="bg-gray-700 px-4 py-3">
                            <p className="text-sm text-white">
                                Last modified: {post.day_ago}
                                <br/>
                                Created: {post.date}
                            </p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal content */}
                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-96 my-auto"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-gray-700 px-4 py-3 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-headline">
                                        New Post
                                    </h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        type="button"
                                        className="bg-gray-700 rounded-md text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 absolute top-3 right-3"
                                    >
                                        <span className="sr-only">Close</span>
                                        {/* Heroicon name: x */}
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-100">
                                            Title
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete="off"
                                                required
                                                className="p-2  bg-gray-600 border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                value={title}
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-100">
                                            Content
                                        </label>
                                        <div className="mt-1">
                              <textarea
                                  id="content"
                                  name="content"
                                  className="p-2 bg-gray-600 border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={content}
                                  rows={4}
                                  onChange={handleContentChange}
                                  required
                              ></textarea>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export {Forum}