import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostFrontmatter } from "@/types/blog";
import { ProjectItem } from "@/types";

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");
const PORTFOLIO_PATH = path.join(process.cwd(), "src/content/portfolio");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_PATH).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((fileName) => {
    const filePath = path.join(BLOG_PATH, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter: BlogPostFrontmatter = {
      title: data.title || "Untitled",
      slug: data.slug || fileName.replace(/\.mdx?$/, ""),
      date: data.date || "2026-01-01",
      author: data.author || "SHREEJAN AI Team",
      category: data.category || "AI & Business",
      readTime: data.readTime || "5 min read",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "/blog/placeholder.jpg",
      featured: Boolean(data.featured),
    };

    return {
      frontmatter,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((p) => p.frontmatter.slug === slug) || null;
}

export async function getAllPortfolioProjects(): Promise<(ProjectItem & { content: string })[]> {
  if (!fs.existsSync(PORTFOLIO_PATH)) {
    return [];
  }

  const files = fs.readdirSync(PORTFOLIO_PATH).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const projects = files.map((fileName) => {
    const filePath = path.join(PORTFOLIO_PATH, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || fileName.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled Project",
      client: data.client || "Confidential Enterprise",
      industry: data.industry || "Technology",
      category: data.category || "AI Solutions",
      summary: data.summary || "",
      domainUrl: data.domainUrl || "shreejanai.in",
      externalUrl: data.externalUrl || (data.domainUrl?.includes("github.com") ? `https://${data.domainUrl}` : undefined),
      results: data.results || [],
      metrics: data.metrics || [],
      tags: data.tags || [],
      featured: Boolean(data.featured),
      content,
    };
  });

  return projects.sort((a, b) => {
    const priority: Record<string, number> = {
      docgen: 1,
      harshos: 2,
    };
    const prioA = priority[a.slug] ?? 99;
    const prioB = priority[b.slug] ?? 99;
    return prioA - prioB;
  });
}

export async function getPortfolioProjectBySlug(slug: string): Promise<(ProjectItem & { content: string }) | null> {
  const projects = await getAllPortfolioProjects();
  return projects.find((p) => p.slug === slug) || null;
}

