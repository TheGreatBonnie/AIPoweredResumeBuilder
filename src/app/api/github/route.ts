// /pages/api/resume.ts

import { NextResponse } from "next/server";
import axios from "axios";

// Environment variables for GitHub API token and user details
const GITHUB_TOKEN = "Your GitHub Personal Access Token";
const GITHUB_USERNAME = "Your GitHub Username";

// Axios instance for GitHub GraphQL API
const githubApi = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// GraphQL query to fetch user and repository data
const getUserAndReposQuery = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      name
      email
      company
      bio
      repositories(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            name
            url
            description
            createdAt
            ... on Repository {
              primaryLanguage{
                name
              }
                stargazers {
                  totalCount
                }
              }
          }
        }
      }
    }
  }
`;

// API route to handle resume data fetching
export async function GET(request: any) {
  try {
    // Fetch data from GitHub
    const response = await githubApi.post("", { query: getUserAndReposQuery });
    const userData = response.data.data.user;

    // Format resume data
    const resumeData = {
      name: userData.name,
      email: userData.email,
      company: userData.company,
      bio: userData.bio,
      repositories: userData.repositories.edges.map((repo: any) => ({
        name: repo.node.name,
        url: repo.node.url,
        created: repo.node.createdAt,
        description: repo.node.description,
        language: repo.node.primaryLanguage.name,
        stars: repo.node.stargazers.totalCount,
      })),
    };

    // Return formatted resume data
    return NextResponse.json(resumeData);
  } catch (error) {
    console.error("Error fetching data from GitHub:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
