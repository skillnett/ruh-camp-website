import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts, getMediaUrl } from "@/lib/payload";
import { extractTextFromLexical } from "@/lib/utils";
import type { Metadata } from "next";
import type { BlogCategory, User } from "@/payload-types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const postsData = await getBlogPosts({
    limit: 100,
    where: {
      status: {
        equals: "published",
      },
    },
  });

  return postsData.docs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Стаття не знайдена",
    };
  }

  const title =
    typeof post.metaTitle === "string" ? post.metaTitle : post.title;
  const description =
    typeof post.metaDescription === "string"
      ? post.metaDescription
      : typeof post.excerpt === "string"
      ? post.excerpt
      : "";

  return {
    title,
    description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const featuredImage = post.featuredImage
    ? getMediaUrl(post.featuredImage)
    : null;

  // Helper function to check if category is populated
  const isCategoryPopulated = (
    cat: string | BlogCategory
  ): cat is BlogCategory => {
    return typeof cat === "object" && cat !== null && "name" in cat;
  };

  // Helper function to check if author is populated
  const isAuthorPopulated = (author: string | User): author is User => {
    return typeof author === "object" && author !== null && "email" in author;
  };

  // Extract text from Lexical content
  const contentText = post.content ? extractTextFromLexical(post.content) : "";

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Назад до блогу
        </Link>

        {/* Categories */}
        {post.categories &&
          Array.isArray(post.categories) &&
          post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => {
                if (isCategoryPopulated(cat)) {
                  return (
                    <span
                      key={cat.id}
                      className="text-sm px-3 py-1 bg-gray-200 rounded-full"
                    >
                      {cat.name}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          {post.publishedAt && typeof post.publishedAt === "string" && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {typeof post.readTime === "number" && (
            <span>• {post.readTime} хв читання</span>
          )}
          {post.author && isAuthorPopulated(post.author) && (
            <span>• Автор: {post.author.email || "Невідомий"}</span>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && typeof post.excerpt === "string" && (
          <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
        )}

        {/* Content */}
        {contentText && (
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-md">
            <div className="whitespace-pre-wrap">{contentText}</div>
          </div>
        )}

        {/* Tags */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Теги:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tagItem, index) => {
                if (
                  tagItem &&
                  typeof tagItem === "object" &&
                  "tag" in tagItem
                ) {
                  return (
                    <span
                      key={tagItem.id || index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      #{typeof tagItem.tag === "string" ? tagItem.tag : ""}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
