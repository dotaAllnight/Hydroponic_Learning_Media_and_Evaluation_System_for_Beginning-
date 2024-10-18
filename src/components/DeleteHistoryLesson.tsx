const DeleteHistoryButton = ({ lessonId }: { lessonId: string }) => {
    const handleDeleteHistory = async () => {
        try {
            const response = await fetch('/api/historyLesson', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lessonId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete history lesson');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error deleting history lesson:", error);
        }
    };

    return (
        <button
            onClick={handleDeleteHistory}
            className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition'
        >
            Delete History
        </button>
    );
};

export default DeleteHistoryButton
