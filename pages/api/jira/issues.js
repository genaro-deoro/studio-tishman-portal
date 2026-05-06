// pages/api/jira/issues.js
import axios from 'axios';

export default async function handler(req, res) {
  // 1. Traer variables dentro del handler
  const jiraUrl = process.env.NEXT_PUBLIC_JIRA_URL;
  const jiraToken = process.env.JIRA_API_TOKEN;
  const jiraEmail = process.env.JIRA_USER_EMAIL;
  const projectKey = process.env.NEXT_PUBLIC_PROJECT_KEY;

  // Validación rápida para debug (mira los logs de Vercel)
  if (!jiraToken || !jiraEmail || !jiraUrl) {
    return res.status(500).json({ error: 'Faltan variables de entorno en el servidor' });
  }

  const jiraAuth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Es mejor envolver el projectKey en comillas si tiene guiones (ej: "PROJ-1")
    const jql = `project = "${projectKey}"`;
    
    const response = await axios({
      method: 'post', // Jira API v3 prefiere POST para búsquedas complejas
      url: `${jiraUrl}/rest/api/3/search`, // Quitamos /jql si usamos data con objeto jql
      headers: {
        'Authorization': `Basic ${jiraAuth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        jql: jql,
        maxResults: 100,
        fields: ['key','summary','status','priority','assignee','duedate','created','updated','issuetype']
      }
    });

    const issues = response.data.issues.map(issue => ({
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status?.name || 'Unknown',
      priority: issue.fields.priority?.name || 'Medium',
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      dueDate: issue.fields.duedate || null,
      created: issue.fields.created,
      updated: issue.fields.updated,
      type: issue.fields.issuetype?.name || 'Task',
      url: `${jiraUrl}/browse/${issue.key}`
    }));

    res.status(200).json({
      success: true,
      count: issues.length,
      issues: issues
    });
  } catch (error) {
    // Esto imprimirá el error real en los logs de Vercel
    console.error('Jira API Error Detail:', error.response?.data);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Failed to fetch issues from Jira',
      details: error.response?.data?.errorMessages?.[0] || error.message
    });
  }
}
// Update 2