"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateQuizPage = () => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: [{ text: '', isCorrect: false }] }
    ]);
    const router = useRouter();

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex].text = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectChange = (qIndex: number, oIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex].isCorrect = !updatedQuestions[qIndex].options[oIndex].isCorrect;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [{ text: '', isCorrect: false }] }]);
    };

    const addOption = (qIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/games', {
                topic,
                questions,
            });
            router.push('/'); // Redirect after successful creation
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create a new Quiz</h1>
            <div className="mb-4">
                <label className="block font-semibold">Topic:</label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                />
            </div>

            {questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-4">
                    <label className="block font-semibold">Question {qIndex + 1}:</label>
                    <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="w-full border px-4 py-2 rounded"
                    />
                    {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mt-2">
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                className="flex-grow border px-4 py-2 rounded mr-2"
                            />
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={option.isCorrect}
                                    onChange={() => handleCorrectChange(qIndex, oIndex)}
                                    className="mr-2"
                                />
                                Correct
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addOption(qIndex)}
                        className="mt-2 text-blue-500"
                    >
                        + Add Option
                    </button>
                </div>
            ))}

            <button type="button" onClick={addQuestion} className="mt-4 text-blue-500">
                + Add Question
            </button>

            <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
                Create Quiz
            </button>
        </div>
    );
};

export default CreateQuizPage;
