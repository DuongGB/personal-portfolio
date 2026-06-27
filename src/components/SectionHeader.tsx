interface SectionHeaderProps {
  badge: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleAccent,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-teal-700/15 bg-white px-4 py-2 text-sm font-bold text-teal-800 shadow-sm dark:border-teal-300/20 dark:bg-zinc-900 dark:text-teal-300">
        <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-300" />
        {badge}
      </div>

      <h2 className="text-4xl font-black leading-tight tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
        {title}{" "}
        {titleAccent && (
          <span className="text-teal-700 dark:text-teal-300">{titleAccent}</span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
