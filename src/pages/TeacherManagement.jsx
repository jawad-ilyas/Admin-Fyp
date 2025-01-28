// src/pages/TeacherManagement.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchAllTeachers,
    fetchTeacherCoursesForSingleTeacher,
} from "../features/teacher/teacherSlice";
import TeacherCoursesModal from "../components/TeacherCoursesModal";
import { FaUsers, FaUser, FaStar } from "react-icons/fa";

const TeacherManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // For advanced filters
    const [searchTerm, setSearchTerm] = useState("");
    const [courseCountFilter, setCourseCountFilter] = useState("all");
    const [sortField, setSortField] = useState("none");

    // For teacher courses modal
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showCoursesModal, setShowCoursesModal] = useState(false);

    // Redux state
    const { teachers, loading, error } = useSelector((state) => state.teacher);

    // Fetch teachers whenever filters change
    useEffect(() => {
        dispatch(
            fetchAllTeachers({
                search: searchTerm,
                courseCount: courseCountFilter,
                sortField,
            })
        );
    }, [searchTerm, courseCountFilter, sortField, dispatch]);

    const handleViewCourses = (teacher) => {
        setSelectedTeacher(teacher);
        setShowCoursesModal(true);
        dispatch(fetchTeacherCoursesForSingleTeacher(teacher._id));
    };

    const handleCloseModal = () => {
        setShowCoursesModal(false);
        setSelectedTeacher(null);
    };
    // Navigate back to previous page
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className=" bg-gray-700 pt-24 mx-auto p-4">
            {/* Filter UI */}
            <div className="  flex
        items-center
        justify-between
        bg-gray-900
        shadow-sm
        rounded-lg
        px-4
        py-2
        space-x-4">
                <div className="flex flex-row w-full justify-between space-x-2">

                    <div className="flex items-center space-x-3">

                        <button
                            onClick={handleBack}
                            className="bg-gray-200 me-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            &larr; Back
                        </button>


                        {/* <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="none">No Sorting</option>
                            <option value="createdAtAsc">Oldest First</option>
                            <option value="createdAtDesc">Newest First</option>
                        </select> */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search teachers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-semibold text-white mb-4 pt-4">Find a Teacher</h1>

            {/* Loading/Error states */}
            {loading && <p>Loading teachers...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {/* Teachers List */}
            {!loading && teachers && teachers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher._id}
                            className="
                relative
                group
                bg-gray-900
                text-white
                rounded-xl
                shadow-lg
                overflow-hidden
                transition
                hover:shadow-xl
                cursor-pointer
              "
                        >
                            {/* IMAGE SECTION */}
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={teacher.imageUrl || "/images/default-teacher.jpg"}
                                    alt={teacher.name}
                                    className="
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-300
                    group-hover:scale-105
                  "
                                />
                                {/* Click overlay -> navigate to teacher profile */}
                                <div
                                    className="
                    absolute
                    inset-0
                    group-hover:bg-black/10
                    transition-all
                    duration-300
                    pointer-events-auto
                  "
                                    onClick={() => navigate(`/teachers/${teacher._id}`)}
                                ></div>
                            </div>

                            {/* CONTENT SECTION */}
                            <div className="p-4 space-y-2 pointer-events-none">
                                <h3 className="text-xl font-bold text-white">
                                    {teacher.name}
                                </h3>
                                {/* Rating */}
                                {teacher.rating && (
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        {[...Array(teacher.rating)].map((_, i) => (
                                            <FaStar key={i} className="w-4 h-4" />
                                        ))}
                                    </div>
                                )}
                                {/* Location */}
                                <p className="text-sm text-white">
                                    {teacher.location || "Location not specified"}
                                </p>
                                {/* Bio */}
                                {teacher.bio && (
                                    <p className="text-sm text-white line-clamp-2">
                                        {teacher.bio}
                                    </p>
                                )}
                                {/* Subjects */}
                                <div className="flex flex-wrap gap-1">
                                    {teacher.subjects?.map((subject) => (
                                        <span
                                            key={subject}
                                            className="
                        bg-white
                        text-white
                        text-xs
                        px-2
                        py-1
                        rounded-full
                      "
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ACTION BUTTONS (BOTTOM) */}
                            <div className="p-4 border-t flex items-center justify-between">
                                {/* Left: e.g. "View Courses" */}
                                <div className="flex items-center space-x-2 pointer-events-auto">
                                    <button
                                        onClick={() => handleViewCourses(teacher)}
                                        title="View Courses"
                                        className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-green-100
                      text-green-600
                      hover:bg-green-200
                      transition
                    "
                                    >
                                        <FaUsers className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Right: e.g. "View Profile" */}
                                <div className="flex items-center space-x-2 pointer-events-auto">
                                    <button
                                        onClick={() => navigate(`/teachers/${teacher._id}`)}
                                        title="View Profile"
                                        className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      text-blue-600
                      hover:bg-blue-200
                      transition
                    "
                                    >
                                        <FaUser className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No teachers found.</p>
            )}

            {/* Courses Modal */}
            {showCoursesModal && selectedTeacher && (
                <TeacherCoursesModal
                    teacher={selectedTeacher}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default TeacherManagement;
