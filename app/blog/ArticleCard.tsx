import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

const ArticleCard = ({
  title,
  description,
  date,
  tag,
  slug,
  image,
  type,
}: {
  title: string;
  description: string;
  date: string;
  tag: string[];
  slug: string;
  image: string;
  type: string;
}) => {
  return (
    <div className="group cursor-pointer w-full p-2 rounded-xl relative">
      <div className="absolute inset-0 bg-[#EEDED3] rounded-xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out origin-bottom"></div>

      <Link href={`/blog/${slug}`} className="relative flex justify-between">
        <div
          className={`w-full space-y-1 ${type === "flex" ? "flex gap-2" : ""}`}
        >
          <div className="relative w-full aspect-[1000/420] min-w-[300px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <div>
            <p className="font-arcade text-lg font-medium font-poppins group-hover:text-[#0A2918]">
              {title}
            </p>

            <p className="font-raleway whitespace-nowrap font-inter text-sm text-gray-600">
              {format(new Date(date || new Date()), "dd MMM, yyyy")}
            </p>

            <div className="flex flex-wrap">
              {tag?.map((item) => (
                <span
                  key={item}
                  className="font-raleway underline mr-2 decoration-[#104127] decoration-2 font-inter"
                >
                  {item}
                </span>
              ))}
            </div>

            <p
              className="font-raleway text-sm cursor-pointer md:block hidden font-inter"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
