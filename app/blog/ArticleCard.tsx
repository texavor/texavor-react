import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  image: string;
  type?: string;
}

const ArticleCard = ({
  title,
  description,
  date,
  tags,
  slug,
  image,
}: ArticleCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300 h-full flex flex-col shadow-tx-sm">
        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags & Date */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-1.5">
              {tags?.slice(0, 2).map((item) => (
                <span
                  key={item}
                  className="bg-accent/15 text-accent text-[11px] font-medium px-2.5 py-0.5 rounded-sm font-mono border border-accent/30 uppercase tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-inter">
              {format(new Date(date || new Date()), "MMM dd, yyyy")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 font-poppins line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm font-inter line-clamp-3 mb-6 flex-grow leading-relaxed">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-primary font-inter mt-auto gap-1.5">
            Read Article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
