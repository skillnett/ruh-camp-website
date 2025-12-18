import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts, getMediaUrl } from "@/lib/payload";
import type { Metadata } from "next";

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

  return postsData.docs.map((post: any) => ({
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

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
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
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat: any) => (
              <span
                key={cat.id}
                className="text-sm px-3 py-1 bg-gray-200 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.readTime && <span>• {post.readTime} хв читання</span>}
          {post.author && (
            <span>• Автор: {post.author.email || "Невідомий"}</span>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={post.title || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-md">
          {/* Rich text content would be rendered here */}
          {/* For now, we'll just show the content as text */}
          {post.content && (
            <div className="whitespace-pre-wrap">{post.content}</div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Теги:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tagItem: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  #{tagItem.tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

