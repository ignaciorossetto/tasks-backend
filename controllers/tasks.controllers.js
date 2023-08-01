import { pool } from "../utils/db.js"
import { customError } from "../middlewares/errorHandler.js"

export const getTask = async(req,res,next) => {
    const id = req.params.id
    const query = 'SELECT * FROM tasks WHERE id = ?'
    try {
        const result = await pool.query(query, [id])
        console.log(result)
        if (result[0].length === 0){
            throw customError('Task not found', 404)
        }
        res.json(result[0][0])
    } catch (error) {
        next(error)
    }
}
export const getTasks = async(req,res,next) => {
    const uid = req.query.id
    const query = `SELECT t.id AS tid, t.title, t.done, t.description, t.createAt, t.uid
    FROM tasks t
    JOIN users u ON u.id = t.uid
    WHERE t.uid = (?) ORDER BY t.createAt ASC`
    try {
        const response = await pool.query(query, [uid])
        res.json(response[0])
    } catch (error) {
        next(error)
    }
}
export const createTask = async(req,res,next) => {
    const {title, description, uid} = req.body
    const query = 'INSERT INTO tasks(title, description, uid) VALUES (?, ?, ?)'
    try {
        const response = await pool.query(query, [title, description, uid])
        res.json({
            status: 'success',
            message: 'Task created!'
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req,res,next) => {
    const id = req.params.id
    const query = 'UPDATE tasks SET ? WHERE id = ?'
    try {
        const result = await pool.query(query, [req.body ,id])
        if (result[0].affectedRows === 0) {
            throw customError('Task not found', 404)
        }
        res.json({
            status: 'success',
            message: `Task id:${id} updated succesfully`
        })
        
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res,next) => {
    const id = req.params.id
    const query = 'DELETE FROM tasks WHERE id = ?'
    try {
        const result = await pool.query(query, [id])
        if (result[0].affectedRows === 0) {
            throw customError('Task not found', 404)
        }
        res.json({
            status: 'success',
            message: `Task id:${id} deleted succesfully`
        }) 
    } catch (error) {
        res.json(error)
    }
}