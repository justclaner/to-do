import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        projectId: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model('Task', taskSchema);