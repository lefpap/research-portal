import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface TimeToggleGroupProps {
  className?: string;
  label?: string;
  onChange?: (time?: { name: string; value: string }) => void;
}

const TIME_RANGES = [
  { name: "Today", value: "today" },
  { name: "This Week", value: "week" },
  { name: "This Month", value: "month" },
  { name: "This Year", value: "year" },
];

function TimeToggleGroup({ onChange, className, label }: TimeToggleGroupProps) {
  const handleTimeChange = (value?: string) => {
    if (!value || value.trim() === "") {
      onChange?.(undefined);
      return;
    }

    const time = TIME_RANGES.find((range) => range.value === value);
    onChange?.(time);
  };

  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      {label && <p className="font-bold text-muted-foreground">{label}</p>}
      <ToggleGroup
        type="single"
        className={"flex flex-wrap items-center justify-start"}
        onValueChange={handleTimeChange}
      >
        {TIME_RANGES.map((time, index) => (
          <ToggleGroupItem
            key={index}
            value={time.value}
            variant={"primary"}
            size={"sm"}
            className="flex-shrink-0 text-xs font-bold"
          >
            {time.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default TimeToggleGroup;
