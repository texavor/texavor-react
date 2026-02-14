interface SchemaTypeBadgesProps {
  types: string[];
}

const getTypeBadgeColor = (type: string) => {
  const colors: Record<string, string> = {
    Article: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    FAQPage:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    HowTo: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    Organization:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    BreadcrumbList:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    WebSite: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    Person: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  };

  return (
    colors[type] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
  );
};

export default function SchemaTypeBadges({ types }: SchemaTypeBadgesProps) {
  if (!types || types.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No schema types detected</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type, index) => (
        <span
          key={index}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTypeBadgeColor(type)}`}
        >
          {type}
        </span>
      ))}
    </div>
  );
}
