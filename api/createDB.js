import { sql } from "@vercel/postgres";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    // Create tables for your data structure
    await sql`
      CREATE TABLE boards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        is_active BOOLEAN
      );

      CREATE TABLE columns (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        board_id INT REFERENCES boards(id)
      );

      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(255),
        column_id INT REFERENCES columns(id)
      );

      CREATE TABLE subtasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        is_completed BOOLEAN,
        task_id INT REFERENCES tasks(id)
      );

      -- Insert initial data
      INSERT INTO boards (name, is_active)
      VALUES ('Platform Launch', false), ('Marketing Plan', false), ('Roadmap', false);

      INSERT INTO columns (name, board_id)
      VALUES ('Todo', 1), ('Doing', 1), ('Done', 1), ('Todo', 2), ('Doing', 2), ('Done', 2), ('Now', 3), ('Next', 3), ('Later', 3);

      INSERT INTO tasks (title, description, status, column_id)
      VALUES
        ('Build UI for onboarding flow', '', 'Todo', 1),
        ('Build UI for search', '', 'Todo', 1),
        ('Build settings UI', '', 'Todo', 1),
        ('QA and test all major user journeys', 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.', 'Todo', 1),
        ('Design settings and search pages', '', 'Doing', 2),
        ('Add account management endpoints', '', 'Doing', 2),
        ('Design onboarding flow', '', 'Doing', 2),
        ('Add search enpoints', '', 'Doing', 2),
        ('Add authentication endpoints', '', 'Doing', 2),
        ('Research pricing points of various competitors and trial different business models', 'We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.', 'Doing', 2),
        ('Conduct 5 wireframe tests', 'Ensure the layout continues to make sense and we have strong buy-in from potential users.', 'Done', 3),
        ('Create wireframe prototype', 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.', 'Done', 3),
        ('Review results of usability tests and iterate', 'Keep iterating through the subtasks until we're clear on the core concepts for the app.', 'Done', 3),
        ('Create paper prototypes and conduct 10 usability tests with potential customers', '', 'Done', 3),
        ('Market discovery', 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.', 'Done', 3),
        ('Competitor analysis', '', 'Done', 3),
        ('Research the market', 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.', 'Done', 3);

      INSERT INTO subtasks (title, is_completed, task_id)
      VALUES
        ('Sign up page', true, 1),
        ('Sign in page', false, 1),
        ('Welcome page', false, 1),
        ('Search page', false, 2),
        ('Account page', false, 3),
        ('Billing page', false, 3),
        ('Internal testing', false, 4),
        ('External testing', false, 4),
        ('Settings - Account page', true, 5),
        ('Settings - Billing page', true, 5),
        ('Search page', false, 6),
        ('Upgrade plan', true, 7),
        ('Cancel plan', true, 7),
        ('Update payment method', false, 7),
        ('Sign up page', true, 8),
        ('Sign in page', false, 8),
        ('Welcome page', false, 8),
        ('Add search endpoint', true, 9),
        ('Define search filters', false, 9),
        ('Define user model', true, 10),
        ('Add auth endpoints', false, 10),
        ('Research competitor pricing and business models', true, 11),
        ('Outline a business model that works for our solution', false, 11),
        ('Talk to potential customers about our proposed solution and ask for fair price expectancy', false, 11),
        ('Complete 5 wireframe prototype tests', true, 12),
        ('Create clickable wireframe prototype in Balsamiq', true, 13),
        ('Meet to review notes from previous tests and plan changes', true, 14),
        ('Make changes to paper prototypes', true, 14),
        ('Conduct 5 usability tests', true, 14),
        ('Create paper prototypes for version one', true, 15),
        ('Complete 10 usability tests', true, 15),
        ('Interview 10 prospective customers', true, 16),
        ('Find direct and indirect competitors', true, 17),
        ('SWOT analysis for each competitor', true, 17),
        ('Write up research analysis', true, 18),
        ('Calculate TAM', true, 18);
    `;

    return response
      .status(200)
      .json({ message: "Database setup and initial data insertion complete." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error });
  }
}
npm;
