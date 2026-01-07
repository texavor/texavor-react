import React from "react";
import { baseURL } from "@/lib/axiosInstance";
import BlogClientWrapper from "./BlogClientWrapper";

export const revalidate = 3600; // Revalidate every hour

interface ArticlePreview {
  slug: string;
  title: string;
  description: string;
  created_at: string;
  tag: string[];
  image: string;
}

// Create SSR-safe axios instance
const getServerAxiosInstance = () => {
  const axios = require("axios");
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Fetch articles at the server level
const getArticles = async (): Promise<ArticlePreview[]> => {
  try {
    const axiosInstance = getServerAxiosInstance();
    const response = await axiosInstance.get(`${baseURL}/easywrite_articles`);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export default async function ArticleListPage() {
  const articleData = await getArticles();

  return <BlogClientWrapper initialArticles={articleData} />;
}
