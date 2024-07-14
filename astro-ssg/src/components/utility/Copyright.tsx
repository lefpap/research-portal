import { cn } from "@/lib/utils";

interface CopyrightProps {
  className?: string;
}

function Copyright({ className }: CopyrightProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Copyright &copy; {new Date().getFullYear()}, All Rights Reserved
    </p>
  );
}

export default Copyright;
