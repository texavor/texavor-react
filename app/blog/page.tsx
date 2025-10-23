// app/articles/page.tsx

import React from "react";
import { baseURL } from "@/lib/axiosInstace";

import ArticleCard from "./ArticleCard";

interface ArticlePreview {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  tag: string[];
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
    const response = await axiosInstance.get(`${baseURL}/articles`);

    if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.data.articles)) {
      return response.data.articles;
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

  return (
    <div className="container mx-auto mt-10 lg:w-[1200px] md:w-8/12 w-11/12">
      <h1 className="font-raleway text-[32px] font-medium">
        Stories by SurajOnDev
      </h1>
      {articleData.length === 0 ? (
        <div className="container mx-auto flex justify-center lg:w-[1200px] md:w-8/12 w-11/12">
          <img src="/article_not_found.png" className="md:size-[500px]" />
        </div>
      ) : (
        articleData.map((item) => (
          <ArticleCard
            key={item.slug}
            title={item.title}
            description={item.description}
            date={item.updatedAt}
            tag={item.tag}
            slug={item.slug}
          />
        ))
      )}
    </div>
  );
}
