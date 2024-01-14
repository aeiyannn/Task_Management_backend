import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index';
import User from './user';

interface TaskAttributes {
    id: number;
    taskTitle: string;
    taskDescription: string;
    dueDate: string
    assignBy: number;
    assignTo: number;
    taskStatus: string;
    priority: string
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    public id!: number;
    public taskTitle!: string;
    public taskDescription!: string;
    public dueDate!: string;
    public assignBy!: number;
    public assignTo!: number;
    public taskStatus!: string;
    public priority!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public sender?: User;
    public userInfo?: User;

}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        taskTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taskDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assignBy: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        assignTo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taskStatus: {
            type: DataTypes.ENUM("pending", "started", "onprogress", "completed", "notcomplete"),
            allowNull: false,
            defaultValue: 'pending'
        },
        priority: {
            type: DataTypes.ENUM(
                "pending",
                "started",
                "onprogress",
                "complete",
                "notcomplete"
            ),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks', // Define the table name explicitly
    }
);
Task.belongsTo(User, {
    foreignKey: 'assignBy',
    as: 'sender',
});
Task.belongsTo(User, {
    foreignKey: 'assignTo',
    as: 'userInfo',
});

export default Task;
