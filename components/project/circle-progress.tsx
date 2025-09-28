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
  default: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-cyan-100 text-cyan-800",
  inProgress: "bg-purple-100 text-purple-800",
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
