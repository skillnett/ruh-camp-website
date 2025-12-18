import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getBlogCategories, getMediaUrl } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог | RUH Camp",
  description: "Останні статті та новини",
};

export default async function BlogPage() {
  const [postsData, categories] = await Promise.all([
    getBlogPosts({
      limit: 12,
      where: {
        status: {
          equals: "published",
        },
      },
    }),
    getBlogCategories(),
  ]);

  const posts = postsData.docs || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Блог</h1>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              Всі
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                style={
                  category.color
                    ? { backgroundColor: category.color + "20", color: category.color }
                    : {}
                }
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Поки що немає опублікованих статей
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Створити статтю
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const featuredImage = post.featuredImage
                ? getMediaUrl(post.featuredImage)
                : null;
              const postUrl = `/blog/${post.slug}`;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {featuredImage && (
                    <Link href={postUrl}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={featuredImage}
                          alt={post.title || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((cat: any) => (
                          <span
                            key={cat.id}
                            className="text-xs px-2 py-1 bg-gray-100 rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-bold mb-2">
                      <Link
                        href={postUrl}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      )}
                      {post.readTime && (
                        <span>{post.readTime} хв читання</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {postsData.totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: postsData.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className="px-4 py-2 bg-white rounded hover:bg-gray-100 transition-colors"
                >
                  {page}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

