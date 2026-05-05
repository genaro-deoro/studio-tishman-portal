// pages/api/jira/issues.js
import axios from 'axios';

const jiraUrl = process.env.NEXT_PUBLIC_JIRA_URL;
const jiraToken = process.env.JIRA_API_TOKEN;
const jiraEmail = process.env.JIRA_USER_EMAIL;
const projectKey = process.env.NEXT_PUBLIC_PROJECT_KEY;

const jiraAuth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jql = `project = ${projectKey}`;
    
    const response = await axios({
      method: 'post',
      url: `${jiraUrl}/rest/api/3/search/jql`,
      headers: {
        'Authorization': `Basic ${jiraAuth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        jql: jql,
        maxResults: 100,
        fields: 'key,summary,status,priority,assignee,duedate,created,updated,issuetype'
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
    console.error('Jira API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch issues from Jira',
      details: error.message,
      status: error.response?.status
    });
  }
}
