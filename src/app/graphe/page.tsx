"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LessonCountPage = () => {
    const [lessonCount, setLessonCount] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        const fetchLessonCount = async () => {
            try {
                const response = await fetch('/api/lessons');
                const data = await response.json();
                setLessonCount(data.length);
            } catch (error) {
                console.error("Error fetching lesson count:", error);
            }
        };

        const fetchUserCount = async () => {
            try {
                const response = await fetch('/api/userCounts');
                const data = await response.json();
                setUserCount(data.count); // สมมุติว่า API ส่งกลับ { count: number }
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        fetchLessonCount();
        fetchUserCount();
    }, []);

    // Data for total lessons
    const totalData = {
        labels: ['Total Lessons', 'Total Users'],
        datasets: [
            {
                label: 'Count',
                data: [lessonCount, userCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Total Lessons Count: {lessonCount}</h1>
            <h1>Total Users Count: {userCount}</h1>
            <div style={{ width: '250px', height: '300px' }}>
                <Bar data={totalData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default LessonCountPage;
