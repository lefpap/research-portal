import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/app.utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon, RefreshCwIcon, UserPenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { CollectionEntry } from "astro:content";

interface TagsToggleGroupProps {
  authors: CollectionEntry<"authors">[];
  label: string;
  onChange?: (authors?: string[]) => void;
  className?: string;
}

function AuthorsToggleGroup({
  authors,
  label,
  className,
  onChange,
}: TagsToggleGroupProps) {
  const [authorIds, setAuthorIds] = useState<string[]>([]);

  const handleAuthorChange = (ids?: string[]) => {
    if (!ids || ids.length === 0) {
      setAuthorIds([]);
      onChange?.(undefined);
      return;
    }

    setAuthorIds(ids);
    onChange?.(ids);
  };

  const handleClearSelectedTags = () => {
    setAuthorIds([]);
    onChange?.(undefined);
  };

  return (
    <Collapsible
      className={cn("group grid w-full items-center gap-1.5", className)}
      defaultOpen={false}
    >
      <div className="flex items-center justify-between gap-1">
        <h5 className="mr-3 font-bold text-muted-foreground">{label}</h5>
        <div>
          <CollapsibleTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <ChevronsUpDownIcon className="size-4" />
            </Button>
          </CollapsibleTrigger>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={handleClearSelectedTags}
          >
            <RefreshCwIcon className="size-4" />
          </Button>
        </div>
      </div>
      <CollapsibleContent>
        <ToggleGroup
          type="multiple"
          className={"flex-col items-start justify-start"}
          onValueChange={handleAuthorChange}
          value={authorIds}
        >
          {authors.map((author, index) => (
            <ToggleGroupItem
              key={index}
              value={author.id}
              variant={"primary"}
              size={"sm"}
              className="flex w-full max-w-xs flex-shrink-0 items-center justify-start gap-3 text-xs font-bold capitalize"
            >
              <UserPenIcon className="size-4 shrink-0" />
              {`${author.data.firstname} ${author.data.lastname}`}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default AuthorsToggleGroup;
