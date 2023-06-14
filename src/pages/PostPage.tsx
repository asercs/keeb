import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import {createComment, createReply, usePost} from "../api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comment = ({ comment, replies, isChild = true, boundaries}) => {

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState('');
    const { id } = useParams();
    const onReply = async (event) => {
        event.preventDefault();
        await mutate({ order: id, content: reply, comment_id: comment.id });
        setReply("");
        setShowReplyForm(false);
    };

    const queryClient = useQueryClient();
    const { mutate, isSuccess: isPostSuccess, isError: isPostError } = useMutation(createReply, {onSuccess: () => {
            queryClient.invalidateQueries(['post', id]);
            toaster();
        }, onError: () => {
            badtoaster();
        }
    });
    const toaster = () => {
        toast.success("Replied", {toastId: "replied"});
    }
    const badtoaster = () => {
        toast.error("Sign in, please!", {toastId: "replyError"});
    }

    return (

        <li className="my-4 text-white pl-2 max-w-[1240px] mx-auto">
            <div className="flex justify-between">
                <p className="font-bold">{comment.author}</p>
                <p className="text-white">{comment.date}</p>
            </div>
            <p className="mb-2 text-white">{comment.content}</p>
            {!isChild && (
                <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </button>
            )}

            {showReplyForm && (
                <form className="mt-4" onSubmit={onReply}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor={`comment-${comment.id}`}>
                            Reply to {comment.author}
                        </label>
                        <textarea
                            className="w-full border-2 border-gray-400 p-2 rounded-lg text-black"
                            name={`comment-${comment.id}`}
                            id={`comment-${comment.id}`}
                            rows={2}
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            )}
            {replies && replies.length > 0 && (
                <ul className="pl-4">
                    {boundaries[comment.id]?.map(reply => {
                        const replyObj = replies.find(rep => rep.id === reply);
                        return (
                            <Comment key={reply} comment={replyObj} isChild={true}  replies={null} boundaries={null}/>
                        );
                    })}
                    {/*{replies?.map(reply => (*/}
                    {/*    <Comment key={reply.id} comment={boundaries[comment.id].includes(reply.id) && reply} isChild={true} />*/}
                    {/*))}*/}
                </ul>
            )}
        </li>
    );
};

const PostPage = () => {
    const { id } = useParams();
    const [newComment, setNewComment] = useState('')

    const queryClient = useQueryClient();
    const { mutate } = useMutation(createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', id]);
            toaster();
        }, onError: () => {
            badtoaster();
        }
    });
    const toaster = () => {
        toast.success('Comment added successfully', {toastId: "commented"});
    }
    const badtoaster = () => {
        toast.error("Sign in, please!", {toastId: "postError"});
    }
    const { data, isLoading, error } = usePost(id || "");
    
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await mutate({ order: id, content: newComment });
        setNewComment('')
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };


    return (
        <div className="container mx-auto my-4 text-white px-2 minHeight max-w-[1240px]">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-white">Posted by {data.author}</p>
            <div className="my-4">
                <p>{data.content}</p>
            </div>
            <hr />
            <h2 className="text-xl font-bold my-4">Comments</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        className="w-full border-2 border-gray-400 p-2 rounded-lg text-black"
                        rows={3}
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Submit
                </button>
                <ToastContainer position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"/>
            </form>
            <ul>
                {data.main_comment?.map((main_comment, index) => (
                    <Comment key={main_comment.id} comment={main_comment} replies={data.reply_comment}
                             isChild={false} boundaries={data.bounder[index]} />
                ))}
            </ul>
            <hr />
        </div>
    );
};

export default PostPage;
