import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  tag: string[];
  slug: string;
  image: string;
  type?: string;
}

const ArticleCard = ({
  title,
  description,
  date,
  tag,
  slug,
  image,
}: ArticleCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags & Date */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              {tag?.slice(0, 2).map((item) => (
                <span
                  key={item}
                  className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full font-inter"
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
          <h3 className="text-xl font-bold text-foreground mb-3 font-poppins line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm font-inter line-clamp-3 mb-6 flex-grow leading-relaxed">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center text-sm font-semibold text-primary font-poppins mt-auto group/link">
            Read Article
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
