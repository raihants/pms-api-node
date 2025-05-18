const db = require('../config/db');

const Log = require('./Log');

const Task = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
  },

  getById: async (id) => {
      const [rows] = await db.query('SELECT t.project_id, t.id, t.name, t.description, t.priority, t.start_date, t.end_date, t.status, u.name as user_name FROM tasks t join users u on t.user_id = u.id where project_id = ?', [id]);
      return rows;
  },

  create: async (taskData) => {
    const {
      project_id,
      name,
      description,
      priority,
      start_date,
      end_date,
      status,
      user_id
    } = taskData;

    const [result] = await db.query(
      `INSERT INTO tasks (project_id, name, description, priority, start_date, end_date, status, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [project_id, name, description, priority, start_date, end_date, status, user_id]
    );

    await Log.create({
      task_id: result.insertId,
      user_id: user_id,
      activity: `Menambahkan tugas '${name}'`
    });

    return { id: result.insertId, ...taskData };
  },

  update: async (id, taskData) => {
  const {
    project_id,
    name,
    description,
    priority,
    start_date,
    end_date,
    status,
    user_id
  } = taskData;

  const [result] = await db.query(
    `UPDATE tasks 
     SET project_id = ?, 
         name = ?, 
         description = ?, 
         priority = ?, 
         start_date = ?, 
         end_date = ?, 
         status = ?, 
         user_id = ?
     WHERE id = ?`,
    [project_id, name, description, priority, start_date, end_date, status, user_id, id]
  );

  await Log.create({
      task_id: result.insertId,
      user_id: user_id,
      activity: `Mengubah tugas '${name}'`
    });

  return { affectedRows: result.affectedRows, id, ...taskData };
},

delete: async (id) => {
  const [tasks] = await db.query('SELECT name, user_id FROM tasks WHERE id = ?', [id]);
    if (tasks.length > 0) {
      const { name, user_id } = tasks[0];
      await Log.create({
        task_id: id,
        user_id: user_id,
        activity: `Menghapus tugas '${name}'`
      });
    }
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    return { message: 'Tasks deleted successfully' };
  }
};

module.exports = Task;
