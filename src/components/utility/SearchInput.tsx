import { Input } from "@/components/ui/input";
import { cn } from "@/lib/app.utils";

interface SearchInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (search?: string) => void;
}

function SearchInput({
  label,
  placeholder,
  onChange,
  className,
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(value.trim() ? value : undefined);
  };

  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      {label && (
        <label htmlFor="search" className="font-bold text-muted-foreground">
          {label}
        </label>
      )}
      <Input
        type="search"
        id="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchInput;
