import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ModuleModal = ({ isVisible, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitHandler = async (data) => {
        try {
            const startTime = new Date(data.startTime);
            const endTime = new Date(data.endTime);

            // Validate that endTime is not less than startTime
            if (endTime <= startTime) {
                toast.error("End time must be greater than the start time.");
                return; // Stop submission if validation fails
            }

            // Attempt to create the module
            await onSubmit(data);
            toast.success("A new module has been created!");
            reset();
            onClose();
        } catch (err) {
            console.error("Failed to create module:", err);

            // Check if the error message indicates a duplicate title
            if (err.response?.data?.message?.includes("already exists")) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Error creating module.");
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999999999999999999]">
            <div className="bg-gray-700 p-6 rounded-xl shadow-xl w-full max-w-lg relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Add Module</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 text-lg font-semibold"
                    >
                        &#x2715;
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(submitHandler)}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Module Title
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: "Module title is required" })}
                            placeholder="Enter module title"
                            className="
                                w-full
                                border
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-gray-400
                                bg-gray-700
                                text-gray-200
                            "
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            placeholder="Enter module description"
                            className="
                                w-full
                                border
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-gray-400
                                bg-gray-700
                                text-gray-200
                            "
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Start Time */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Time
                        </label>
                        <input
                            type="datetime-local"
                            {...register("startTime", {
                                required: "Start time is required",
                            })}
                            className="
                                w-full
                                border
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-gray-400
                                bg-gray-700
                                text-gray-200
                            "
                        />
                        {errors.startTime && (
                            <p className="text-red-500 text-sm">{errors.startTime.message}</p>
                        )}
                    </div>

                    {/* End Time */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Time
                        </label>
                        <input
                            type="datetime-local"
                            {...register("endTime", {
                                required: "End time is required",
                            })}
                            className="
                                w-full
                                border
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-gray-400
                                bg-gray-700
                                text-gray-200
                            "
                        />
                        {errors.endTime && (
                            <p className="text-red-500 text-sm">{errors.endTime.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-4
                                py-2
                                bg-gray-200
                                text-gray-700
                                rounded-md
                                hover:bg-gray-300
                                transition
                            "
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="
                                px-4
                                py-2
                                bg-gray-600
                                text-white
                                rounded-md
                                hover:bg-gray-900
                                transition
                            "
                        >
                            Save Module
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModuleModal;
