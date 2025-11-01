"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "../../shared/ui/avatar";
import CoverImage from "../../shared/ui/cover-image";
import DateComponent from "../../shared/ui/date";
import BadgeCategories from "./BadgeCategories";

interface Post {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  coverImage: any;
  date: string;
  authors: Array<{ name: string; picture: any; slug: string | null }> | null;
  categories: Array<{ name: string | null; slug: string | null }> | null;
}

interface Category {
  name: string | null;
  slug: string | null;
  postCount: number;
}

interface PostsGridProps {
  posts: Post[];
  searchTerm: string;
  selectedCategory: string;
  validCategories: Category[];
}

export default function PostsGrid({ posts, searchTerm, selectedCategory, validCategories }: PostsGridProps) {
  const router = useRouter();

  const clearFilters = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  if (posts.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <article
            key={post._id}
            className="overflow-hidden bg-card shadow-lg md:bg-transparent md:shadow-none"
          >
            <Link href={`/posts/${post.slug}`} className="group block">
              <CoverImage image={post.coverImage} priority={false} />
            </Link>
            <div className="p-5 md:p-0 md:pt-6">
              <h3 className="text-balance mb-3 text-3xl leading-snug">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <div className="mb-4 flex flex-wrap items-center justify-between text-lg italic text-neutral-500">
                <DateComponent dateString={post.date} />
                {post.categories?.length ? (
                  <BadgeCategories categories={post.categories} />
                ) : null}
              </div>
              {post.excerpt && (
                <p className="text-pretty mb-4 text-lg leading-relaxed text-neutral-500 font-sans">
                  {post.excerpt}
                </p>
              )}
              {post.authors?.length ? (
                <div className="flex flex-wrap gap-3">
                  {post.authors.map((author) => (
                    <Avatar
                      key={(author.slug || author.name) + "-search"}
                      name={author.name}
                      picture={author.picture}
                      slug={author.slug}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-medium text-foreground mb-2">
        No posts found
      </h3>
      <p className="text-muted-foreground mb-6">
        Try adjusting your search or selecting a different category
      </p>
      {(searchTerm || selectedCategory) && (
        <button
          onClick={clearFilters}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}