const db = require('../config/db');

const ProjectReport = {
  generateForProject: async (projectId) => {
    // Ambil semua tim dalam project ini
    const [teams] = await db.query(
      `SELECT id FROM teams WHERE project_id = ?`,
      [projectId]
    );

    for (const team of teams) {
      const teamId = team.id;

      // Ambil semua user dalam tim
      const [users] = await db.query(
        `SELECT id FROM users WHERE team_id = ?`,
        [teamId]
      );
      const userIds = users.map(u => u.id);
      if (userIds.length === 0) continue;

      // Ambil task yang berhubungan
      const [tasks] = await db.query(
        `SELECT * FROM tasks WHERE project_id = ? AND user_id IN (?)`,
        [projectId, userIds]
      );

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(t => t.status.toLowerCase() === 'selesai').length;

      let daysLeft = 0;
      const today = new Date();
      tasks.forEach(t => {
        const endDate = new Date(t.end_date);
        if (endDate > today) {
          daysLeft += Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        }
      });
      const estimatedTimeLeft = totalTasks > 0 ? Math.round(daysLeft / totalTasks) : 0;

      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Upsert (insert or update)
      await db.query(
        `INSERT INTO project_reports (project_id, team_id, total_tasks, completed_tasks, progress, estimated_time_left)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           total_tasks = VALUES(total_tasks),
           completed_tasks = VALUES(completed_tasks),
           progress = VALUES(progress),
           estimated_time_left = VALUES(estimated_time_left)`,
        [projectId, teamId, totalTasks, completedTasks, progress, estimatedTimeLeft]
      );
    }

    return { message: 'Project reports generated successfully' };
  },

  getByProject: async (projectId) => {
    const [rows] = await db.query(
      `SELECT pr.*, t.name as team_name
       FROM project_reports pr
       JOIN teams t ON pr.team_id = t.id
       WHERE pr.project_id = ?`,
      [projectId]
    );
    return rows;
  }
};

module.exports = ProjectReport;
