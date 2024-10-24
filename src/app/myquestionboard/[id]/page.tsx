"use client"
import { CopyEventLinkButton } from '@/components/CopyLinkButton';
import Loading from '@/components/Loading';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Edit, Rocket, RocketIcon, Trash } from 'lucide-react';

import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



const getData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/questionborad/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data!");
    }

    return res.json();
};



const QuestionboradDetail = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [questionboard, setQuestionboard] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [answerContent, setAnswerContent] = useState('');
    const [authorId, setAuthorId] = useState<string | null>(null);
    const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
    const [editedAnswerContent, setEditedAnswerContent] = useState<string>('');
    const router = useRouter();
    const [showLoader, setShowLoader] = React.useState(true);
    const [finished, setFinished] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [topic, setTopic] = useState<string>(''); 
    const [img, setImg] = useState<string>(''); 
    const [content, setContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);




  



    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            if (session) {
                setAuthorId(session.user.id); // Use user.id from session
            }

            try {
                const data = await getData(id);
                setQuestionboard(data);
                setTopic(data.topic);
                setImg(data.img);
                setContent(data.content);
            } catch (error) {
                setError('Something went wrong');
            } finally {
                setShowLoader(false);
                setFinished(true); // Set finished to true when loading is done
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchQuestionboard = async () => {
            const response = await fetch(`/api/questionborad/${params.id}`);
            if (!response.ok) {
                setError('Failed to fetch questionboard');
                return;
            }
            const data = await response.json();
            setQuestionboard(data);
        };

        fetchQuestionboard();
    }, [params.id]);



    if (error) {
        return <div>Error: {error}</div>;
    }


    const showDescription = true;


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!authorId) {
            console.error('User is not logged in');
            return;
        }

        try {
            const response = await fetch('/api/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content_answer: answerContent,
                    questiosnboradId: id,
                    authorId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Failed to create answer:', errorData);
                return;
            }

            const newAnswer = await response.json();
            // Update state with the new answer
            setQuestionboard((prev: any) => ({
                ...prev,
                answers: [...prev.answers, newAnswer],
            }));
            setAnswerContent(''); // Clear the input after submitting
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleDelete = async (answerId: string) => {
        if (!confirm('Are you sure you want to delete this answer?')) {
            return;
        }

        try {
            const response = await fetch(`/api/answers/${answerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Failed to delete answer:', errorData);
                return;
            }

            setQuestionboard((prev: any) => ({
                ...prev,
                answers: prev.answers.filter((answer: any) => answer.id !== answerId),
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleUpdate = async (answerId: string) => {
        if (!editedAnswerContent) {
            console.error('No content to update');
            return;
        }

        try {
            const response = await fetch(`/api/answers/${answerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content_answer: editedAnswerContent }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Failed to update answer:', errorData);
                return;
            }

            const updatedAnswer = await response.json();
            setQuestionboard((prev: any) => ({
                ...prev,
                answers: prev.answers.map((answer: any) =>
                    answer.id === updatedAnswer.id ? updatedAnswer : answer
                ),
            }));
            setEditingAnswerId(null); // Reset editing state
            setEditedAnswerContent(''); // Clear the editing content
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleDeleteQuestionboard = async () => {

        try {
            const res = await fetch(`http://localhost:3000/api/questionborad/${params.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete questionboard");
            }


            router.push(`/myquestionboard`);
        } catch (error) {
            console.error(error);
        }
        setOpenDialog(false);
    };

    // Method to handle updating the questionboard
    const handleUpdateQuestionborad = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        const updatedData = {
            topic,
            img,
            content,
        };

        try {
            const response = await fetch(`/api/questionborad/${questionboard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Failed to update questionboard:', errorData);
                return;
            }

            const updatedQuestionboard = await response.json();
            setQuestionboard(updatedQuestionboard); // Update state with the new questionboard data
            setIsEditing(false);
            router.push(`/myquestionboard/${id}`);
        } catch (error) {
            console.error('Error updating questionboard:', error);
        }
    };


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!questionboard) {
        return <Loading finished={false} />;
    }


    return (
        <div className="bg-gray-200 flex flex-col items-start h-full pt-8 px-4 lg:px-8">
            <Link href={"/myquestionboard"} className="text-xs underline underline-offset-2">
                <ArrowLeft className="w-3 h-3 inline-block mr-1" />
                <span> Back to Questionboard</span>
            </Link>

            <div className="w-full flex flex-col mt-3 lg:flex-row lg:shrink-0 lg:justify-between">
                <div>
                    <h2 className="font-bold text-2xl lg:text-3xl">{questionboard.topic}</h2>



                    {showDescription && (
                        <p className="line-clamp-1 text-sm text-muted-foreground mt-1.5">
                            {questionboard.content}
                        </p>
                    )}

                    <div className="inline-flex items-center gap-x-2 mt-2">
                        <span className="text-xs lg:text-sm">
                            <span className="text-slate-600">Post By </span>
                            <span className="font-semibold">{questionboard.owner?.name}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* แสดงปุ่ม CopyEventLinkButton และ Delete ด้านบนรูปภาพ */}
            <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                    <CopyEventLinkButton
                        questionboardId={questionboard.id}
                        questionboardTopic={questionboard.topic}
                    />
                    <Button
                        onClick={() => setOpenDialog(true)}
                        className='flex items-center p-2 text-red-400 rounded-md bg-red-900'
                        title='Delete Questionboard'>
                        <Trash className='w-4 h-4' />
                        Delete
                    </Button>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className='flex items-center p-2 text-blue-500 rounded-md bg-blue-900'
                        title='Edit Questionboard'>
                        <Edit className='w-4 h-4' />
                        Edit
                    </Button>
                </div>
            </div>


            {/* Edit Dialog */}
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent>
                    <DialogTitle>Edit Questionboard</DialogTitle>
                    <form onSubmit={handleUpdateQuestionborad}>
                        <label>Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <label>Image URL</label>
                        <input
                            type="text"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <label>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <div className="flex justify-end mt-4 space-x-2">
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>



            {/* แสดงรูปภาพ */}
            {questionboard.img && (
                <div className="flex justify-center mt-4">
                    <img
                        src={questionboard.img}
                        alt={`Image for ${questionboard.topic}`}
                        className="max-w-full rounded-md shadow-md"
                    />
                </div>
            )}






            {/* Dialog สำหรับลบ */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure for Delete Your QuestionBoard?
                    </DialogDescription>
                    <div className="flex justify-end">
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleDeleteQuestionboard} className='ml-2' variant='destructive'>
                            Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>















            {/* Comments Section */}
            <div className="w-full h-full overflow-auto pb-4 mt-6 flex-grow">
                <ScrollArea className="relative h-full bg-green-300 px-2.5 py-4 rounded-b-lg lg:rounded-lg lg:p-6">
                    <h3 className="font-bold text-xl">Comments</h3>

                    {/* Check if data is loading */}
                    {!questionboard ? (
                        <p>Loading comments...</p> // Show loading state while data is being fetched
                    ) : (
                        <>
                            {/* Check if there are any answers after loading */}
                            {(!questionboard.answers || questionboard.answers.length === 0) ? (
                                <p>No answers available.</p>
                            ) : (
                                <ul>
                                    {questionboard.answers?.map((answer: any) => (
                                        <Card key={answer.id} className="mt-2">
                                            <CardHeader>
                                                <p className="font-semibold">{answer.author?.name || 'Unknown'}</p>
                                            </CardHeader>
                                            <CardContent>
                                                {editingAnswerId === answer.id ? (
                                                    <div>
                                                        <textarea
                                                            value={editedAnswerContent}
                                                            onChange={(e) => setEditedAnswerContent(e.target.value)}
                                                            rows={3}
                                                            className="w-full"
                                                        />
                                                        <button onClick={() => handleUpdate(answer.id)}>Save</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p>{answer.content_answer}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Posted at: {new Date(answer.createdAt).toLocaleString()}
                                                        </p>
                                                    </>
                                                )}
                                            </CardContent>
                                            <CardFooter>
                                                <div className="flex space-x-2"> {/* Flex for buttons */}
                                                    {answer.authorId === authorId && (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingAnswerId(answer.id);
                                                                    setEditedAnswerContent(answer.content_answer);
                                                                }}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(answer.id)}
                                                                className="text-red-500 hover:underline"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </ScrollArea>
            </div>








            {/* Comments Input Form at the bottom */}
            <form onSubmit={handleSubmit} className="mt-4 w-full">
                <textarea
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    rows={3}
                    placeholder="Write your comment..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="mt-2 w-32 px-6 py-3 bg-green-500 text-white rounded flex items-center justify-center">
                    <Rocket className='w-5 h-4 mr-2' />
                    Submit
                </button>

            </form>
        </div>
    );

};

export default QuestionboradDetail;
