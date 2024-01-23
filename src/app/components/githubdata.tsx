"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Resume data interface
interface ResumeData {
    name: string;
    email: string;
    company: string;
    bio: string;
    repositories: {
      name: string;
      url: string;
      created: string;
      description: string;
      language: string;
      stars: number;
    }[];
  }
  

  export const useGithubData = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);

    // Fetch resume data from API
    useEffect(() => {
        axios
        .get("/api/github")
        .then((response) => {
            setResumeData(response.data);
        })
    }, []);

  return { resumeData, };
  }