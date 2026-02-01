import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const blogPosts = [
  {
    slug: "choosing-right-packaging-tape",
    title: "How to Choose the Right Packaging Tape for Your Business",
    excerpt: "A comprehensive guide to selecting the best packaging tape based on your specific shipping requirements, box types, and environmental conditions.",
    content: `
      <p>Choosing the right packaging tape is crucial for ensuring your products arrive safely at their destination. With so many options available, it can be overwhelming to make the right choice. This guide will help you understand the key factors to consider when selecting packaging tape for your business.</p>
      
      <h2>Understanding Tape Types</h2>
      <p>The most common types of packaging tape include:</p>
      <ul>
        <li><strong>BOPP (Biaxially Oriented Polypropylene) Tape:</strong> The industry standard for most applications. Offers excellent clarity, strength, and cost-effectiveness.</li>
        <li><strong>PVC (Polyvinyl Chloride) Tape:</strong> Known for its quiet unwind and excellent conformability. Ideal for irregular surfaces.</li>
        <li><strong>Hot Melt Tape:</strong> Provides aggressive initial tack and is great for heavy-duty applications.</li>
        <li><strong>Acrylic Tape:</strong> Offers excellent clarity and UV resistance. Perfect for long-term storage.</li>
      </ul>
      
      <h2>Consider Your Box Material</h2>
      <p>The type of box you're sealing plays a significant role in tape selection:</p>
      <ul>
        <li><strong>Recycled Boxes:</strong> Require tape with stronger adhesive to bond with shorter fibers</li>
        <li><strong>Heavy-duty Boxes:</strong> Need thicker tape (50+ microns) for adequate strength</li>
        <li><strong>Lightweight Boxes:</strong> Standard 40-45 micron tape is usually sufficient</li>
      </ul>
      
      <h2>Environmental Factors</h2>
      <p>Consider where your packages will be stored and shipped:</p>
      <ul>
        <li><strong>Cold Storage:</strong> Choose freezer-grade tape with special low-temperature adhesive</li>
        <li><strong>Hot Climates:</strong> Select tape with high-temperature resistance (up to 60°C)</li>
        <li><strong>Humid Environments:</strong> Opt for moisture-resistant acrylic adhesives</li>
      </ul>
      
      <h2>Application Method</h2>
      <p>Your sealing method affects tape choice:</p>
      <ul>
        <li><strong>Manual Application:</strong> Any standard tape works well</li>
        <li><strong>Automated Dispensers:</strong> Ensure tape is compatible with your equipment</li>
        <li><strong>High-Volume Operations:</strong> Consider machine-grade tapes for consistency</li>
      </ul>
      
      <h2>Special Requirements</h2>
      <p>Some applications need specialized tapes:</p>
      <ul>
        <li><strong>Tamper Evidence:</strong> Use security tapes that show visible signs of opening</li>
        <li><strong>Branding:</strong> Custom printed tape enhances brand visibility</li>
        <li><strong>Export Shipping:</strong> Ensure compliance with international shipping regulations</li>
      </ul>
      
      <h2>Testing Before Bulk Purchase</h2>
      <p>Always test tape samples with your actual boxes and shipping conditions before committing to a large order. This helps ensure the tape performs as expected in real-world conditions.</p>
      
      <h2>Conclusion</h2>
      <p>Selecting the right packaging tape involves balancing cost, performance, and specific application requirements. By considering these factors, you can ensure your packages are secure while optimizing your packaging costs.</p>
    `,
    category: "tips-guides",
    author: "Sarah Johnson",
    authorRole: "Product Specialist",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Packaging", "B2B", "Guide", "Best Practices"],
  },
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found | Crafter Tapes",
    };
  }

  return {
    title: `${post.title} | Crafter Tapes Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">
              {post.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <div>
                  <span className="font-medium text-foreground">{post.author}</span>
                  <span className="block text-xs">{post.authorRole}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/20">
                {post.title.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24 space-y-6">
                  {/* Share */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Share Article</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Facebook className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <article
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-8" />

                {/* Author Bio */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Expert in industrial adhesive solutions with over 10 years of experience 
                          in the packaging industry.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card key={relatedPost.slug}>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {relatedPost.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                      <CardTitle className="text-lg">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {relatedPost.readTime}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
