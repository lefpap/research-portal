import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TagsToggleGroupProps {
  tags: string[];
  label: string;
  onChange?: (tags?: string[]) => void;
  className?: string;
}

function TagsToggleGroup({
  tags,
  label,
  className,
  onChange,
}: TagsToggleGroupProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagsChange = (tags?: string[]) => {
    if (!tags || tags.length === 0) {
      setSelectedTags([]);
      onChange?.(undefined);
      return;
    }

    setSelectedTags(tags);
    onChange?.(tags);
  };

  const handleClearSelectedTags = () => {
    setSelectedTags([]);
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
          className={"flex flex-wrap items-center justify-start"}
          onValueChange={handleTagsChange}
          value={selectedTags}
        >
          {tags.map((tag, index) => (
            <ToggleGroupItem
              key={index}
              value={tag}
              variant={"primary"}
              size={"sm"}
              className="flex-shrink-0 text-xs font-bold capitalize"
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default TagsToggleGroup;
