import Link from "next/link";

import Thumbnail, { ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatarSkeleton } from "@/components/user-avatar";
import { User } from "lucide-react";
import UserIcon from "@/components/ui/user-icon";

type User = {
  id: string;
  username: string;
  imageUrl: string;
  profile:{
    age:number;
  } | null;
};

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
    goalText: string | null;
    type: string | null;
    tags: string[] | null;
  };
}

const ResultCard = async ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-2 border border-n-3/40 rounded-lg pb-2">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-3 mx-2 py-1 border-b border-n-3/40">
          <p className="truncate font-semibold text-xs text-primary-2">
            {data.user.username}
          </p>
          <div className="flex items-center gap-2 ml-auto">
            <p className="font-medium text-xs text-n-1">{data.user.profile?.age}</p>
            <UserIcon type={data?.type || "female"} />
          </div>
        </div>
        <div className="flex flex-col mx-2 py-[2px]">
          <p className="text-xs text-n-1 leading-4">
            {data?.goalText}
          </p>
        </div>
        <div className="flex flex-col mx-2">
          <div className="flex flex-wrap gap-2 mx-2 max-h-8 overflow-hidden truncate">
            {data?.tags?.map((item) => (
              <p key={item} className="text-[11px] text-primary-2 leading-2">
                {`#${item}`}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
