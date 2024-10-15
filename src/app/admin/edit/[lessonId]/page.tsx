

"use client";
import SingleLessonUpdatePage from "@/components/EditLessonForm ";

// Ensure this file is a Client Component

const EditLessonPage = ({ params }: { params: { lessonId: string } }) => {
    const { lessonId } = params; // Extract lessonId from params

    // Ensure the lessonId is available
    if (!lessonId) {
        return <div>Error: Lesson ID not found.</div>; // Handle error appropriately
    }

    return (
        <div>
            <SingleLessonUpdatePage lessonId={lessonId} /> {/* Pass the lessonId to your update page */}
        </div>
    );
};

export default EditLessonPage;