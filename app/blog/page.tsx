import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { PostCard } from "@/components/cards";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { sortedPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on branding, colour, WhatsApp-first design and the business of running a one-person studio in Lagos.",
};

export default function BlogPage() {
  const posts = sortedPosts();

  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title={
          <>
            Notes from
            <br />
            <span className="grad-text">inside the studio.</span>
          </>
        }
        copy="Thinking out loud about brands, colour, client work and the parts of design nobody puts in a case study."
        meta={[`${posts.length} posts`, "No newsletter pop-up", "Updated when there's something to say"]}
      />

      <section className="section-tight">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <RevealItem key={post.slug}>
                <PostCard post={post} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
