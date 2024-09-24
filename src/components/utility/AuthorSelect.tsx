import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/app.utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CommandList } from "cmdk";
import type { CollectionEntry } from "astro:content";

interface AuthorSelectProps {
  authors: CollectionEntry<"authors">[];
  onSelect?: (author: CollectionEntry<"authors">) => void;
}

export function AuthorSelect({ authors, onSelect }: AuthorSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);

    onSelect ? authors.find((author) => author.id === currentValue) : null;

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value ? (
            authors.find((author) => author.id === value)?.id
          ) : (
            <span className="text-muted-foreground">Select author...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search authors..." />
          <CommandEmpty>No author found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {authors.map((author) => (
                <CommandItem
                  key={author.id}
                  value={author.id}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === author.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {`${author.data.firstname} ${author.data.lastname}`}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
