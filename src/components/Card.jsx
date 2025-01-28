import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    FaEdit,
    FaTrash,
    FaPlus,      // For "Add Module"
    FaUserPlus, // For "Add Student"
    FaUsers     // For "Enrolled Students"
} from "react-icons/fa";
import { addModule } from "../features/module/ModuleSlice";
import { addStudentToCourse } from "../features/course/CourseSlice";
import { useNavigate } from "react-router-dom";
import ModuleModal from "./ModuleModel";
import AddStudentModal from "./AddStudentModal";

const Card = ({
    title,
    category,
    image,
    onEdit,
    onDelete,
    courseId,
    teacher,
    description,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModuleModalVisible, setIsModuleModalVisible] = useState(false);
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);

    // Add Module
    const handleAddModule = (moduleData) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const payload = {
            ...moduleData,
            courseId,
            teacherId: userInfo?.data?._id,
        };
        dispatch(addModule(payload));
        setIsModuleModalVisible(false);
    };

    // Add Student
    const handleAddStudent = async (studentData) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const payload = {
                ...studentData,
                courseId,
                teacherId: userInfo?.data?._id,
            };
            await dispatch(addStudentToCourse(payload)).unwrap();
            setIsAddStudentModalVisible(false);
        } catch (error) {
            console.error("Failed to add student:", error);
        }
    };

    return (
        <div
            /* 
               1) Make the entire card “hoverable.” 
               2) Use pointer-events-none so the entire card doesn’t 
                  steal clicks from the icon buttons. 
               3) We’ll make the bottom icons pointer-events-auto 
                  so they remain clickable.
            */
            className="
                relative
                group 
                bg-gray-800 
                rounded-xl 
                shadow-lg 
                overflow-hidden 
                transition 
                hover:shadow-xl 
                cursor-pointer 
                text-white
            "
        >
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={image}
                    alt={title}
                    className="
                        w-full 
                        h-full 
                        object-cover 
                        transition-all 
                        duration-300 
                        group-hover:scale-105
                    "
                />
                {/* 
                    Hover Overlay:
                    - Stretches across the entire card
                    - On hover, user sees that they can click
                    - We do pointer-events-auto so user can click on it
                */}
                <div
                    className="
                        absolute 
                        inset-0 
                        group-hover:bg-black/10 
                        transition-all 
                        duration-300
                        pointer-events-auto
                    "
                    onClick={() => navigate(`/courses/${courseId}/teachers/${teacher?._id}`)}
                ></div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 space-y-2 pointer-events-none">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm">Category: {category}</p>
                <p className="text-sm">Teacher: {teacher?.name}</p>
                {description && (
                    <p className="text-sm">{description}</p>
                )}
            </div>

            {/* ACTION BUTTONS (BOTTOM) */}
            <div className="p-4 border-t flex items-center justify-between">
                {/* Left Buttons: Add Module / Add Student / Enrolled */}
                <div className="flex items-center space-x-2 pointer-events-auto">
                    {/* Add Module */}
                    <button
                        onClick={() => setIsModuleModalVisible(true)}
                        title="Add Module"
                        className="
                            w-10 
                            h-10 
                            flex 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-green-600 
                            text-white 
                            hover:bg-green-500 
                            transition
                        "
                    >
                        <FaPlus className="w-4 h-4" />
                    </button>

                    {/* Add Student */}
                    <button
                        onClick={() => setIsAddStudentModalVisible(true)}
                        title="Add Student"
                        className="
                            w-10 
                            h-10 
                            flex 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-blue-600 
                            text-white 
                            hover:bg-blue-500 
                            transition
                        "
                    >
                        <FaUserPlus className="w-4 h-4" />
                    </button>

                    {/* Enrolled Students */}
                    <button
                        onClick={() => navigate(`/courses/${courseId}/enrolled-students`)}
                        title="Enrolled Students"
                        className="
                            w-10 
                            h-10 
                            flex 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-gray-600 
                            text-white 
                            hover:bg-gray-500 
                            transition
                        "
                    >
                        <FaUsers className="w-4 h-4" />
                    </button>
                </div>

                {/* Right Buttons: Edit / Delete */}
                <div className="flex items-center space-x-2 pointer-events-auto">
                    {/* Edit Course */}
                    <button
                        onClick={onEdit}
                        title="Edit Course"
                        className="
                            w-10 
                            h-10 
                            flex 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-blue-600 
                            text-white 
                            hover:bg-blue-500 
                            transition
                        "
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                    {/* Delete Course */}
                    <button
                        onClick={onDelete}
                        title="Delete Course"
                        className="
                            w-10 
                            h-10 
                            flex 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-red-600 
                            text-white 
                            hover:bg-red-500 
                            transition
                        "
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* MODALS */}
            {isModuleModalVisible && (
                <ModuleModal
                    isVisible={isModuleModalVisible}
                    onClose={() => setIsModuleModalVisible(false)}
                    onSubmit={handleAddModule}
                />
            )}
            {isAddStudentModalVisible && (
                <AddStudentModal
                    isVisible={isAddStudentModalVisible}
                    onClose={() => setIsAddStudentModalVisible(false)}
                    onSubmit={handleAddStudent}
                />
            )}
        </div>
    );
};

export default Card;
