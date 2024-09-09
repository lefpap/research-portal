import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackToTopButtonProps extends Omit<ButtonProps, "onClick"> {}

function BackToTopButton({
  children,
  className,
  ...rest
}: BackToTopButtonProps) {
  return (
    <Button
      {...rest}
      className={cn(className)}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      {children}
    </Button>
  );
}

export default BackToTopButton;
