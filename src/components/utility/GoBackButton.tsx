import type { ButtonProps } from "@/components/ui/button";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface GoBackButtonProps extends Omit<ButtonProps, "onClick"> {}

function GoBackButton({ children, className, ...rest }: GoBackButtonProps) {
  return (
    <Button {...rest} className={cn(className)} onClick={() => history.back()}>
      {children}
    </Button>
  );
}

export default GoBackButton;
