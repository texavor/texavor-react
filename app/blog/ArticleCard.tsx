import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

const ArticleCard = ({
  title,
  description,
  date,
  tag,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  tag: string[];
  slug: string;
}) => {
  return (
    <div className="cursor-pointer mt-10">
      <Link className="flex justify-between" href={`/blog/${slug}`}>
        <div className="w-full md:w-9/12">
          <p className="font-arcade text-2xl hover:text-purple-400">{title}</p>
          <p className="font-raleway whitespace-nowrap block md:hidden">
            {format(new Date(date), "dd MMM, yyyy")}
          </p>
          <div className="flex flex-wrap">
            {tag.map((item) => (
              <span
                className="font-raleway underline mr-2 decoration-purple-300 decoration-2"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <p className="font-raleway text-sm cursor-pointer md:block hidden">
            {description}
          </p>
        </div>
        <p className="font-raleway whitespace-nowrap hidden md:block">
          {format(new Date(date), "dd MMM, yyyy")}
        </p>
      </Link>
    </div>
  );
};

export default ArticleCard;
