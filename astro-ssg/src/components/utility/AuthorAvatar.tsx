import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

interface AuthorAvatarProps {
  author: CollectionEntry<"authors">;
  className?: string;
}

const createInitials = (fullname: string) => {
  const [first, last] = fullname.split(" ");
  if (first && last) {
    return `${first[0]}${last[0]}`.toUpperCase();
  }

  return `${first[0]}${first[1]}`.toUpperCase();
};

function AuthorAvatar({ author, className }: AuthorAvatarProps) {
  const fullname = `${author.data.firstname} ${author.data.lastname}`;

  return (
    <div className={cn("flex items-center justify-start gap-2", className)}>
      <Avatar className="size-3.5">
        <AvatarImage src={author.data.avatar} alt="avatar" />
        <AvatarFallback className="font-medium">
          {createInitials(fullname)}
        </AvatarFallback>
      </Avatar>
      <span>{fullname}</span>
    </div>
  );
}

export default AuthorAvatar;
