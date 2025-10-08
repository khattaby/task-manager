import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

type VariantType = "default" | "success" | "warning" | "info" | "inProgress";

interface CircleProps {
  title: string;
  value: number;
  subTitle: string;
  variant?: VariantType;
}

const variantStyles = {
  default: "text-blue-800",
  success: "text-green-800",
  warning: "text-yellow-800",
  info: "text-cyan-800",
  inProgress: "text-purple-800",
};

export const CircleProgress = ({
  title,
  value,
  subTitle,
  variant = "default",
}: CircleProps) => {
  return (
    <div className="flex flex-col items-center p-0">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="relative w-20 h-20 mb-2">
        <Progress
          className={cn("h-20 w-20 rotate-[-90deg]", variantStyles[variant])}
          value={value}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
          className={cn(`text-xl font-semibold text-center`, variantStyles[variant])}
          >{`${Math.round(
            value || 0
          )}%`}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">{subTitle}</p>
    </div>
  );
};
