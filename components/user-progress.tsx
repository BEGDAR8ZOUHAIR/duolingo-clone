import Image from "next/image";
import Link from "next/link";
import { InfinityIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { courses } from "@/server/db/schema";

interface UserProgressProps {
  activeCourse: null;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export const UserProgress = ({
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={22}
            width={22}
            alt="Hearts"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
